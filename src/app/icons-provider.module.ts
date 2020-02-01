import {NgModule} from '@angular/core';
import {NZ_ICONS} from 'ng-zorro-antd';

import {BookOutline, HomeOutline, LockOutline, UserOutline} from '@ant-design/icons-angular/icons';

const icons = [HomeOutline, BookOutline, LockOutline, UserOutline];

@NgModule({
  providers: [
    {provide: NZ_ICONS, useValue: icons}
  ]
})
export class IconsProviderModule {
}
