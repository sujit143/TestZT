import { Subscription } from 'rxjs';
import { MasterService } from './../../../services/master.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface FieldCollection {
  id: number;
  fieldlabel: string;
  fieldtype: string;
  format;
  attribute: string;
  listid?: any[];
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
  selector: 'app-customfields',
  templateUrl: './customfields.component.html',
  styleUrls: ['./customfields.component.scss']
})
export class CustomfieldsComponent implements OnInit, OnDestroy {
  listCategory: List[] = [
    { id: 1, listName: 'Priority Types', listValue: ['Low', 'Medium', 'High'] },
    { id: 2, listName: 'Status Types', listValue: ['Open', 'On Hold', 'In progress', 'Re-Opened', 'Testing', 'Closed'] },
    { id: 3, listName: 'Severity Types', listValue: ['No Impact', 'Low Impact', 'Medium Impact', 'High Impact', 'Critical'] },
    { id: 4, listName: 'Release Types', listValue: ['\'product\':{\'Concept\',\'In Progress\', \'Canceled\'}', '\'Version\':{\'Planning\',\'Design\',\'Development & Test\',\'Released\',\'Canceled\'}', '\'Sprint\':{\'Planned\',\'In Progress\',\'Completed\'}'] }
  ];

  fieldData: FieldCollection[] = [
    {
      id: 1, fieldlabel: 'Item Type', fieldtype: 'List', format: '', attribute: "<input type=\"text\" placeholder=\"\" name=\"\">",
      listid: this.listCategory
    },
    { id: 2, fieldlabel: 'Test Iteration', fieldtype: 'Number', format: 'Integer', attribute: "<input type=\"text\" placeholder=\"\" name=\"\">" },
    { id: 3, fieldlabel: 'Build', fieldtype: 'Checkbox', format: '', attribute: "<input type=\"text\" placeholder=\"\" name=\"\">" },
  ];
  data = Object.assign(this.fieldData);
  @ViewChild('matdialog', { static: false }) matdialog: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'Field Label', 'Field Type', 'Format', 'Actions'];
  dataSource = new MatTableDataSource<FieldCollection>(this.fieldData);
  selectDatasource = this.fieldData;
  dialogTitle: string;
  fieldForm: FormGroup;
  listSelected;
  fieldCategory: FieldCategory[];
  private _subscriptions = new Subscription();
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private masterService: MasterService
  ) {
      this.fieldForm = this.fb.group({
        id: [],
        fieldtype: [null, Validators.required],
        fieldlabel: [null, [Validators.required, Validators.pattern('^[_A-z0-9]*((-| )*[_A-z0-9])*$')]],
        listvalue: []
      });
  }

  ngOnInit() {
    this.fieldCategory = [
      { id: 1, fieldName: 'Number', fieldFormat: '', List: [] },
      { id: 2, fieldName: 'List', fieldFormat: '', List: this.listCategory },
      { id: 3, fieldName: 'Text', fieldFormat: '', List: [] },
      { id: 4, fieldName: 'Checkbox', fieldFormat: '', List: [] },
    ];

  }

  openDialog(passedTitle) {
    this.dialogTitle = passedTitle;
    const dialogRef = this.dialog.open(this.matdialog, {
      disableClose: true
    });
    this.fieldForm.reset();

    this._subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }));
  }
  openDialogEdit(passedTitle, formData) {
    this.dialogTitle = passedTitle;
    // console.log(formData);
    this.fieldForm.patchValue({
      id: formData.id,
      fieldtype: formData.fieldtype,
      fieldlabel: formData.fieldlabel,
      listvalue: formData.listvalue
    });
    this.dialog.open(this.matdialog, {
      disableClose: true
      // height: '400px',
      // width: '600px',

    });
  }
  onFieldSave() {
    const test = this.masterService.getFormErrorMessage(this.fieldForm, this.fieldForm);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else {
      if (this.fieldForm.value.id === null) {
        const req = {
          id: this.fieldData.length + 1,
          fieldlabel: this.fieldForm.value.fieldlabel,
          fieldtype: this.fieldForm.value.fieldtype,
          listvalue: this.fieldForm.value.listvalue,
          format: '',
        };
        this.data.push(req);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Added Successfully'
        });
      } else {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].id === this.fieldForm.value.id) {
            this.data[i].id = this.fieldForm.value.id;
            this.data[i].fieldlabel = this.fieldForm.value.fieldlabel;
            this.data[i].fieldtype = this.fieldForm.value.fieldtype;
            this.data[i].format = this.fieldForm.value.format;
            this.data[i].listvalue = this.fieldForm.value.listvalue;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated Successfully'
          });
          this.dialog.closeAll();
        }
        this.fieldForm.reset();
      }
    }
    this.dialog.closeAll();
    this.dataSource = new MatTableDataSource<FieldCollection>(this.data);

  }
  confirmDelete(item) {
    console.log(item);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?' + ' ' + item.fieldlabel,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteField(item);
      },
      reject: () => {
      }
    });
  }

  onDeleteField(deleteItem) {
    this.data.splice(this.fieldData.indexOf(deleteItem), 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: deleteItem.fieldlabel + ' ' + 'Deleted '
    });
    this.dataSource = new MatTableDataSource<FieldCollection>(this.data);
  }

  onClone(cloneElement) {
    const clonedata = {
      id: this.fieldData.length + 1,
      fieldlabel: cloneElement.fieldlabel + ' ' + 'copy',
      fieldtype: cloneElement.fieldtype,
      format: cloneElement.format
    };
    this.data.push(clonedata);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: cloneElement.fieldlabel + ' ' + 'Copied '
    });
    this.dataSource = new MatTableDataSource<FieldCollection>(this.data);

  }

  onSelectedList() {
    if (this.fieldForm.value.fieldtype === 'List') {
      this.listSelected = true;
      this.listCategory = [
        { id: 1, listName: 'Priority Types', listValue: ['Low', 'Medium', 'High'] },
        { id: 2, listName: 'Status Types', listValue: ['Open', 'On Hold', 'In progress', 'Re-Opened', 'Testing', 'Closed'] },
        { id: 3, listName: 'Severity Types', listValue: ['No Impact', 'Low Impact', 'Medium Impact', 'High Impact', 'Critical'] },
        { id: 4, listName: 'Release Types', listValue: ['\'product\':{\'Concept\',\'In Progress\', \'Canceled\'}', '\'Version\':{\'Planning\',\'Design\',\'Development & Test\',\'Released\',\'Canceled\'}', '\'Sprint\':{\'Planned\',\'In Progress\',\'Completed\'}'] }
      ];
    } else {
      this.listSelected = false;
    }
  }

  logout() {
    // remove user from local storage to log user out
    this.localStorageService.clearAllItem();
    this.router.navigate(['login']);
  }
  getFontSize() {
    // return Math.max(10, this.fieldForm.value.fontSize);
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
