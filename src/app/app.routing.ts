import { ProjectdashboardLayoutComponent } from './projectdashboard-layout/projectdashboard-layout.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './services/appservices/auth.guard';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'unauthorize', component: UnauthorizeComponent
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'taskboards',
    component: ProjectdashboardLayoutComponent,
    children: [
  {
    path: '',
      loadChildren: './projectdashboard-layout/projectdashboard-layout.module#ProjectDashBoardLayoutModule',
      // canActivate: [AuthGuard]
  }]},
  // { path: 'typography', loadChildren: '../../typography/settings.module#SettingsModule' },
  // {
  //   path: 'taskboards',
  //   component: ProjectdashboardLayoutComponent
  // },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
