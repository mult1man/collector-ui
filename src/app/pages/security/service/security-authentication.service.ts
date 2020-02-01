import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityContextService} from './security-context.service';

@Injectable({providedIn: 'root'})
export class SecurityAuthenticationService {

  constructor(private router: Router,
              private securityContextService: SecurityContextService) {
  }

  logout() {
    this.clearAuthentication();
    this.router.navigate(['/login']);
  }

  clearAuthentication() {
    this.securityContextService.deleteSecurityContext();
  }

}
