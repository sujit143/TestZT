import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { ConfirmationService } from 'primeng/api';
import {
  moveItemInArray,
  CdkDragDrop,
  transferArrayItem
} from "@angular/cdk/drag-drop";



export interface FieldCollection {
  id: number;
  fieldlabel: string;
  fieldtype: string;
  format;
}

export interface PeriodicElement {
  position: number;
  field: string;
  description: string;

}

export interface FieldCategory {
  id: number;
  fieldName: string;
  fieldFormat: any;
  List: List[];
}
export interface List {
  id: number;
  listName: string;
  listValue: any[];
}
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  displayedColumn: string[] = ['position', 'field', 'description'];

  todo: String[] = [
    "Actual Duration",
    "Archived",
    "Assigned To",
    "Attachment",
    "Build Number"
  ];
  done: string[] = ["Build Number of Fix"];
  proCategory: { id: number; proName: string; proFormat: string; List: any[]; }[];
  fCategory: { id: number; fName: string; fFormat: string; List: any[]; }[];
  pCategory: { id: number; pName: string; pFormat: string; List: any[]; }[];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  fieldData: FieldCollection[] = [
    {id: 1, fieldlabel: 'Work Item Created', fieldtype: 'Created', format: 'True'},
    {id: 2, fieldlabel: 'Work Item Updated', fieldtype: 'Updated', format: 'True'},
    {id: 3, fieldlabel: 'Work Item Deleted', fieldtype: 'Deleted', format: 'True'},
  ];
  data = Object.assign(this.fieldData);
  @ViewChild('matdialog', {static: false}) matdialog: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'Field Label', 'Field Type', 'Format', 'Actions'];
  dataSource = new MatTableDataSource<FieldCollection>(this.fieldData);
  selectDatasource = this.fieldData;
  dialogTitle: string;
  fieldForm: FormGroup;
  color;
  listSelected;
  fieldCategory: FieldCategory[];
  listCategory: List[];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
  ) {
    this.color = 'primary',
    this.fieldForm = this.fb.group({
      id: [],
      fieldtype: [Validators.required],
      fieldlabel: [null, Validators.required],
      listvalue: []
    });
  }

  ngOnInit() {
    this.fieldCategory = [
      {id: 1, fieldName: 'Created', fieldFormat: '', List: []},
      {id: 2, fieldName: 'Updated', fieldFormat: '', List: this.listCategory},
      {id: 3, fieldName: 'Deleted', fieldFormat: '', List: []},

    ];

    this.proCategory = [

    {id: 1, proName: 'All Project', proFormat:'',List:[]},
    {id: 1, proName: 'ZoomTeams', proFormat:'',List:[]},
    {id: 1, proName: 'YourDrs', proFormat:'',List:[]},
    {id: 1, proName: 'Web', proFormat:'',List:[]},
    ]

    this.fCategory = [

      {id: 1, fName: 'Actual Duration', fFormat:'',List:[]},
      {id: 1, fName: 'Archived',fFormat:'',List:[]},
      {id: 1, fName: 'Assigned To', fFormat:'',List:[]},
      {id: 1, fName: 'Attachments', fFormat:'',List:[]},
      {id: 1, fName: 'Build Number', fFormat:'',List:[]},
      {id: 1, fName: 'Build Number of Fix',fFormat:'',List:[]},
      {id: 1, fName: 'Changed By', fFormat:'',List:[]},
      {id: 1, fName: 'Comments', fFormat:'',List:[]},
      {id: 1, fName: 'Created By', fFormat:'',List:[]},
      {id: 1, fName: 'Created By Email Address', fFormat:'',List:[]},
      {id: 1, fName: 'Created Date', fFormat:'',List:[]},
      {id: 1, fName:'Customer Contact', fFormat:'',List:[]},
      {id: 1, fName: 'Date Fixed',fFormat:'',List:[]},
      {id: 1, fName: 'Date Found', fFormat:'',List:[]},
      {id: 1, fName: 'Description', fFormat:'',List:[]},
      {id: 1, fName: 'Due Date', fFormat:'',List:[]},
      {id: 1, fName: 'Emails', fFormat:'',List:[]},
      {id: 1, fName: 'Initial Estimate', fFormat:'',List:[]},
      {id: 1, fName:'Priority', fFormat:'',List:[]},
      ]


    this.pCategory = [

      {id: 1, pName: 'High', pFormat:'',List:[]},
      {id: 1, pName: 'Medium', pFormat:'',List:[]},
      {id: 1, pName: 'Low', pFormat:'',List:[]}

      ]

      const E_DATA: PeriodicElement[] = [
        {position: 1, field: 'Priority',description: 'high'},
        {position: 2,field: 'Actual Duration', description:'low'},
        {position: 3, field: 'Assigned To',  description:'medium'}

      ];



  }

  openDialog(passedTitle) {
    this.dialogTitle = passedTitle;
    const dialogRef = this.dialog.open(this.matdialog, { disableClose:true
    });

    this._subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      this.fieldForm.reset();
    }));
  }
  openDialogEdit(passedTitle, formData) {
    this.dialogTitle = passedTitle;
    // console.log(formData);
    this.fieldForm.patchValue({
      id: formData.id,
      fieldtype : formData.fieldtype,
      fieldlabel: formData.fieldlabel,
      listvalue: formData.listvalue
    });
    this.dialog.open(this.matdialog, {
      // height: '400px',
      // width: '600px',

    });
  }
  onFieldSave() {
    // console.log(this.fieldForm.value.id);
    if (this.fieldForm.value.id === null) {
      const req = {
        id: this.fieldData.length + 1,
        fieldlabel: this.fieldForm.value.fieldlabel ,
        fieldtype: this.fieldForm.value.fieldtype,
        listvalue: this.fieldForm.value.listvalue,
        format: ''
      };
      console.log(req);
      stop;
      this.data.push(req);
    } else {
      for (let i = 0; i <this.data.length; i++)  {
        // console.log(this.data);
        // console.log(this.data[i].id);
        if (this.data[i].id === this.fieldForm.value.id) {
          console.log('if');
          // alert(this.fieldForm.value.id);
          this.data[i].id = this.fieldForm.value.id;
          this.data[i].fieldlabel = this.fieldForm.value.fieldlabel;
          this.data[i].fieldtype =  this.fieldForm.value.fieldtype;
          this.data[i].format = this.fieldForm.value.format;
          this.data[i].listvalue = this.fieldForm.value.listvalue;

        }
        else {
          console.log('else');
        }
        this.fieldForm.reset();
        this.dialog.closeAll();
      }
    }
    this.dialog.closeAll();
    this.dataSource = new MatTableDataSource<FieldCollection>(this.data);
    // console.log(fieldData);
  }
  confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteField(id);
      },
      reject: () => {
      }
    });
  }

  onDeleteField(deleteItem) {
    this.data.splice(this.fieldData.indexOf(deleteItem), 1);
    this.dataSource = new MatTableDataSource<FieldCollection>(this.data);
  }

  onClone(cloneElement) {
    const clonedata = {
      id: this.fieldData.length + 1,
      fieldlabel: cloneElement.fieldlabel + ' ' + 'copy' ,
        fieldtype: cloneElement.fieldtype,
        format: cloneElement.format
    };
    this.data.push(clonedata);
    this.dataSource = new MatTableDataSource<FieldCollection>(this.data);

  }



  logout() {
    // remove user from local storage to log user out
    this.localStorageService.clearAllItem();
    this.router.navigate(['login']);
  }
  getFontSize() {
    // return Math.max(10, this.fieldForm.value.fontSize);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

}

