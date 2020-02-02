import {NgModule} from '@angular/core';
import {LayoutRoutingModule} from './layout-routing.module';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutComponent} from './layout.component';
import {SharedModule} from '../shared/shared.module';
import {UserModule} from '../user/user.module';

@NgModule({
  imports: [
    SharedModule,
    UserModule,
    LayoutRoutingModule
  ],
  declarations: [
    NavigationComponent,
    LayoutComponent
  ]
})
export class LayoutModule {
}
