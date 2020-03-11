import { AppConstant } from './../app.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { KbarticlesService } from '../services/appservices/kbarticles.service';
import { MessageService } from 'primeng/api';
import { MasterService } from '../services/master.service';
import * as _ from 'lodash';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/appservices/authentication.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  login: FormGroup;
  submitted = false;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private _data: KbarticlesService,
    private _router: Router,
    private messageService: MessageService,
    private masterService: MasterService,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
    this.localStorageService.clearAllItem();
   }

  ngOnInit() {
    this.startApp();
    this.login = this.fb.group({
      user_name: new FormControl(null, Validators.required),
      user_password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null)
    });

    this.login.patchValue({
      user_name : localStorage.getItem('Name'),
      // user_password: localStorage.getItem('token'),
      rememberMe: localStorage.getItem('RememberMe')
    });
  }

  onLoginSubmit(f) {
    const test = this.masterService.getFormErrorMessage(f, this.login);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else {
    //   this.submitted = true;
    //   this._data.login(
    //     this.login.value.user_name,
    //     this.login.value.user_password
    //   );
    //   if (this._data.redirectURL) {
    //     this._router.navigateByUrl(this._data.redirectURL);
    //   } else {
    //     this.route.navigate(['/dashboard']);
    //   }
    // }
    this._subscription.add(this.authenticationService.login(this.login.value.user_name, this.login.value.user_password)
        .pipe(first())
        .subscribe(
            data => {
              if (! _.isEmpty(data)) {
                this.route.navigate(['/dashboard']);
                this.localStorageService.addItem(AppConstant.API_CONFIG.LOCALSTORAGE.USERINFO, data);
              }
              else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error Message',
                  detail: 'username / password is wrong'
                });
              }
            },
            error => {
            }));
          }
  }

  rememberMe(e, login) {
    const marked = e.target.checked;
    if (marked) {
      localStorage.setItem('Name', login.value.user_name);
      // localStorage.setItem('token', login.value.user_password);
      localStorage.setItem('RememberMe', marked);
    } else {
      localStorage.removeItem('Name');
      // localStorage.removeItem('token');
      localStorage.removeItem('RememberMe');

    }
  }

  startApp() {
    // this.authService.setHasSeenTutorials(false);

    if (this.authService.isLoggedIn() === false)
    {
      this.authService.login();
    }

  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
