import {Component, OnInit} from '@angular/core';
import {SecurityAuthenticationService} from '../../security/service/security-authentication.service';
import {SecurityContext} from '../../security/model/security-context.model';
import {SecurityContextService} from '../../security/service/security-context.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  securityContext: SecurityContext;

  constructor(private securityAuthenticationService: SecurityAuthenticationService,
              private securityContextService: SecurityContextService) {
  }

  ngOnInit() {
    this.securityContext = this.securityContextService.getSecurityContext();
  }

  logout() {
    this.securityAuthenticationService.logout();
  }

}
