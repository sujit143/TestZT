import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit , ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterService } from './../../../services/master.service';

export interface SecurityRoles {
  id: number;
  name: string;
}

@Component({
  selector: 'app-security-roles',
  templateUrl: './security-roles.component.html',
  styleUrls: ['./security-roles.component.scss']
})
export class SecurityRolesComponent implements OnInit {

  roleData: SecurityRoles[] = [
    {id: 1, name: 'Administrator'},
    {id: 2, name: 'Developer'},
    {id: 3, name: 'Product Owner'},
    {id: 4, name: 'Project Manager'},
    {id: 5, name: 'Scrum Master'},
    {id: 6, name: 'Support Engineer'},
    {id: 7, name: 'Tester'},
  ];
  data = Object.assign(this.roleData);
  @ViewChild('matdialog', {static: false}) matdialog: TemplateRef<any>;
  displayedColumns: string[] = ['Id', 'Name','Actions'];
  dataSource = new MatTableDataSource<SecurityRoles>(this.roleData);
  selectDatasource = this.roleData;
  dialogTitle: string;
  secuForm: FormGroup;
  color;
  submitted = false;


  constructor(

    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private masterService: MasterService
  ) {
    this.color = 'primary',
    this.secuForm = this.fb.group({
      id: [],
      name: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.secuForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.matdialog, { disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.secuForm.reset();
    });
  }

  openDialogEdit(secformData) {
    this.secuForm.patchValue({
      id: secformData.id,
      name : secformData.name
    });
    this.dialog.open(this.matdialog, { disableClose: true
      // height: '400px',
      // width: '600px',
    });

  }

  onFieldTemplateSave() {
    const test = this.masterService.getFormErrorMessage(this.secuForm, this.secuForm);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else {
      this.submitted = true;
    if (this.secuForm.value.id === null) {
      const req = {
        id: this.roleData.length + 1,
        name: this.secuForm.value.name
      };
      this.data.push(req);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Added Successfully'
      });
    } else {
      for (let i = 0; i <= this.data.length; i++)  {
        if (this.data[i].id === this.secuForm.value.id) {
          this.data[i].id = this.secuForm.value.id;
          this.data[i].name = this.secuForm.value.name;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfully'
        });
      }
    }
    this.dialog.closeAll();
    this.dataSource = new MatTableDataSource<SecurityRoles>(this.data);
  }
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
    this.data.splice(this.roleData.indexOf(deleteItem), 1);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: deleteItem.name + ' ' + 'Deleted Successfully'
    });
    this.dataSource = new MatTableDataSource<SecurityRoles>(this.data);
  }


  onClone(cloneRole) {
    const clonedata = {
      id: this.roleData.length + 1,
      name: cloneRole.name
    };
    this.data.push(clonedata);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: cloneRole.name + ' ' + 'Copied '
    });
    this.dataSource = new MatTableDataSource<SecurityRoles>(this.data);
    console.log(this.data);
  }

  getFontSize() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
