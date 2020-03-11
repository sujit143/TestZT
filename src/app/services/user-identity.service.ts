import { Injectable } from '@angular/core';
// import { AppConstants } from '../utility/AppContants';

@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {

  constructor(private localStorage: Storage) { }

  // isLoggedIn(){
  //   return this.localStorage.get(AppConstants.HAS_LOGGED_IN).then((data) =>
  //    { 
  //      return data; 
  //   });
  // }
}
