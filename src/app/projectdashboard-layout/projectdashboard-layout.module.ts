import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MessageService, ConfirmationService } from 'primeng/api';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatTreeModule,
  MatToolbarModule,
  MatTooltipModule,
  MatRadioModule,
  MatGridListModule,
  MatCardModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {TabViewModule} from 'primeng/tabview';
import { TreeModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';

import { ProjectDashboardLayoutRoutes } from './projectdashboard-layout.routing';
import { SecurityRolesComponent} from './components/security-roles/security-roles.component';
import { FieldtemplatesComponent } from './components/fieldtemplates/fieldtemplates.component';
import { ComponentsModule } from './../components/components.module';
import { CustomfieldsComponent } from './components/customfields/customfields.component';
import { ListsComponent } from './components/lists/lists.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ReportsComponent, ChecklistDatabase4 } from './components/security-roles/reports/reports.component';
import { WorkitemsComponent, ChecklistDatabase5 } from './components/security-roles/workitems/workitems.component';



import { Projectprivilages1Component, ChecklistDatabase1 } from './components/security-roles/projectprivilages1/projectprivilages1.component';
import { Projectprivilages2Component, ChecklistDatabase2 } from './components/security-roles/projectprivilages2/projectprivilages2.component';
import { AdministratorComponent, ChecklistDatabase3 } from './components/security-roles/administrator/administrator.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectDashboardLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    NgbModule,
    ToastModule,
    ConfirmDialogModule,
    TreeModule,
    TabViewModule,

    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTreeModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatGridListModule,
    MatRadioModule,
    DragDropModule

  ],
  declarations: [
    SecurityRolesComponent,
    FieldtemplatesComponent,
    CustomfieldsComponent,
    ListsComponent,
    NotificationComponent,
    Projectprivilages1Component,
    Projectprivilages2Component,
    AdministratorComponent,
    ReportsComponent,
    WorkitemsComponent,

],
  providers: [
    ConfirmationService,
    ChecklistDatabase1,
    ChecklistDatabase2,
    ChecklistDatabase3,
    ChecklistDatabase4,
    ChecklistDatabase5,
    MessageService,
  ],
})

export class ProjectDashBoardLayoutModule {}
