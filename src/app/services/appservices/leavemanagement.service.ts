import { Observable } from 'rxjs';
import { AppConstant } from './../../app.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CommonHttpService } from '../../shared/common-http.service';

@Injectable({
  providedIn: 'root'
})
export class LeavemanagementService {
appendpoint: string;
getleavedata: string;
api_url_leave: string;
SERVER_URL_GET_LEAVE;
SERVER_URL_INSERT_UPDATE_LEAVES;
SERVER_URL_DEL_LEAVE;
url:string="http://dcce517e.ngrok.io/api/MemberLeave/GetMemberLeaves?MemberId=2";
url2:string="http://dcce517e.ngrok.io/api//MemberLeave/InsUpdateMemberLeaves";
url3:string="http://dcce517e.ngrok.io/api/MemberLeave/DeleteMemberLeaves";
urlleavestatus:string="http://dcce517e.ngrok.io/api/MemberLeavesData/GetMemberLeaveData?MemberId=4";
leavetypes:string="http://dcce517e.ngrok.io/api/LeaveTypes/GetLeaveTypeNames";
//api for leave applyd by
urlleaveRequest:string ="https://dcce517e.ngrok.io/api/MemberLeave/GetMemberLeaveRequest?ApproverId=3";
urlforapprovereject="http://dcce517e.ngrok.io/api/MemberLeave/UpdateMemberLeaveRequest";

  // API for leave types
  SERVER_URL_GET_LEAVETYPES;
  SERVER_URL_INSERT_UPDATE_LEAVETYPES;
  SERVER_URL_DEL_LEAVETYPES;

leavetypesurl1: string = 'http://dcce517e.ngrok.io/api/LeaveTypes/GetLeaveTypes';
leavetypesurl2: string = 'http://dcce517e.ngrok.io/api/LeaveTypes/InsUpdateLeaveTypes';
leavetypesurl3: string = 'http://dcce517e.ngrok.io/api/LeaveTypes/DeleteLeaveTypes';

// multiselection
depturl : string ='https://dcce517e.ngrok.io/api/Settings/GetDepartment';
rolesurl: string='https://dcce517e.ngrok.io/api/Settings/GetRoles';
desigurl:string ='https://dcce517e.ngrok.io/api/Settings/GetDesignations';
locationurl: string = 'https://dcce517e.ngrok.io/api/Settings/Getlocations';
insupdateName:string=' http://d35fc1ff.ngrok.io/api/LeaveTypes/InsertUpdateLeaveTypeName';

// Urls For Dropdown:
// depturl : string ='https://dcce517e.ngrok.io/api/LeaveTypes/GetDepartmentNames';
// rolesurl : string ='https://dcce517e.ngrok.io/api/LeaveTypes/GetDesignationNames';
// desigurl : string ='https://dcce517e.ngrok.io/api/LeaveTypes/GetLocationsNames';
// locationurl : string ='https://dcce517e.ngrok.io/api/LeaveTypes/GetRolesNamesGetRolesNames';




  constructor(private http: HttpClient,
    private CommonHttpService: CommonHttpService) {
    this.appendpoint = AppConstant.API_ENDPOINT;
    this.api_url_leave = this.appendpoint;
    this.SERVER_URL_GET_LEAVE = this.api_url_leave + AppConstant.API_CONFIG.API_URL.LEAVEMANAGEMENT.GETLEAVE;
    this.SERVER_URL_INSERT_UPDATE_LEAVES = this.api_url_leave + AppConstant.API_CONFIG.API_URL.LEAVEMANAGEMENT.INSERTUPDATELEAVE;
    this.SERVER_URL_DEL_LEAVE = this.api_url_leave + AppConstant.API_CONFIG.API_URL.LEAVEMANAGEMENT.DELETELEAVE;



    // api for leave types
    // this.SERVER_URL_GET_LEAVETYPES = this.api_url_leave + AppConstant.API_CONFIG.API_URL.LEAVETYPES.GETLEAVETYPES;
    // this.SERVER_URL_INSERT_UPDATE_LEAVETYPES = this.api_url_leave + AppConstant.API_CONFIG.API_URL.LEAVETYPES.INSERTUPDATELEAVETYPES;
    // this.SERVER_URL_DEL_LEAVETYPES = this.api_url_leave + AppConstant.API_CONFIG.API_URL.LEAVETYPES.DELETELEAVETYPES;

  }

  public getLeave(): Observable<any> {
    return this.http.get(this.url);
  }
  public addEditLeaves(f) {
    console.log(f);
    // console.log(JSON.stringify(f));
    let body = f;
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.CommonHttpService.globalPostService(this.url2,f);
    return this.http.post(this.url2, body, { headers: head });
  }

  public aprroveorreject(f) {
    console.log(f);
    let body = JSON.stringify(f);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.urlforapprovereject, body, { headers: head });
  }

  public getdropdownleavetypes() {
    return this.http.get(this.leavetypes);
  }

  public deleteleave(LeaveId) {
    let body = JSON.stringify(LeaveId);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('getting ID?:' + LeaveId);
    return this.http.post(this.url3, body, { headers: head });
  }
  // below get is only for show the leave on balanca
  public getLeaveBalance(): Observable<any> {
    return this.http.get(this.urlleavestatus);
  }



  // METHODS FOR LEAVETYPES
  public getLeaveTypes(): Observable<any> {
    console.log(this.leavetypesurl1);
    return this.http.get(this.leavetypesurl1);

  }


  // getmethod leave request
  public getLeaveRequest(): Observable<any> {
    return this.http.get(this.urlleaveRequest);
  }


  // method for leave types
  public addEditLeavesTypes(f) {
    console.log(f);
    console.log(JSON.stringify(f));
    let body = JSON.stringify(f);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.leavetypesurl2, f, {
      headers: head
    });
    return this.http.post(this.leavetypesurl2, f, {
      headers: head
    });

  }
  public deleteleavTypes(LeaveId) {
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('getting ID?:' + LeaveId);
    return this.http.post(this.leavetypesurl3 + LeaveId, { headers: head });
  }

  getdepartment() {
    return this.http.get(this.depturl);
  }



  getroles() {
    return this.http.get(this.rolesurl);
  }

  getdesig() {
    return this.http.get(this.desigurl);
  }
  public getlocations() {
    return this.http.get(this.locationurl);
  }


  public addEditLeaveName1(f) {
    console.log(f);
    console.log(JSON.stringify(f));
    let body = JSON.stringify(f);
    let head = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.insupdateName, f, {
      headers: head
    });
    return this.http.post(this.insupdateName, f, {
      headers: head
    });

  }
}
