import {Injectable} from '@angular/core';
import {SecurityContext} from '../model/security-context.model';
import {NGXLogger} from 'ngx-logger';
import {StringifyUtils} from '../../shared/utils/stringify.utils';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class SecurityContextService {

  private securityContext: SecurityContext;

  constructor(private log: NGXLogger,
              private jwtHelperService: JwtHelperService) {
  }

  isAuthenticated(): boolean {
    if (!this.getSecurityContext()) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(this.getSecurityContext().authToken);
  }

  getSecurityContext(): SecurityContext {
    if (!this.securityContext) {
      const securityContextAsString = localStorage.getItem('security_context');
      if (securityContextAsString) {
        this.updateSecurityContext(JSON.parse(securityContextAsString, StringifyUtils.ES6AwareReviver));
      }
    }
    return this.securityContext;
  }

  deleteSecurityContext() {
    this.updateSecurityContext(null);
  }

  setSecurityContext(securityContext: SecurityContext) {
    this.updateSecurityContext(securityContext);
  }

  private updateSecurityContext(value: SecurityContext) {
    this.securityContext = value;
    if (value) {
      localStorage.setItem('security_context', JSON.stringify(value, StringifyUtils.ES6AwareReplacer));
      localStorage.setItem('access_token', value.authToken);
    } else {
      localStorage.removeItem('security_context');
      localStorage.removeItem('access_token');
    }
  }

}
