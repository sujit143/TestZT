import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatTableDataSource, MatDialogConfig, } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import _ from 'lodash';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MasterService } from '../services/master.service';
import { AppConstant } from '../app.constant';
import { LocalStorageService } from '../shared/local-storage.service';


export interface PeriodicElement {
  id: number;
  name: string;
  dates: any;
  days: number;
  location: number;
}
export interface Location {
  id: number;
  value: string;
  viewValue: string;

}
const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'New Year', dates: '01-01-2020', days: 1, location: 1 },
  { id: 2, name: 'Ugadi', dates: '02-11-2020', days: 1, location: 2 },
  { id: 3, name: 'Ramzan', dates: '03-15-2020', days: 1, location: 3 },
  { id: 4, name: 'Ganesha Festival', dates: '04-21-2020', days: 1, location: 2 },
  { id: 5, name: 'Independence day', dates: '05-31-2020', days: 1, location: 3 },
  { id: 6, name: 'Republic Day', dates: '06-11-2020', days: 1, location: 1 },
  { id: 7, name: 'Dasara', dates: '07-19-2020', days: 1, location: 2 },
  { id: 8, name: 'Diwali', dates: '08-01-2020', days: 1, location: 3 },
  { id: 9, name: 'Good Friday', dates: '09-25-2020', days: 1, location: 1 },
  { id: 10, name: 'Christmas', dates: '12-25-2020', days: 1, location: 1 },
  { id: 11, name: 'Ganesha Festival', dates: '04-21-2020', days: 1, location: 2 },
  { id: 12, name: 'Independence day', dates: '05-31-2020', days: 1, location: 3 },
  { id: 13, name: 'Republic Day', dates: '06-11-2020', days: 1, location: 1 },
  { id: 14, name: 'Dasara', dates: '07-19-2020', days: 1, location: 2 },
  { id: 15, name: 'Diwali', dates: '08-01-2020', days: 1, location: 3 },
  { id: 16, name: 'Good Friday', dates: '09-25-2020', days: 1, location: 1 },
  { id: 17, name: 'Christmas', dates: '12-25-2020', days: 1, location: 1 },
];
export interface HolidayElement {
  name: string;
  dates: any;
  days: number;
}
const HolidayData: HolidayElement[] = [
  {  name: 'New Year', dates: '01-01-2020', days: 1 },
  {  name: 'Ugadi', dates: '02-11-2020', days: 1},
  { name: 'Ramzan', dates: '03-15-2020', days: 1},
  {  name: 'New Year', dates: '01-01-2020', days: 1 },
  {  name: 'Ugadi', dates: '02-11-2020', days: 1},
  { name: 'Ramzan', dates: '03-15-2020', days: 1},
  { name: 'Ganesha Festival', dates: '04-21-2020', days: 1 },
  { name: 'Independence day', dates: '05-31-2020', days: 1 },
  {  name: 'Republic Day', dates: '6-11-2020', days: 1 },
  {  name: 'Dasara', dates: '07-19-2020', days: 1 },
  {  name: 'Diwali', dates: '08-01-2020', days: 1 },
  {  name: 'Good Friday', dates: '09-25-2020', days: 1 },
  {  name: 'Christmas', dates: '12-25-2020', days: 1 },
  {  name: 'Republic Day', dates: '06-11-2020', days: 1 },
  {  name: 'Dasara', dates: '07-19-2020', days: 1 },
  {  name: 'Diwali', dates: '08-01-2020', days: 1 },
  {  name: 'Good Friday', dates: '09-25-2020', days: 1 },
  {  name: 'Christmas', dates: '12-25-2020', days: 1 },
];
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  data: any;
  data1 = Object.assign(HolidayData);
  selectDatasource = ELEMENT_DATA;
  selectDatasource1 = HolidayData;
  submitted = false;
  id: number;
  selected_Array1: any;
  selectedLocation: number;
  // role: string;
  // userinfo: any;
  dialogTitle: string;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private masterService: MasterService,
    private localStorageService: LocalStorageService,
    private confirmationService: ConfirmationService,
  ) {
    {
      // this.userinfo = this.localStorageService.getItem(AppConstant.API_CONFIG.LOCALSTORAGE.USERINFO);
      // // this.role = this.userinfo[0].role;
      // console.log('role', this.role);
    }
  }
  displayedColumns: string[] = ['name', 'dates', 'days', 'Actions'];
  displayedColumns1: string[] = ['name', 'dates', 'days'];
 dataSource1 = new MatTableDataSource<HolidayElement>(HolidayData);
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  locations: Location[] = [
    { id: 1, value: 'Bangalore-0', viewValue: 'Bangalore' },
    { id: 2, value: 'Dharwad-1', viewValue: 'Dharwad' },
    { id: 3, value: 'USA-2', viewValue: 'USA' }

  ];
  holidayForm: FormGroup;
  @ViewChild('matdialog', { static: false }) matdialog: TemplateRef<any>;
  ngOnInit() {
    this.holidayForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      dates: new FormControl(null , Validators.required),
      days: new FormControl(null, Validators.required ),
      location: new FormControl(null)
    });

    // const defaultLoc = this.userinfo[0].location;
    // this.selectedLocation = defaultLoc;
    this.changeTableContent();
  }
  showDialogToAdd(passedTitle) {
    this.dialogTitle = passedTitle;
    const dialogRef = this.dialog.open(this.matdialog, {
      disableClose: true,
      height: '330px',
      width: '500px',

autoFocus: true,

    });
    this.holidayForm.reset();

  }
  showDialogToEdit( passedTitle, ELEMENT_DATA) {
    this.dialogTitle = passedTitle;
    const dates = new Date (ELEMENT_DATA.dates);
    this.holidayForm.patchValue({
      id: ELEMENT_DATA.id,
      name: ELEMENT_DATA.name,
      dates: dates,
      days: ELEMENT_DATA.days
    });
    const dialogRef = this.dialog.open(this.matdialog, {
      disableClose: true,
      height: '330px',
      width: '500px',
    });
  }
  onFormSubmit() {
    const test = this.masterService.getFormErrorMessage(this.holidayForm, this.holidayForm);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else {
      this.submitted = true;
      if (this.holidayForm.value.id === null) {
        const req = {
          id: ELEMENT_DATA.length + 1,
          name: this.holidayForm.value.name,
          dates: this.datePipe.transform(this.holidayForm.value.dates, 'MM-dd-yyyy'),
          days: this.holidayForm.value.days,
         location: this.selectedLocation
        };
        this.selectDatasource.push(req);

         this.dialog.closeAll();
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Sucessfully' });
        }, 2000);
      } else {
        for (let i = 0; i < this.selectDatasource.length; i++) {
          if (this.selectDatasource[i].id === this.holidayForm.value.id) {
            this.selectDatasource[i].id = this.holidayForm.value.id;
            this.selectDatasource[i].name = this.holidayForm.value.name;
            this.selectDatasource[i].dates = this.datePipe.transform(this.holidayForm.value.dates, 'MM-dd-yyyy');
            this.selectDatasource[i].days = this.holidayForm.value.days;
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Sucessfully' });
            }, 1000);
          }
          this.dialog.closeAll();
            }
      }
         }
         this.changeTableContent();
           }


  removeFromList(Item ) {
    this.selectDatasource.splice(ELEMENT_DATA.indexOf(Item), 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Deleted Sucessfully'
    });
         this.changeTableContent();
  }

  confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeFromList(id);
      },
      reject: () => {}
    });
  }

  public changeTableContent() {
           this.selected_Array1 = _.filter(this.selectDatasource, (s) => {
          return s.location === this.selectedLocation;
        });
        console.log(this.selected_Array1);
       }
  selected_Array(selected_Array1: any) {
    throw new Error('Method not implemented.');
  }



}




