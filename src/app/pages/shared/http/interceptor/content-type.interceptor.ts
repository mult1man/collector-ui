import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ContentTypeInterceptor implements HttpInterceptor {

  private static isAddDefaultApplicationJson(req: HttpRequest<any>): boolean {
    return !req.headers.has('Content-Type')
      && req.body !== null
      && req.body.toString() !== '[object FormData]';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (ContentTypeInterceptor.isAddDefaultApplicationJson(req)) {
      req = req.clone({setHeaders: {'Content-Type': 'application/json'}});
    }

    return next.handle(req);
  }

}
