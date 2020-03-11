
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { MasterService } from 'src/app/services/master.service';
// import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MatDialog, MatTableDataSource, } from '@angular/material';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Employeetimesheet } from '../employeetimesheet';
import { MasterService } from './../../../services/master.service';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatTableDataSource, } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import _ from 'lodash';
import { StickyDirection } from '@angular/cdk/table';


export interface PeriodicElement {
  id: number,
  name: string,
  projectname: string,
  modulename: string,
  taskdescription: string,
  timespent: string,
  fromdate: any,
  status: string,

}

const ELEMENT_DATA: PeriodicElement[] = [
  new Employeetimesheet(1, 'test1', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(2, 'test2', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(3, 'test3', 'zoomteams', 'xyz', 'emgreson', '7 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(4, 'test4', 'zoomteams', 'xyz', 'zoomteamsreson', '5 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(5, 'test5', 'zoomteams', 'xyz', 'emgreson', '8 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(6, 'test6', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '5-21-2020', 'pending'),
  new Employeetimesheet(7, 'test7', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(8, 'test8', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(9, 'test9', 'zoomteams', 'xyz', 'emgreson', '7 hr', '6-21-2020', 'pending'),
  new Employeetimesheet(10, 'test10', 'zoomteams', 'xyz', 'zoomteamsreson', '5 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(11, 'test11', 'zoomteams', 'xyz', 'emgreson', '8 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(12, 'test12', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '5-21-2020', 'pending'),
  new Employeetimesheet(13, 'test13', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(14, 'test14', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(15, 'test15', 'zoomteams', 'xyz', 'emgreson', '7 hr', '6-21-2020', 'pending'),
  new Employeetimesheet(16, 'test16', 'zoomteams', 'xyz', 'zoomteamsreson', '5 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(17, 'test17', 'zoomteams', 'xyz', 'emgreson', '8 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(18, 'test18', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '5-21-2020', 'pending'),
  new Employeetimesheet(19, 'test7', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(20, 'test8', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(21, 'test9', 'zoomteams', 'xyz', 'emgreson', '7 hr', '6-21-2020', 'pending'),
  new Employeetimesheet(22, 'test10', 'zoomteams', 'xyz', 'zoomteamsreson', '5 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(23, 'test11', 'zoomteams', 'xyz', 'emgreson', '8 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(24, 'test12', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '5-21-2020', 'pending'),
  new Employeetimesheet(25, 'test13', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(26, 'test14', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(27, 'test15', 'zoomteams', 'xyz', 'emgreson', '7 hr', '6-21-2020', 'pending'),
  new Employeetimesheet(28, 'test16', 'zoomteams', 'xyz', 'zoomteamsreson', '5 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(29, 'test17', 'zoomteams', 'xyz', 'emgreson', '8 hr', '4-21-2020', 'pending'),
  new Employeetimesheet(30, 'test18', 'zoomteams', 'xyz', 'zoomteamsreson', '9 hr', '5-21-2020', 'pending'),
];
@Component({
  selector: 'app-employetimesheet',
  templateUrl: './employetimesheet.component.html',
  styleUrls: ['./employetimesheet.component.scss']
})
export class EmployetimesheetComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  data = Object.assign(ELEMENT_DATA);
  display: boolean;
  selectDatasource = ELEMENT_DATA;
  taskreactive: FormGroup;
  dialogTitle: string;

  id: number;
  ELEMENT_DATA: any;
  submitted: boolean = false;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private messageService: MessageService,
    private masterService: MasterService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
  ) {
  }
  displayedColumns: string[] = ['Name', 'Project Name', 'Module Name', 'Task Description', 'From Date', 'Time Spent', 'Status', 'Actions'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild('matdialog', { static: false }) matdialog: TemplateRef<any>;
  ngOnInit() {

    this.taskreactive = this.fb.group( 
      {
        id: new FormControl(),
        name: new FormControl(null, Validators.required),
        projectname: new FormControl(null, Validators.required),
        modulename: new FormControl(null, Validators.required),
        taskdescription: new FormControl(null, Validators.required),
        fromdate: new FormControl(null, Validators.required),
        timespent: new FormControl(null, Validators.required),
        status: new FormControl(null, Validators.required),
      }
    );
    this.dataSource.paginator = this.paginator;

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDialogToAdd(passedTitle) {
    this.dialogTitle = passedTitle;
    const dialogRef = this.dialog.open(this.matdialog, {
      disableClose: true,
      height: '750px',
      width: '400px',
    });
    this.taskreactive.reset();
  }
  showDialogToEdit(ELEMENT_DATA, passedTitle) {
    this.dialogTitle = passedTitle;
    const fromdate = new Date(ELEMENT_DATA.fromdate);
    console.log(this.ELEMENT_DATA);
    this.display = true;
    this.taskreactive.patchValue({
      id: ELEMENT_DATA.id,
      name: ELEMENT_DATA.name,
      projectname: ELEMENT_DATA.projectname,
      modulename: ELEMENT_DATA.modulename,
      taskdescription: ELEMENT_DATA.taskdescription,
      fromdate: fromdate,
      timespent: ELEMENT_DATA.timespent,
      status: ELEMENT_DATA.status

    });
    const dialogRef = this.dialog.open(this.matdialog, {
      disableClose: true,
      height: '750px',
      width: '400px',
    });

  }
  onFormSubmit() {
    const test = this.masterService.getFormErrorMessage(this.taskreactive, this.taskreactive);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    }
    else {
      this.submitted = true;
      if (this.taskreactive.value.id === null) {
        const req = {
          id: ELEMENT_DATA.length + 1,
          name: this.taskreactive.value.name,
          projectname: this.taskreactive.value.projectname,
          modulename: this.taskreactive.value.modulename,
          taskdescription: this.taskreactive.value.taskdescription,
          fromdate: this.datePipe.transform(this.taskreactive.value.fromdate, 'MM-dd-yyyy'),
          timespent: this.taskreactive.value.timespent,
          status: this.taskreactive.value.status,
        };
        this.selectDatasource.push(req);
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.dialog.closeAll();
        this.taskreactive.reset();
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Sucessfully' });
        }, 2000);
      }
      else {
        for (let i = 0; i < this.selectDatasource.length; i++) {
          if (this.selectDatasource[i].id === this.taskreactive.value.id) {
            this.selectDatasource[i].id = this.taskreactive.value.id;
            this.selectDatasource[i].name = this.taskreactive.value.name;
            this.selectDatasource[i].projectname = this.taskreactive.value.projectname;
            this.selectDatasource[i].modulename = this.taskreactive.value.modulename;
            this.selectDatasource[i].taskdescription = this.taskreactive.value.taskdescription;
            this.selectDatasource[i].fromdate = this.datePipe.transform(this.taskreactive.value.fromdate, 'MM-dd-yyyy');
            this.selectDatasource[i].timespent = this.taskreactive.value.timespent;
            this.selectDatasource[i].status = this.taskreactive.value.status;
          }

          this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
          this.taskreactive.reset();
          this.dialog.closeAll();

        }
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Upadated Sucessfully' });
        }, 2000);
      }
    }

  }

  removeFromList(Item) {
    ELEMENT_DATA.splice(ELEMENT_DATA.indexOf(Item), 1);
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted Sucessfully' });
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }

  confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {

        this.removeFromList(id);

      },
      reject: () => {

      }
    });
  }
}




  // display: boolean;

  // id: number;

  // name;
  // projectname;
  // modulename;
  // taskdescription;
  // fromdate;

  // status;
  // timespent;
  // status1: any[];

  // taskreactive: FormGroup;
  // msg: string;
  // config: any;
  // collection = [];
  // documentsdata: any;
  // constructor(private fb: FormBuilder,
  //   private masterService: MasterService,
  //   private messageService: MessageService, private act: ActivatedRoute, ) {
  //   this.documentsdata = this.act.snapshot.data[''];

  //   this.config = {
  //     itemsPerPage: 5,
  //     currentPage: 2,
  //     totalItems: this.collection.length
  //   };
  // }

  // emp_deta: Employeetimesheet[] = [
  // new Employeetimesheet(1, 'test1', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '6 hr', 'pending'),
  // new Employeetimesheet(2, 'test2', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '9 hr', 'pending'),
  // new Employeetimesheet(3, 'test3', 'zoomteams', 'xyz', 'emgreson', '6-21-2020', '7 hr', 'pending'),
  // new Employeetimesheet(4, 'test4', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '5 hr', 'pending'),
  // new Employeetimesheet(5, 'test5', 'zoomteams', 'xyz', 'emgreson', '4-21-2020', '8 hr', 'pending'),
  // new Employeetimesheet(6, 'test6', 'zoomteams', 'xyz', 'zoomteamsreson', '5-21-2020', '9 hr', 'pending'),
  // new Employeetimesheet(1, 'test1', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '6 hr', 'pending'),
  // new Employeetimesheet(2, 'test2', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '9 hr', 'pending'),
  // new Employeetimesheet(3, 'test3', 'zoomteams', 'xyz', 'emgreson', '6-21-2020', '7 hr', 'pending'),
  // new Employeetimesheet(4, 'test4', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '5 hr', 'pending'),
  // new Employeetimesheet(5, 'test5', 'zoomteams', 'xyz', 'emgreson', '4-21-2020', '8 hr', 'pending'),
  // new Employeetimesheet(6, 'test6', 'zoomteams', 'xyz', 'zoomteamsreson', '5-21-2020', '9 hr', 'pending'),
  // new Employeetimesheet(1, 'test1', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '6 hr', 'pending'),
  // new Employeetimesheet(2, 'test2', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '9 hr', 'pending'),
  // new Employeetimesheet(3, 'test3', 'zoomteams', 'xyz', 'emgreson', '6-21-2020', '7 hr', 'pending'),
  // new Employeetimesheet(4, 'test4', 'zoomteams', 'xyz', 'zoomteamsreson', '4-21-2020', '5 hr', 'pending'),
  // new Employeetimesheet(5, 'test5', 'zoomteams', 'xyz', 'emgreson', '4-21-2020', '8 hr', 'pending'),
  // new Employeetimesheet(6, 'test6', 'zoomteams', 'xyz', 'zoomteamsreson', '5-21-2020', '9 hr', 'pending'),
  // ];
  // timesheetstatus: Checkstatus1[] = [
  //   new Checkstatus1(1, 'Pending'),
  //   new Checkstatus1(2, 'Completed'),
  // ];

  // ngOnInit() {
  //   this.ReactiveForm();
  // }

  // ReactiveForm() {
  //   this.taskreactive = this.fb.group(
  //     {
  //       id: new FormControl(),
  //       name: new FormControl(),
  //       projectname: new FormControl(),
  //       modulename: new FormControl(),
  //       taskdescription: new FormControl(),
  //       fromdate: new FormControl(),
  //       timespent: new FormControl(),
  //       status: new FormControl(),
  //     }
  //   );
  // }

  // onDelete(data) {
  //   console.log();
  //   if (confirm(this.msg) === true) {
  //     this.emp_deta.splice(this.emp_deta.indexOf(data), 1);
  //   }
  // }


  // showDialogToEdit(item) {
  //   console.log(this.emp_deta);
  //   this.display = true;
  //   this.taskreactive.patchValue({
  //     id: item.id,
  //     name: item.name,
  //     projectname: item.projectname,
  //     modulename: item.modulename,
  //     taskdescription: item.taskdescription,
  //     fromdate: item.fromdate,
  //     timespent: item.timespent,
  //     status: item.status

  //   });

  // }

  // addDialog() {
  //   this.taskreactive.reset();
  //   this.id = undefined;
  //   this.display = true;
  // }

  // onFormsubmit() {
  // const test = this.masterService.getFormErrorMessage(this.taskreactive, this.taskreactive);
  // if (test !== undefined) {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'Error Message',
  //     detail: test
  //   });
  // }

  // if (this.id == undefined) {
  //   this.emp_deta.push(new Employeetimesheet(
  //     this.taskreactive.value.id,
  //     this.taskreactive.value.name,
  //     this.taskreactive.value.projectname,
  //     this.taskreactive.value.modulename,
  //     this.taskreactive.value.taskdescription,
  //     this.taskreactive.value.fromdate,
  //     this.taskreactive.value.timespent,
  //     this.taskreactive.value.status,

  //   ));
  //   this.display = false;
  //   setTimeout(() => {
  //     this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Added Sucessfully' });

  //   }, 2000);
  //   this.ngOnInit();

  // }
  // else {
  //   _.forEach(this.emp_deta, (data, index) => {
  //     if (this.id === data.id) {
  //       data.name = this.taskreactive.value.name;
  //       data.projectname = this.taskreactive.value.projectname;
  //       data.modulename = this.taskreactive.value.modulename;
  //       data.taskdescription = this.taskreactive.value.taskdescription;
  //       data.fromdate = this.taskreactive.value.fromdate;
  //       data.timespent = this.taskreactive.value.timespent;
  //       data.status = this.taskreactive.value.status;
  //     }
  //   });

  //   this.display = false;
  //   setTimeout(() => {
  //     this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated Sucessfully' });

  //   }, 1000);
  // }
  // }
  // chanestaus(emp_data) {
  //   console.log(emp_data);
  //   emp_data.status = emp_data.status.name;

  // }



