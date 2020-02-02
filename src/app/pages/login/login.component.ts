import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityContextService} from '../security/service/security-context.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityAuthenticationService} from '../security/service/security-authentication.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private log: NGXLogger,
              private router: Router,
              private route: ActivatedRoute,
              private securityContextService: SecurityContextService,
              private securityAuthenticationService: SecurityAuthenticationService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (this.securityContextService.isAuthenticated()) {
          this.autoLogin();
        } else {
          this.securityAuthenticationService.clearAuthentication();
        }
      });

    this.form = this.fb.group({
      username: ['louise', [Validators.required]],
      password: ['louise', [Validators.required]]
    });
  }

  private autoLogin() {
    return this.router.navigate(['/home']);
  }

  login() {
    this.securityAuthenticationService
      .login(this.form.value)
      .then(securityContext => {
        this.log.debug('Login completed!');
      });
  }

}
