import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgbCarouselModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { LeaveComponent } from './leave/leave.component';
import { HrmsRoutingModule } from './hrms-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HolidaylistComponent } from './holidaylist/holidaylist.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AccordionModule} from 'primeng/accordion';
import { MatExpansionModule, MatIconModule } from '@angular/material';
@NgModule({
  declarations: [
    LeaveComponent,
    DashboardComponent,
    HolidaylistComponent
  ],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule,
    ToastModule,
    TableModule,
    CardModule,
    HttpClientModule,
    HrmsRoutingModule,
    FormsModule,
    NgbModule,
    // OverlayPanelModule,
    // AccordionModule,
    MatExpansionModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DashboardModule { }
