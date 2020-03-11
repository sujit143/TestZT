import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../shared/local-storage.service';
import { KbarticlesService } from '../services/appservices/kbarticles.service';
import { DropdownModule } from 'primeng/primeng';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
// import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  providers: [LocalStorageService, KbarticlesService,
  ]
})
export class ComponentsModule { }


