import { AppConstant } from './../../app.constant';
import { LocalStorageService } from './../../shared/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, isEmpty } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  login(username: string, password: string) {
    let isLogin = null;
    return this.http
      .get<any>('assets/jsonfile/employeedetails.json')
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));
             isLogin = _.filter(user, (u) => {
               return (u.username === username && u.password === password);
             });
             if (! _.isEmpty(isLogin)) {
                this.localStorageService.addItem(AppConstant.API_CONFIG.LOCALSTORAGE.USERINFO, isLogin);
             }
          }

          return isLogin;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.localStorageService.clearAllItem();
  }
}
