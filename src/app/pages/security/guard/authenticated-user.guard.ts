import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {SecurityContextService} from '../service/security-context.service';

@Injectable({providedIn: 'root'})
export class AuthenticatedUserGuard implements CanLoad {

  constructor(private log: NGXLogger,
              private router: Router,
              private securityContextService: SecurityContextService) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const url = route.path + '/' + segments.join('/');
    this.log.debug('Angular authentication guard check for url', url);

    if (!this.securityContextService.isAuthenticated()) {
      this.log.debug('User NOT authenticated for url', url);
      this.router.navigate(['/login'], {queryParams: {'onSuccess': url}});
      return false;
    }

    return true;
  }

}
