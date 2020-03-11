import { ProjectdashboardLayoutComponent } from './../../projectdashboard-layout/projectdashboard-layout.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LeavecompComponent } from './../../leavecomp/leavecomp.component';
import { Routes } from '@angular/router';
import { ReadmoreComponent } from './../../user-profile/readmore/readmore.component';
import { EditarticleComponent } from './../../user-profile/editarticle/editarticle.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddarticleComponent } from '../../user-profile/addarticle/addarticle.component';
import { HolidaysComponent } from '../../holidays/holidays.component';

import { EmployesearchComponent } from './employesearch/employesearch.component';
import { ProfileComponent } from '../../profile/profile.component';
import { EmployetimesheetComponent } from './employetimesheet/employetimesheet.component';
import { LeavetypeComponent } from '../leavetype/leavetype.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: '../../dashboard/dashboard.module#DashboardModule' },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'settings', loadChildren: '../../typography/settings.module#SettingsModule' },
  { path: 'icons', component: IconsComponent },
  // { path: 'taskboards', component: ProjectdashboardLayoutComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'add', component: AddarticleComponent },
  { path: 'edit', component: EditarticleComponent },
  {
    path: 'readmore', component: ReadmoreComponent
  },
  {
    path: 'Leave', component: LeavecompComponent
  },
  {
    path: 'holiday', component: HolidaysComponent
  },
  {
    path: 'search', component: EmployesearchComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'timesheet', component: EmployetimesheetComponent
  },
  {
    path: 'configuration', component: ConfigurationComponent
  },
  {
    path: 'LeaveTypes', component: LeavetypeComponent
  }
];
