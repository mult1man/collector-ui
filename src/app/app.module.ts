import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {nl_BE, NZ_I18N} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import nl from '@angular/common/locales/nl';
import {SharedModule} from './pages/shared/shared.module';
import {SecurityModule} from './pages/security/security.module';
import {PageForbiddenComponent} from './pages/shared/ui/page-forbidden.component';
import {PageNotFoundComponent} from './pages/shared/ui/page-not-found.component';

registerLocaleData(nl);

@NgModule({
  declarations: [
    AppComponent,
    PageForbiddenComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    SecurityModule
  ],
  providers: [{ provide: NZ_I18N, useValue: nl_BE }],
  bootstrap: [AppComponent]
})
export class AppModule { }
