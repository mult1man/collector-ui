import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RestTemplate {

  constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string): Promise<T> {
    return this.getWithParams(url, null);
  }

  getWithParams<T>(url: string, params: HttpParams): Promise<T> {
    return this.httpClient.get<T>(url, {params}).toPromise();
  }

  getRawBytes<T>(url: string, params?: HttpParams): Promise<HttpResponse<Blob>> {
    return this.httpClient.get(url, {params, observe: 'response', responseType: 'blob'}).toPromise();
  }

  getTextResponse<T>(url: string, params?: HttpParams): Promise<string> {
    return this.httpClient.get(url, {params, responseType: 'text'}).toPromise();
  }

  post<T, U>(url: string, object?: T): Promise<U> {
    return this.httpClient.post<U>(url, JSON.stringify(object)).toPromise();
  }

  postRawBytes<T>(url: string, object?: T, params?: HttpParams): Observable<HttpResponse<Blob>> {
    return this.httpClient.post(url, object, {params, observe: 'response', responseType: 'blob'});
  }

  put<T, U>(url: string, object: T): Promise<U> {
    return this.httpClient.put<U>(url, JSON.stringify(object)).toPromise();
  }

  delete(url: string): Promise<void> {
    return this.httpClient.delete<void>(url).toPromise();
  }

}
