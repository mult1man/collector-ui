import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {nl_BE, NZ_I18N} from 'ng-zorro-antd';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import nl from '@angular/common/locales/nl';
import {SharedModule} from './pages/shared/shared.module';
import {SecurityModule} from './pages/security/security.module';
import {PageForbiddenComponent} from './pages/shared/ui/page-forbidden.component';
import {PageNotFoundComponent} from './pages/shared/ui/page-not-found.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {JwtModule} from '@auth0/angular-jwt';
import {AppInitService} from './app-init.service';
import {ContentTypeInterceptor} from './pages/shared/http/interceptor/content-type.interceptor';
import {HttpLoggerInterceptor} from './pages/shared/log/http-logger.interceptor';
import {HttpErrorInterceptor} from './pages/shared/log/http-error.interceptor';

registerLocaleData(nl);

export function initApp(appInitService: AppInitService) {
  return () => appInitService.init();
}

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    SecurityModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.INFO}),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        throwNoTokenError: false,
        whitelistedDomains: [
          'localhost:8080']
      }
    }),
  ],
  declarations: [
    AppComponent,
    PageForbiddenComponent,
    PageNotFoundComponent,
  ],
  providers: [
    {provide: NZ_I18N, useValue: nl_BE},
    {provide: APP_INITIALIZER, useFactory: initApp, deps: [AppInitService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpLoggerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
