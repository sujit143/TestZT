import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-projectdashboard-layout',
  templateUrl: './projectdashboard-layout.component.html',
  styleUrls: ['./projectdashboard-layout.component.scss']
})
export class ProjectdashboardLayoutComponent implements OnInit {
  title = 'taskboards';
  public isCollapsed = true;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}


  ngOnInit() {
  }
  // collapse() {
  //   this.isCollapsed = !this.isCollapsed;
  //   const navbar = document.getElementsByTagName('nav')[0];
  //   console.log(navbar);
  //   if (!this.isCollapsed) {
  //     // navbar.classList.remove('navbar-transparent');
  //     navbar.classList.add('bg-dark');
  //   } else {
  //     // navbar.classList.add('navbar-transparent');
  //     // navbar.classList.remove('bg-dark');
  //   }
  // }

  logout() {
    // remove user from local storage to log user out
    this.localStorageService.clearAllItem();
    this.router.navigate(['login']);
  }
}
