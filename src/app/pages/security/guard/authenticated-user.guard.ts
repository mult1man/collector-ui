import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticatedUserGuard implements CanLoad {

  constructor() {
  }

  // canLoad(route: Route, segments: UrlSegment[]): boolean {
  //   const url = route.path + '/' + segments.join('/');
  //   this.log.debug('Angular authentication guard check for url', url);
  //   return true;
  // }

  canLoad(): boolean {
    return true;
  }

}
