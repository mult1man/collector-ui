import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SecurityContextService} from '../../security/service/security-context.service';
import {NGXLogger} from 'ngx-logger';
import {StringUtils} from '../utils/string.utils';
import {ConfigurationService} from '../configuration/service/configuration.service';

@Injectable({providedIn: 'root'})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private log: NGXLogger,
              private securityContextService: SecurityContextService,
              private configurationService: ConfigurationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(httpErrorResponse => {
        const isRedirectOn401 = !this.isAuthenticationUrl(req.url);

        if (httpErrorResponse.status === 401 && isRedirectOn401) {
          this.securityContextService.deleteSecurityContext();
          this.router.navigate(['/login']);
          return;
        }

        if (httpErrorResponse.status === 403) {
          this.router.navigate(['/forbidden']);
          return;
        }

        if (httpErrorResponse.status > 403 || httpErrorResponse.status === 0) {
          const errorMsg = httpErrorResponse.error && StringUtils.isString(httpErrorResponse.error) ? httpErrorResponse.error : httpErrorResponse.message;
        }

        return throwError(httpErrorResponse.error);
      })
    );
  }

  private isAuthenticationUrl(url: string): boolean {
    return url === `${this.configurationService.getConfig().securityEndPointBaseUrl}/authenticate`;
  }

}
