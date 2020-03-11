import { Subscription } from 'rxjs';
import { Member } from './../../Models/dashboard';


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';

import { MasterService } from './../../services/master.service';
import { AppservicesService } from './../../services/appservices.service';
import { DisplayUser } from '../../Models/user';
import { Pagerinfo } from '../../Models/pagerinfo';
import * as _ from 'lodash';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();
  constructor(
    private _data: AppservicesService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private masterService: MasterService) { }

  uploadFile: File[];
  noRecord = false;
  workDisable = true;
  display = false;
  arrUser: DisplayUser[] = [];
  pagerInfo: Pagerinfo[] = [];
  totalPages: number;
  totalRecords;
  itemsPerPage: string;
  personalInfo: FormGroup;
  workInfo: FormGroup;
  document: FormGroup;
  dialogClose;
  fileList = [];
  ngOnInit() {
    this.getUsers();
    this.setFormControls();
  }

  setFormControls() {
    this.personalInfo = this.fb.group({
      memberId: new FormControl(),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      maritalStatus: new FormControl(null),
      race: new FormControl(null),
      ethnicity: new FormControl(null),
      religion: new FormControl(null),
      address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zipCode: new FormControl(null),
      cell: new FormControl(null),
      workPhone: new FormControl(null),
      workPhoneExt: new FormControl(null),
      country: new FormControl(null),
      ssn: new FormControl(null),
      language: new FormControl(null),

    });
    this.workInfo = this.fb.group({
      orgName: new FormControl(null),
      orgId: new FormControl(null),
      locationName: new FormControl(null),
      designation: new FormControl(null),
      departmentName: new FormControl(null),
      roles: new FormControl(null),
      doj: new FormControl(null),
      supervisor: new FormControl(null)
    });
    this.document = this.fb.group({
      documentType: new FormControl(null),
    });
  }

  getUsers() {
      this._subscriptions.add(this._data.getUsers().subscribe((data: DisplayUser[]) => {
      console.log(data);
      if (! _.isEmpty(data)) {
        this.arrUser = data['members'];
        this.pagerInfo = data['pagerInfo'];
        this.totalPages = this.pagerInfo['totalPages'];
        this.totalRecords = this.pagerInfo['totalItems'];
        this.itemsPerPage = this.pagerInfo['itemsPerPage'];
      } else {
        this.noRecord = true;
      }

      console.log(this.arrUser);
    },
      () => {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server not responding' });
      }
    ));
  }

  paginate(event) {
    const pageNo = event.page + 1;
    this._subscriptions.add(this._data.getUserPage(pageNo).subscribe(
      (data: DisplayUser[]) => {
        this.arrUser = data['members'];
        this.pagerInfo = data['pagerInfo'];
        this.totalPages = this.pagerInfo['totalPages'];
        this.totalRecords = this.pagerInfo['totalItems'];
        this.itemsPerPage = this.pagerInfo['itemsPerPage'];
      }
    ));
  }

  openAdd() {
    this.personalInfo.reset();
    // this.selectedUserOption = passedTitle;
    this.display = true;

  }
  openEdit(item) {
    this.display = true;
    console.log(item);
    this.getFormControlData(item);
  }

  onSavePersonal() {
    const test = this.masterService.getFormErrorMessage(this.personalInfo, this.personalInfo);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    } else {
      // const req = {
      //   memberId:  this.personalInfo.value.memberId,
      //   "firstName": "Sujit",
      //   "middleName": "S",
      //   "lastName": "Shindhe",
      //   "gender": "M",
      //   "email": "sujit@skycliffit.com",
      //   "dob": "1990-10-05",
      //   "address": "Hubbli",
      //   "city": "Hubli",
      //   "state": "Karnataka",
      //   "postalcode": "2153655",
      //   "cell": "5486551",
      //   "workPhone": "65616",
      //   "workPhoneExt": "2563",
      //   // "DesignationId":27,
      //   // "OrgId":1,
      //   // "createdby":5

      //   };
      const req = {
        memberId:  this.personalInfo.value.memberId,
        firstName: this.personalInfo.value.firstName,
        middleName: this.personalInfo.value.MiddleName,
        lastName: this.personalInfo.value.lastName,
        gender: this.personalInfo.value.gender,
        email: this.personalInfo.value.email,
        dob: this.personalInfo.value.dob,
        maritalStatus: this.personalInfo.value.maritalStatus,
        race: this.personalInfo.value.race,
        ethnicity: this.personalInfo.value.ethnicity,
        religion: this.personalInfo.value.religion,
        address: this.personalInfo.value.address,
        address2: this.personalInfo.value.address2,
        city: this.personalInfo.value.city,
        state: this.personalInfo.value.state,
        zipCode: this.personalInfo.value.zipCode,
        cell: this.personalInfo.value.cell,
        workPhone: this.personalInfo.value.workPhone,
        workPhoneExt: this.personalInfo.value.workPhoneExt,
        country: this.personalInfo.value.country,
        // ssn: this.personalInfo.value,
        language: this.personalInfo.value.language,
        orgId: '1',
        createdby: '5'
      };
      console.log(req);
      this._subscriptions.add(this._data.insertUpdateMember(
        req
      ).subscribe(
        (response) => {
          this.messageService.add({severity: 'info', summary: 'Update', detail: 'Update Successful'});
        },
        (response) => {
          this.messageService.add({severity: 'error', summary: 'Update', detail: 'Update Not Possible'});
        }
      ));
    }
    this.getUsers();
    this.workDisable = false;
  }
  onSaveWork() {
    console.log(this.workInfo.value);
  }

  saveUpload() {

  }

  onDeleteUser(id) {
    this._subscriptions.add(this._data.DeleteUser(id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Delete', detail: 'Deletion successfull' });
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Record Not Deleted' });
      }
    ));
  }
  confirmDelete(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteUser(id);
      },
      reject: () => {
      }
    });
  }

  onClickSearch(term) {
    const searchTerm = term.toLowerCase();
    this._subscriptions.add(this._data.getUserBySearch(searchTerm).subscribe(
      (data: DisplayUser[]) => {
        this.arrUser = data['members'];
        this.pagerInfo = data['pagerInfo'];
        this.totalPages = this.pagerInfo['totalPages'];
        this.totalRecords = this.pagerInfo['totalItems'];
        this.itemsPerPage = this.pagerInfo['itemsPerPage'];
      }
    ));
  }

  getFormControlData(item) {
    this.personalInfo.patchValue({
      memberId: item.memberId,
      firstName: item.firstName,
      lastName: item.lastName,
      middleName: item.middleName,
      address: item.address,
      address2: item.address2,
      gender: item.gender,
      dob: this.datePipe.transform(item.dob, 'yyyy-MM-dd'),
      email: item.email,
      zipCode: item.zipCode,
      cell: item.cell,
      workPhone: item.workPhone,
      workPhoneExt: item.workPhoneExt,
      country: item.country,
      ssn: item.ssn,
      language: item.language,
      organizationId: item.organizationId,
      city: item.city,
      state: item.state,
      maritalStatus: item.maritalStatus,
      race: item.race,
      ethnicity: item.ethnicity,
      religion: item.religion,
      supervisor: item.email
    });
    this.workInfo.patchValue({
      orgName: item.orgName,
      orgId: item.orgId,
      locationName: item.locationName,
      designation: item.designation,
      departmentName: item.departmentName,
      roles: item.roles,
      doj: this.datePipe.transform(item.doj, 'yyyy-MM-dd'),
      supervisor: item.spervisor
    });
  }

  public onChange(fileList: FileList): void {
    const file = fileList[0];
    const fileReader: FileReader = new FileReader();
    const self = this;
    // fileReader.onloadend = function(x) {
    const alreadyExist = _.filter(this.fileList, e => {
      return e.name === file.name;
    });
    if (_.isEmpty(alreadyExist)) {
      this.fileList.push(file);
      _.each(this.fileList, function (val, i) {
        val.id = i + 1;
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'File Name Already Exist Rename and upload...'
      });
    }
  }

  removeFile(id) {
    this.fileList = _.filter(this.fileList, f => {
      return f.id !== id;
    });
  }

  viewFile(item) {
    const json = JSON.stringify(item.fileContent);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = item.name;
    link.click();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
