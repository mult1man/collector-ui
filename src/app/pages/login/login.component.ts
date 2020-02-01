import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityContextService} from '../security/service/security-context.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private securityContextService: SecurityContextService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (this.securityContextService.isAuthenticated()) {
          this.autoLogin();
        }
      });

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  private autoLogin() {
    return this.router.navigate(['/home']);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

}
