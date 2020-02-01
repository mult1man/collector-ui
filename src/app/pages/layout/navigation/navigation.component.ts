import {Component, OnInit} from '@angular/core';
import {SecurityAuthenticationService} from '../../security/service/security-authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  constructor(private securityAuthenticationService: SecurityAuthenticationService) {
  }

  ngOnInit() {
  }

  logout() {
    this.securityAuthenticationService.logout();
  }

}
