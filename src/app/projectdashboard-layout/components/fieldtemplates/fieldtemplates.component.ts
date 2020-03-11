import { Subscription } from 'rxjs';
import { FieldCollection } from './../customfields/customfields.component';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../shared/local-storage.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface TemplateCollection {
  id: number;
  templateName: string;
  description: string;
  templateFlag: boolean;
  fieldList?: FieldCollection[];
}
export interface DefaultTemplateCollection {
  id: number;
  templateName: string;
  description: any;
  templateFlag: boolean;
}
export interface List {
  id: number;
  listName: string;
  listValue: any[];
}

@Component({
  selector: 'app-fieldtemplates',
  templateUrl: './fieldtemplates.component.html',
  styleUrls: ['./fieldtemplates.component.scss']
})
export class FieldtemplatesComponent implements OnInit, OnDestroy {
  templateData: TemplateCollection[] = [
    {id: 1, templateName: 'Starter Field Template', description: 'List', templateFlag: false , fieldList: []},
    {id: 2, templateName: 'Portal Field Template', description: 'Number', templateFlag: true },
    {id: 3, templateName: 'Development field Template', description: 'Checkbox', templateFlag: true},
  ];
  fieldsList: FieldCollection[] = [
    {id: 1, fieldlabel: 'Item Type', fieldtype: 'List', format: '', attribute: ` <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option></option>
      <option>2</option>
    </select>`},
    {id: 2, fieldlabel: 'Test Iterations', fieldtype: 'Number', format: 'Integer', attribute: "<p><input type='number'></p>"},
    {id: 3, fieldlabel: 'Build', fieldtype: 'Checkbox', format: '', attribute: "<div><input type=\"text\" placeholder=\"\" name=\"name\"><div>"},
  ];
  templateFieldsList: FieldCollection[] = [
    {id: 1, fieldlabel: 'Item Type', fieldtype: 'List', format: '', attribute: `<mat-form-field>
    <input matInput type="text" placeholder="Field Label">
  </mat-form-field>`},
  ];

  data = Object.assign(this.templateData);
  @ViewChild('matdialog', {static: false}) matdialog: TemplateRef<any>;
  displayedColumns: string[] = ['Field Template Name', 'Description', 'Is Active', 'Actions'];
  dataSource = new MatTableDataSource<TemplateCollection>(this.templateData);
  selectDatasource = this.templateData;
  templateForm: FormGroup;
  color;
  dialogTitle;
  defaultTemplate: DefaultTemplateCollection[];
  listCategory: List[];
  private _subscriptions = new Subscription();
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public _sanitizer: DomSanitizer
  ) {
    this.color = 'primary',
    this.templateForm = this.fb.group({
      id: [],
      description: [null],
      templateName: [null, Validators.required],
      tempflag: [null, Validators.required]
    });
  }


  ngOnInit() {
    console.log(this.templateData[0].templateFlag);
    // this.defaultTemplate = [
    //   {id: 1, templateName: 'Number', description: '', List: []},
    //   {id: 2, templateName: 'List', description: '', List: this.listCategory},
    //   {id: 3, templateName: 'Text', description: '', List: []},
    //   {id: 4, templateName: 'Checkbox', description: '', List: []},
    // ];

  }

  openDialog() {
    const dialogRef = this.dialog.open(this.matdialog, { disableClose: true
      // maxWidth: '100vw',
      // maxHeight: '100vh',
      // width: '750px',
      // height: '85vh',
      // data:''
      // height: '400px',
      // width: '600px',
      // data: {name: this.name, animal: this.animal}
    });

    this._subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      this.templateForm.reset();
    }));
  }
  openDialogEdit(formData) {
    // console.log(formData);
    this.templateForm.patchValue({
      id: formData.id,
      description : formData.description,
      templateName: formData.templateName,
      tempflag: formData.templateFlag
    });
    this.dialog.open(this.matdialog, {
      // height: '400px',
      // width: '600px',

    });
  }
  onFieldTemplateSave() {
    // console.log(this.templateForm.value.id);
    if (this.templateForm.value.id === null) {
      const req = {
        id: this.templateData.length + 1,
        templateName: this.templateForm.value.templateName ,
        description: this.templateForm.value.description,
        templateFlag: this.templateForm.value.tempflag
      };
      this.data.push(req);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Added Successfully'
      });
    } else {
      for (let i = 0; i <= this.data.length; i++)  {
        // console.log(this.data);
        // console.log(this.data[i].id);
        if (this.data[i].id === this.templateForm.value.id) {
// alert(this.templateForm.value.id);
          this.data[i].id = this.templateForm.value.id;
          this.data[i].templateName = this.templateForm.value.templateName;
          this.data[i].description =  this.templateForm.value.description;
          this.data[i].templateFlag = this.templateForm.value.tempflag;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfully'
        });
      }
    }
    this.dialog.closeAll();
    this.dataSource = new MatTableDataSource<TemplateCollection>(this.data);
    // console.log(templateData);
  }
  confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?' + ' ' ,
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
    this.data.splice(this.templateData.indexOf(deleteItem), 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: deleteItem.templateName + ' ' + 'Deleted '
    });
    this.dataSource = new MatTableDataSource<TemplateCollection>(this.data);
  }

  onClone(cloneElement) {
    const clonedata = {
      id: this.templateData.length + 1,
      templateName: cloneElement.templateName + ' ' + 'copy' ,
      description: cloneElement.description,
      templateFlag: cloneElement.templateFlag
    };
    this.data.push(clonedata);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: cloneElement.templateName + ' ' + 'Copied '
    });
    this.dataSource = new MatTableDataSource<TemplateCollection>(this.data);
    console.log(this.data);
  }

  logout() {
    // remove user from local storage to log user out
    this.localStorageService.clearAllItem();
    this.router.navigate(['login']);
  }
  getFontSize() {
    return Math.max(10, this.templateForm.value.fontSize);
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('Previous Container' + event.previousContainer);
      console.log('container'  + event.container);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container.data);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  /* innerHtml Sanitizer*/
  public _inputpdf: string = '<input type="text" name="fname" placholder="input here">';

  public get inputpdf(): SafeHtml {
     return this._sanitizer.bypassSecurityTrustHtml(this.templateFieldsList[0].attribute);
  }
  /* */
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}

