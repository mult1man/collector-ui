import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HttpLoggerInterceptor implements HttpInterceptor {

  constructor(private log: NGXLogger) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.log.debug(`Request ${req.method} ${req.url}`);

    return next.handle(req).pipe(
      tap(result => {
        this.log.debug(`Response ${req.method} ${req.url}`, result);
      })
    );
  }

}
