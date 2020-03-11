import { AppConstants } from './../utility/AppContants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client';
import { UrlConstants } from '../utility/UrlConstants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from './utils';
import { AuthContext } from '../Models/auth-context';
import { LocalStorageService } from '../shared/local-storage.service';
import { AppConstant } from '../../app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  authContext: AuthContext;
  
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { 
    Log.logger = console;    
     var config = {
      authority: AppConstant.STS_AUTHORITY,
      client_id: AppConstant.API_CONFIG.IDENTITY_CONFIG.CLIENTID,
      redirect_uri: `${AppConstant.CLIENTROOT}assets/oidc-login-redirect.html`,
      scope: 'openid zt-api profile roles',
      response_type: 'id_token token',
      post_logout_redirect_uri: `${AppConstant.CLIENTROOT}assets/signout-callback.html`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      automaticSilentRenew: true,      
      silent_redirect_uri: `${AppConstant.CLIENTROOT}assets/silent-redirect.html`
    };
    
    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        this._user = user;
        // this.loadSecurityContext();
      }
    });
    this._userManager.events.addUserLoaded(args => {
      this._userManager.getUser().then(user => {
        this._user = user;
        // this.loadSecurityContext();
      });
    });
  }

  login(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  logout(): Promise<any> {
     //this._userManager.signoutRedirect("Cookies");
     return this._userManager.signoutRedirect("oidc");
  }

  isLoggedIn(): boolean {
    console.log(this._user)
    this.localStorage.addItem(AppConstant.API_CONFIG.LOCALSTORAGE.USERINFO, this._user);
    return this._user !== null && this._user !== undefined && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }

  signoutRedirectCallback(): Promise<any> {
    return this._userManager.signoutRedirectCallback();
  }

  loadSecurityContext() {
    this.httpClient.get<AuthContext>(`${AppConstant.API_ROOT}Account/AuthContext`).subscribe(context => {
      this.authContext = context;
    }, error => console.error(Utils.formatError(error)));
  }
  // hasSeenTutorials(){
  //   return this.localStorage.getItem(AppConstants.HAS_SEEN_TUTORIALS).then((data) => {
  //       return data;
  //   });
    
  // }

  // setHasSeenTutorials(value){
  //   this.localStorage.addItem(AppConstants.HAS_SEEN_TUTORIALS, true);
  // }

}
