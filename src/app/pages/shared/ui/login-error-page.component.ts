import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'login-error-page',
  templateUrl: 'login-error-page.component.html',

})
export class LoginErrorPageComponent implements OnInit {

  constructor(private titleService: Title) {
  }

  ngOnInit(): any {
    this.titleService.setTitle('Error 403');
  }

  logout() {
  }

}
