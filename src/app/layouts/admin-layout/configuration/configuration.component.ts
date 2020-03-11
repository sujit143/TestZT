import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LeavemanagementService } from './../../../services/appservices/leavemanagement.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from './../../../services/master.service';
import { MessageService } from 'primeng/api';
import { Router, Params } from '@angular/router';
import moment from "moment";
import * as _ from 'lodash';
import { PaymentType, Gender, MaxLeavesAllowed, TotalDays, CarrForword, Encashment, ExpiresIn, WeekEndsBetweenLeaves, HolyDaysBetweenLeaves, LeaveSubmitFor, Departments, Roles, Designations, Locations } from './config';
import { AppConstant } from '../../../../app/app.constant';
import { LeaveTypes } from '../../leavetype/leavetypess';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  dispDropDown: boolean = false;
  dispDropDownsecond: boolean = false;
  selectedPayment: any[];
  arr1: Departments[] = [];
  arr2: Roles[] = [];
  arr3: Designations[] = [];
  ListOfLocations: Locations[] = [];
  num: number;
  arr: any[] = [];
  id: any;
  leavetypedetails: any;
  private _subscriptions = new Subscription();
  selectedCity1: any;
  editForm: FormGroup;
  submitted = false;
  public queryparams: any;
  selectedleave: any;
  public name = 'New payment type';
  public isEditable = false;
  public constructor(
    private _data: LeavemanagementService,
    private fb: FormBuilder,
    private masterService: MasterService,
    private messageService: MessageService,
    private _router: Router,

  ) {
    this._subscriptions.add(
      this._subscriptions.add(this._router.routerState.root.queryParams.subscribe(
        (params: Params) => {
          this.queryparams = params['id'];
          console.log(this.queryparams);

        }
      )
      ));
  }

  payment: PaymentType[] = [
    new PaymentType(0, 'Paid'),
    new PaymentType(1, 'UnPaid'),
  ];
  gender: Gender[] = [
    new Gender(1, 'male'),
    new Gender(2, 'Female'),
    new Gender(3, 'Others')
  ];


  maxleavesallowed: MaxLeavesAllowed[] = [
    new MaxLeavesAllowed(0),
    new MaxLeavesAllowed(1),
    new MaxLeavesAllowed(2)
  ];


  totaldays: TotalDays[] = [
    new TotalDays(0),
    new TotalDays(1),
    new TotalDays(2),
    new TotalDays(3),
    new TotalDays(4),
    new TotalDays(5),
    new TotalDays(6),
    new TotalDays(7),
    new TotalDays(8),
    new TotalDays(9),
    new TotalDays(10),
    new TotalDays(11),
    new TotalDays(12),
    new TotalDays(13),
    new TotalDays(14),
    new TotalDays(15),
    new TotalDays(16),
    new TotalDays(17),
    new TotalDays(18),
    new TotalDays(19),
    new TotalDays(20)
  ];


  carryforword: CarrForword[] = [
    new CarrForword(10),
    new CarrForword(20),
    new CarrForword(30),
    new CarrForword(50),
    new CarrForword(25),
  ];


  encashment: Encashment[] = [
    new Encashment(40),
    new Encashment(70),
    new Encashment(60),
    new Encashment(45),
    new Encashment(55),
  ];

  expiresin: ExpiresIn[] = [
    new ExpiresIn(5),
    new ExpiresIn(0),
    new ExpiresIn(2),
    new ExpiresIn(3),
    new ExpiresIn(3),
  ];

  weekendsbetweenleaves: WeekEndsBetweenLeaves[] = [
    new WeekEndsBetweenLeaves(0),
    new WeekEndsBetweenLeaves(1),
    new WeekEndsBetweenLeaves(2),
    new WeekEndsBetweenLeaves(3),
    new WeekEndsBetweenLeaves(4),
    new WeekEndsBetweenLeaves(5),
    new WeekEndsBetweenLeaves(6),
    new WeekEndsBetweenLeaves(7),
    new WeekEndsBetweenLeaves(8),
    new WeekEndsBetweenLeaves(9),
    new WeekEndsBetweenLeaves(10),
    new WeekEndsBetweenLeaves(11),
    new WeekEndsBetweenLeaves(12),
    new WeekEndsBetweenLeaves(13),
    new WeekEndsBetweenLeaves(14),
    new WeekEndsBetweenLeaves(15),
    new WeekEndsBetweenLeaves(16),
    new WeekEndsBetweenLeaves(17),
    new WeekEndsBetweenLeaves(18),
    new WeekEndsBetweenLeaves(19),
    new WeekEndsBetweenLeaves(20)
  ];
  holydaysbetweenleaves: HolyDaysBetweenLeaves[] = [
    new HolyDaysBetweenLeaves(0),
    new HolyDaysBetweenLeaves(1),
    new HolyDaysBetweenLeaves(2),
    new HolyDaysBetweenLeaves(3),
    new HolyDaysBetweenLeaves(4),
    new HolyDaysBetweenLeaves(5),
    new HolyDaysBetweenLeaves(6),
    new HolyDaysBetweenLeaves(7),
    new HolyDaysBetweenLeaves(8),
    new HolyDaysBetweenLeaves(9),
    new HolyDaysBetweenLeaves(10),
    new HolyDaysBetweenLeaves(11),
    new HolyDaysBetweenLeaves(12),
    new HolyDaysBetweenLeaves(13),
    new HolyDaysBetweenLeaves(14),
    new HolyDaysBetweenLeaves(15),
    new HolyDaysBetweenLeaves(16),
    new HolyDaysBetweenLeaves(17),
    new HolyDaysBetweenLeaves(18),
    new HolyDaysBetweenLeaves(19),
    new HolyDaysBetweenLeaves(20)
  ];


  leavesubmitfor: LeaveSubmitFor[] = [
    new LeaveSubmitFor(0),
    new LeaveSubmitFor(1),
    new LeaveSubmitFor(2),
    new LeaveSubmitFor(3),
    new LeaveSubmitFor(4),
    new LeaveSubmitFor(5),
    new LeaveSubmitFor(6),
    new LeaveSubmitFor(7),
    new LeaveSubmitFor(8),
    new LeaveSubmitFor(9),
    new LeaveSubmitFor(10),
    new LeaveSubmitFor(11),
    new LeaveSubmitFor(12),
    new LeaveSubmitFor(13),
    new LeaveSubmitFor(14),
    new LeaveSubmitFor(15),
    new LeaveSubmitFor(16),
    new LeaveSubmitFor(17),
    new LeaveSubmitFor(18),
    new LeaveSubmitFor(19),
    new LeaveSubmitFor(20)
  ];


  ngOnInit() {
    this.getLeaveTypesForEdit();
    this.getAllDepartments();
    this.getAllRoles();
    this.getAllDesig();
    this.getAllLocations();



    this.editForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      paymentTypes: new FormControl(null, Validators.required),
      carryforwardpercentage: new FormControl(null, Validators.required),
      encashmentpercentage: new FormControl(null, Validators.required),
      accuralDate: new FormControl(null, Validators.required),
      resetDate: new FormControl(null, Validators.required),
      totalleavesperyear: new FormControl(null, Validators.required),
      maxcontinuousleave: new FormControl(null, Validators.required),
      expiresinmonths: new FormControl(null, Validators.required),
      includeweekendsafterdays: new FormControl(null, Validators.required),
      includewholidaysafterdays: new FormControl(null, Validators.required),
      exceedleave: new FormControl(null, Validators.required),
      exceedLeaveAsLOP: new FormControl(null, Validators.required),
      allowHalfDay: new FormControl(null, Validators.required),
      requestLeaveBeforeDays: new FormControl(null, Validators.required),
      locationids: new FormControl(null, Validators.required),
      genderids: new FormControl(null, Validators.required),
      departmentids: new FormControl(null, Validators.required),
      designationids: new FormControl(null, Validators.required),
      roleids: new FormControl(null, Validators.required),
      EnableFileUpload: new FormControl(null, Validators.required),
      locationsNames: new FormControl(null, Validators.required),
      departments: new FormControl(null, Validators.required),
      designations: new FormControl(null, Validators.required),
      roles: new FormControl(null, Validators.required)

    }
    );


  }

  getLeaveTypesForEdit() {
    this.messageService.add({
      severity: 'success',
      detail: 'Processing...'
    });

    this._subscriptions.add(this._data.getLeaveTypes().subscribe((data: LeaveTypes) => {
      this.leavetypedetails = data;
      console.log(this.leavetypedetails);
      if (this.queryparams) {
        this.selectedleave = _.filter(this.leavetypedetails, (l) => {
          return l.id == this.queryparams;

        });
        var AccuralDate = new Date(this.selectedleave[0].accuralDate);
        var ResetDate = new Date(this.selectedleave[0].resetDate);
        this.selectedPayment = this.selectedleave[0].paymentTypes;
        console.log(this.selectedPayment);
        this.arr.push(this.selectedleave[0].departmentids);
        const dept1 = this.selectedleave[0].departmentids.split(",").map(Number);
        const desig1 = this.selectedleave[0].designationids.split(",").map(Number);
        const loc1 = this.selectedleave[0].locationids.split(",").map(Number);
        const roles1 = this.selectedleave[0].roleids.split(",").map(Number);
        console.log(this.arr);
        console.log(this.selectedleave);
        this.editForm.patchValue(
          {
            name: this.selectedleave[0].name,
            paymentTypes: this.selectedleave[0].paymentTypes,
            accuralDate: AccuralDate,
            resetDate: ResetDate,
            totalleavesperyear: this.selectedleave[0].totalleavesperyear,
            maxcontinuousleave: this.selectedleave[0].maxcontinuousleave,
            carryforwardpercentage: this.selectedleave[0].carryforwardpercentage,
            expiresinmonths: this.selectedleave[0].expiresinmonths,
            encashmentpercentage: this.selectedleave[0].encashmentpercentage,
            includeweekendsafterdays: this.selectedleave[0].includeweekendsafterdays,
            includewholidaysafterdays: this.selectedleave[0].includewholidaysafterdays,
            requestLeaveBeforeDays: this.selectedleave[0].requestLeaveBeforeDays,
            allowHalfDay: this.selectedleave[0].allowHalfDay,
            genderids: this.selectedleave[0].genderids,
            departmentids: dept1,
            designationids: desig1,
            locationids: loc1,
            roleids: roles1
          });
      }
    }));
  }


  isDisabled = true;
  flip() {
    this.isDisabled = !this.isDisabled;
  }
  public onEditClick() {
    this.isEditable = true;
  }


  getAllDepartments() {
    this._subscriptions.add(this._data.getdepartment().subscribe(
      (data: Departments[]) => {
        this.arr1 = data;
        console.log('department list:', this.arr1);
      }
    ));
  }

  getAllRoles() {
    this._subscriptions.add(this._data.getroles().subscribe(
      (data: Roles[]) => {
        this.arr2 = data;

      }
    ));
  }

  getAllDesig() {
    this._subscriptions.add(this._data.getdesig().subscribe(
      (data: Designations[]) => {

        this.arr3 = data;
      }
    ));
  }

  getAllLocations() {
    this._subscriptions.add(this._data.getlocations().subscribe(
      (data: Locations[]) => {
        this.ListOfLocations = data;

      }
    ));
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }


  onAddConfigure(item) {
    const test = this.masterService.getFormErrorMessage(this.editForm, this.editForm);
    if (test !== undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: test
      });
    }
    if (this.queryparams === undefined) {
      console.log(this.queryparams);
      alert('Add');
      this.editForm.value.accuralDate = moment(this.editForm.value.accuralDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
      this.editForm.value.resetDate = moment(this.editForm.value.resetDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
      var dept = this.editForm.value.departmentids.join(",");
      var desig = this.editForm.value.designationids.join(",");
      var roles = this.editForm.value.roleids.join(",");
      var loc = this.editForm.value.locationids.join(",");
      var req = {
        id: this.editForm.value.null,
        Organizationid: 1,
        Locationid: 1,
        Name: this.editForm.value.name,
        paymentTypes: this.editForm.value.paymentTypes,
        Carryforwardpercentage: this.editForm.value.carryforwardpercentage,
        Encashmentpercentage: this.editForm.value.encashmentpercentage,
        AccuralDate: this.editForm.value.accuralDate,
        ResetDate: this.editForm.value.resetDate,
        Totalleavesperyear: this.editForm.value.totalleavesperyear,
        Maxcontinuousleave: this.editForm.value.maxcontinuousleave,
        Expiresinmonths: this.editForm.value.expiresinmonths,
        Includeweekendsafterdays: this.editForm.value.includeweekendsafterdays,
        Includewholidaysafterdays: this.editForm.value.includewholidaysafterdays,
        Exceedleave: 1,
        ExceedLeaveAsLOP: 0,
        AllowHalfDay: 1,
        RequestLeaveBeforeDays: this.editForm.value.requestLeaveBeforeDays,
        EnableFileUpload: 1,
        Createdby: 1,
        genderids: this.editForm.value.genderids,
        Departmentids: dept,
        Designationids: desig,
        Locationids: loc,
        Roleids: roles,
      }
      this._data.addEditLeavesTypes(
        req
      ).subscribe(
        (x) => {
          const successMessage = 'Configuration Added Successfuly';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: successMessage
          });
          setTimeout(() => {

          }, 1000);
        },
        error => {
          this.messageService.add({ severity: 'error', detail: 'server not responding' });
        }
      );

      this._router.navigate(['/LeaveTypes']);
    }
    else {
      console.log(this.queryparams);
      alert('Edit');
      item.value.accuralDate = moment(item.value.accuralDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
      item.value.resetDate = moment(item.value.resetDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
      var dept = item.value.departmentids.join(",");
      var desig = item.value.designationids.join(",");
      var roles = item.value.roleids.join(",");
      var loc = item.value.locationids.join(",");
      var req1 = {
        id: this.queryparams,
        name: item.value.name,
        paymentTypes: item.value.paymentTypes,
        accuralDate: item.value.accuralDate,
        resetDate: item.value.resetDate,
        totalleavesperyear: item.value.totalleavesperyear,
        maxcontinuousleave: item.value.maxcontinuousleave,
        carryforwardpercentage: item.value.carryforwardpercentage,
        expiresinmonths: item.value.expiresinmonths,
        encashmentpercentage: item.value.encashmentpercentage,
        genderids: item.value.genderids,
        locationids: loc,
        designationids: desig,
        departmentids: dept,
        roleids: roles

      }
      this._data.addEditLeavesTypes(req1).subscribe(
        (data: any) => {
          const successMessage = ' Updated Successfuly';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: successMessage
          });
          setTimeout(() => {

          }, 1000);
        },
        error => {
          this.messageService.add({ severity: 'error', detail: 'server not responding' });
        }
      );
      this._router.navigate(['/LeaveTypes']);
    }

  }
  showOnlyLinkedRisks() {
    this.dispDropDown = true;
  }
  Disable() {
    this.dispDropDown = false;
  }
  Disablesecond() {
    this.dispDropDownsecond = false;
  }
  showOnlyLinkedRiskssecond() {
    this.dispDropDownsecond = true;
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
