import {Component, OnInit} from '@angular/core';
import {SecurityAuthenticationService} from '../../security/service/security-authentication.service';
import {SecurityContext} from '../../security/model/security-context.model';
import {SecurityContextService} from '../../security/service/security-context.service';
import {UserContext} from '../../user/model/user-context.model';
import {UserContextHolder} from '../../user/model/user-context.holder';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  securityContext: SecurityContext;
  userContext: UserContext;

  constructor(private securityAuthenticationService: SecurityAuthenticationService,
              private securityContextService: SecurityContextService,
              private userContextHolder: UserContextHolder) {
  }

  ngOnInit() {
    this.securityContext = this.securityContextService.getSecurityContext();
    this.userContext = this.userContextHolder.get();
  }

  logout() {
    this.securityAuthenticationService.logout();
  }

}
