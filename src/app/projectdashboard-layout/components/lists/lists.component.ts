import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import {FlatTreeControl} from '@angular/cdk/tree';

import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


import { ConfirmationService, MessageService,Message} from 'primeng/api';
import { MatTableDataSource } from '@angular/material/table';

import { List } from './list';
// import { MasterService } from 'C:/Users/akshata sheelvant/zoomteams-web-ng/src/app/services/master.service';
// import { AppConstant } from './../../../app.constant';
import { MasterService } from './../../../services/master.service';

export interface PeriodicElement {
  id: number;
  Name: string;
  listid: number;
}


let ELEMENT_DATA: PeriodicElement[] = [
  { Name: 'Low', id: 1, listid: 1 },
  { Name: 'Medium', id: 2, listid: 1 },
  { Name: 'High', id: 3, listid: 1 },
  { Name: 'TO DO', id: 4, listid: 2 },
  { Name: 'In progress', id: 5, listid: 2 },
  { Name: 'Completed', id: 6, listid: 2 },
  { Name: 'QA Testing', id: 7, listid: 2 },
  { Name: 'System testing', id: 8, listid: 2 },
  { Name: 'Severity', id: 9, listid: 3 },
  { Name: 'Major', id: 10, listid: 3 },
  { Name: 'Minor', id: 11, listid: 3 },
  { Name: 'Chrome', id: 12, listid: 4 },
  { Name: 'Opera', id: 13, listid: 4 },
  { Name: 'Safari', id: 14, listid: 4 },
  { Name: 'Fire fox', id: 15, listid: 4 },



];
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {
  arr: List[] = [
    new List(1,"priority Types",111),
    new List(2,"Status Types",222),
    new List(3,"Severity Types",333),
    new List(4,"Browser",444),
  ];

  @ViewChild('matdialog5', { static: false }) matdialog5: TemplateRef<any>;
  @ViewChild('matdialog6', { static: false }) matdialog6: TemplateRef<any>;
  // @ViewChild('matdialog7', { static: false }) matdialog7: TemplateRef<any>;

  private _subscriptions = new Subscription();
  selectDatasource = this.arr;
  dialogTitle: string;
  listName : string;
  name: string = "";
  id: number;
  value: string = "";

  listid: number;
  listvalue: string = "";
  lid: number;
  testId: number;

  msg = 'Are You Sure!';
  msg1:string;
  display4: boolean;

  listForm: FormGroup;
  closeResult: string;
  selected_Array: any;
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource(this.arr);



  public changeTableContent(data, index) {
    this.lid = data.id;
    if (index !== undefined) {
      this.testId = index;
    }
    if (data.id === undefined) {
      this.lid = data;

    } else {
      this.lid = data.id;

    }

    for (let i = 0; i < ELEMENT_DATA.length; i++) {
      if (ELEMENT_DATA[i].listid === this.lid) {

        console.log('if');

        this.selected_Array = _.filter(ELEMENT_DATA, (s) => {
          return s.listid == ELEMENT_DATA[i].listid;

        });
        break;
        console.log(this.selected_Array);

      }

      else {
        this.selected_Array = []
        console.log(this.selected_Array);

      }
    }
  }

  constructor(private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private masterService: MasterService


  ) { }

  msgs: Message[] = [];
  ngOnInit() {
    this.listForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
    });

  }

  // List Operation

  openAddListDialog(passedTitle) {
    this.dialogTitle = passedTitle;
    const dialogRef = this.dialog.open(this.matdialog5, {
      disableClose:true,
    });
    this.listForm.reset();
    this._subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      this.arr
      console.log('The dialog was closed');


    }));
  }
  openListEdit(passedTitle, formdata) {


    this.dialogTitle = passedTitle;


    this.id = formdata.id;
    this.listForm.patchValue({
      id: formdata.id,
      name: formdata.name,
      Child_id: formdata.Child_id
    });


    this.dialog.open(this.matdialog5, {  disableClose:true,});
  }

  onListSave() {
    const test = this.masterService.getFormErrorMessage(this.listForm, this.listForm);

    console.log(test);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else{



    if (this.listForm.value.id === null) {
      this.arr.push(new List(
        this.arr.length + 1,
        this.listForm.value.name,
        this.listForm.value.Child_id
       
      ));
      // this.changeTableContent('');
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Added Sucessfully'
      });

      this.changeTableContent('', '');
      this.dataSource = new MatTableDataSource(this.arr);

      // console.log(this.arr);



      this.listForm.reset();
    } else {
      _.forEach(this.arr, (data, index) => {
        if (this.id === data.id) {
          // console.log(this.id);
          // console.log(data.id);
          data.name = this.listForm.value.name;

        }

      });
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Updated Sucessfully'
      });

      this.listForm.reset();
    }

    this.listForm.reset();



    this.dialog.closeAll();
    this.dataSource = new MatTableDataSource(this.arr);

  }

  }

  //List Value operations

  openListValueDialog(passedTitle) {
    this.dialogTitle = passedTitle + ' ' + this.listName;
    const dialogRef = this.dialog.open(this.matdialog6, {
      disableClose:true,
    });
    this.listForm.reset();
    this._subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');


    }));
  }
  openListValueEdit(passedTitle, formData) {

    this.dialogTitle = passedTitle + ' ' + formData.Name;
    // this.dialogTitle = passedTitle;

    this.id = formData.id;
    // alert(formData.id);
    this.listForm.patchValue({
      name: formData.Name,
      id: formData.id
    });

    this.display4 = true;

    this.dialog.open(this.matdialog6, {  disableClose:true,

    });
  }

  onListValueSave() {
    console.log(this.listForm);
    const test = this.masterService.getFormErrorMessage(this.listForm, this.listForm);

    console.log(test);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else{

    if (this.listForm.value.id === null) {
      const req = {
        Name: this.listForm.value.name,
        id: ELEMENT_DATA.length + 1,
        listid: this.lid
      }
      console.log(this.lid);
      ELEMENT_DATA.push((req



      ));
      this.changeTableContent(this.lid, '');
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Added Sucessfully'
      });

      console.log(this.lid);


      console.log(this.lid);
      console.log(this.selected_Array);
      this.listForm.reset();
      this.lid = 0;
    } else {
      _.forEach(this.selected_Array, (data, index) => {

        if (this.listForm.value.id === data.id) {
          // alert(data.id);
          data.Name = this.listForm.value.name;

        }
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'updated Sucessfully'
      });
    }

    this.listForm.reset();
    this.dialog.closeAll();


    this.dialog.closeAll();
    this.dataSource = new MatTableDataSource(this.arr);
  }
  }

  onDelete(data) {
    console.log();
    this.arr.splice(this.arr.indexOf(data), 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Success Message',
      detail: 'Deleted Sucessfully'
    });
    this.dataSource = new MatTableDataSource(this.arr);
    this.changeTableContent('', '');
  }



  confirmDelete(id: number) {
    console.log(id);

    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {

        this.onDelete(id);

      },
      reject: () => {

      }
    });
  }

  confirmDelete1(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {

        this.onDeleteList(id);

      },
      reject: () => {

      }
    });
  }

  onDeleteList(data) {
    console.log(data);

      ELEMENT_DATA.splice(ELEMENT_DATA.indexOf(data), 1);
      this.messageService.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Deleted Sucessfully'
      });

    this.changeTableContent(data.listid, '');
    // this.changeTableContent(data.listid);
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

}

