import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForbiddenPageComponent} from './pages/shared/ui/forbidden-page.component';
import {LoginErrorPageComponent} from './pages/shared/ui/login-error-page.component';
import {PageNotFoundComponent} from './pages/shared/ui/page-not-found.component';
import {AuthenticatedUserGuard} from './pages/security/guard/authenticated-user.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    canLoad: [AuthenticatedUserGuard],
    loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent
  },
  {
    path: 'login-error',
    component: LoginErrorPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
