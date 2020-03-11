// export class LeaveTypes {
//   public constructor(
//     public id: number,
//     public locationid: number,
//     public name: ,
//     public leavetype: ,
//     public gender: ,
//     public department: ,
//     public designation: ,
//     public role: ,
//     public totalleavesperyear: number,
//     public enableFileUpload: boolean,
//     public genderids: ,
//     public departmentids: ,
//     public designationids: ,
//     public locationids: ,
//     public roleids:

//   ) { }
// }


export class LeaveTypes
{
  public constructor(
    // public id : number,
    // public  organizationid :number,
    // public organizationName:,
    // public locationid :number,

    // public name : ,

    // public  carryforwardpercentage :number,
    // public encashmentpercentage:number,
    // public accuralDate :  Date,
    // public resetDate :Date,
    // public totalleavesperyear :number,
    // public  maxcontinuousleave :number,
    // public isactive :boolean,
    // public createdate :Date,
    // public  createdby :number,
    // public modifieddate : Date,
    // public modifiedby : number,
    // public expiresinmonths :number,
    // public includeweekendsafterdays :number,
    // public  includewholidaysafterdays : number,
    // public exceedleave :boolean,
    // public exceedLeaveAsLOP :boolean,
    // public  allowHalfDay :boolean,
    // public  requestLeaveBeforeDays : number,
    // // public ApproverId : number,
    // public leavetype: ,
    // public enableFileUpload: boolean,
    // public genderids: ,
    // public departmentids: ,
    // public designationids: ,
    // public locationids: ,
    // public roleids:

      public  id: number,
      public  organizationid: number,
      public  organizationName: string,
      public  locationid: number,
      public  locationName: string,
      public  paymentTypes :number,
      public  name: string,
      public  carryforwardpercentage: number,
      public  encashmentpercentage: number,
      public  accuralDate: string,
      public  resetDate: string,
      public  totalleavesperyear: number,
      public  maxcontinuousleave: number,
      public  isactive: boolean,
      public  createdate: string,
      public  createdby: number,
      public  modifieddate: string,
      public  modifiedby: number,
      public  modifiedBy: string,
      public  expiresinmonths: number,
      public  includeweekendsafterdays: number,
      public  includewholidaysafterdays: number,
      public  exceedleave: boolean,
      public  exceedLeaveAsLOP: boolean,
      public  allowHalfDay: boolean,
      public  requestLeaveBeforeDays: number,
      public  enableFileUpload: boolean,
      public  genderids: number,
      public  departmentids: number,
      public  designationids: number,
      public  locationids: number,
      public  roleids: number,
      public  locationsNames: string,
      public  departments: string,
      public  designations: string,
      public  roles: string,


  ) {}
}


export class Departments {
  public constructor(
    public id: number,
    public name: string,

  ) { }
}
export class Roles {
  public constructor(
    public id: number,
    public name: string,

  ) { }
}
export class Designations {
  public constructor(
    public id: number,
    public name: string,

  ) { }
}
export class Locations {
  public constructor(
    public id: number,
    public city: string,

  ) { }
}