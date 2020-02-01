import {Injectable, SecurityContext} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SecurityContextService {

  private securityContext: SecurityContext;

  constructor() {
  }

  isAuthenticated(): boolean {
    return false;
  }

  deleteSecurityContext() {
    this.updateSecurityContext(null);
  }

  private updateSecurityContext(value: SecurityContext) {
    this.securityContext = value;
  }

}
