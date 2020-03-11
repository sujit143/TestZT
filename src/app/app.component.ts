import { Component } from '@angular/core';
import { LocalStorageService } from '../app/shared/local-storage.service';
import { AppConstants } from './utility/AppContants';
import { AppGlobals } from './utility/AppGlobals';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  loggedIn = false;  
  showSlidingMenu = AppGlobals.IsSlidingMenuVisible;
  constructor(private router: Router, private authService: AuthService) {

  }

  navigateToDefaultPage(){
    if(this.authService.isLoggedIn() == true)
    {      console.log("appcompo", this.authService.isLoggedIn());
        this.router.navigate(['dashboard']);
    }
    else{
      this.router.navigate(['login']);
    }
    
  }

}
