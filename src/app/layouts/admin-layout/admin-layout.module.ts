import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  MatDialogModule, MatGridListModule, MatCardModule } from '@angular/material';
import {  MatExpansionModule, MatTabsModule, MatRadioModule,  MatButtonModule, MatRippleModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {CdkTableModule} from '@angular/cdk/table';


import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { GrowlModule } from 'primeng/growl';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import { QuillModule } from 'ngx-quill';
import {ButtonModule} from 'primeng/button';

import { LeavecompComponent } from '../../leavecomp/leavecomp.component';
import { ReadmoreComponent } from './../../user-profile/readmore/readmore.component';
import { EditarticleComponent } from './../../user-profile/editarticle/editarticle.component';
import { SearchComponent } from './../../search/search.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddarticleComponent } from '../../user-profile/addarticle/addarticle.component';
import { Base64EncodeDecode } from '../../../app/shared/base64-encode-decode';
import { EmployetimesheetComponent } from './employetimesheet/employetimesheet.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LeavetypeComponent } from '../leavetype/leavetype.component';
import { HolidaysComponent } from '../../holidays/holidays.component';
import { EmployesearchComponent} from './employesearch/employesearch.component';
import { ProfileComponent } from '../../profile/profile.component';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {ToolbarModule} from 'primeng/toolbar';

import {SplitButtonModule} from 'primeng/splitbutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import { RadioButtonModule, MultiSelectModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    GrowlModule,
    ToastModule,
    MatExpansionModule,
    CardModule,
    CheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PaginatorModule,
    PanelModule,
    QuillModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    CalendarModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextareaModule,
    FileUploadModule,
    RadioButtonModule,
    MatTabsModule,
    MatRadioModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatCardModule,
    CdkTableModule,
    MultiSelectModule
  ],
  declarations: [

    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    SearchComponent,
    AddarticleComponent,
    EditarticleComponent,
    ReadmoreComponent,
    LeavecompComponent,
    HolidaysComponent,
    EmployesearchComponent,
    ProfileComponent,
    EmployetimesheetComponent,
    ConfigurationComponent,
    LeavetypeComponent
  ],
  providers: [Base64EncodeDecode, MessageService, DatePipe, ConfirmationService,
   ]
})

export class AdminLayoutModule {}
