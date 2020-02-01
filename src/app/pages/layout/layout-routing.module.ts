import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {LayoutRoute} from './layout-routes';

const routes: Routes = [
  {
    path: '',
    resolve: {},
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: LayoutRoute.Home,
        pathMatch: 'full'
      },
      {
        path: LayoutRoute.Home,
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: LayoutRoute.Book,
        loadChildren: () => import('../book/book.module').then(m => m.BookModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
