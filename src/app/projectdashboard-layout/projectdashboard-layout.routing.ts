import { CustomfieldsComponent } from './components/customfields/customfields.component';
import { FieldtemplatesComponent } from './components/fieldtemplates/fieldtemplates.component';
import { SecurityRolesComponent } from './components/security-roles/security-roles.component';

import { Routes } from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';
import { NotificationComponent } from './components/notification/notification.component';

export const ProjectDashboardLayoutRoutes: Routes = [
  {path: 'fields', component: CustomfieldsComponent},
  {path: 'securityroles', component: SecurityRolesComponent},
  {path: 'fieldtemplates', component: FieldtemplatesComponent},
  {path: 'list', component: ListsComponent},
  {path: 'notifications', component: NotificationComponent}
];
