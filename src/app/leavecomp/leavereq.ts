export class MemberLeaveTransactions {
  public constructor(

    public id: number,
    public memberId: number,
    public leaveTypeId: number,
    public leaveType:string,
    public startDate: string,
    public endDate: string,
    public numberofDays:number,
    public statusId: number,
    public leaveStatus:string,
    public requesterComments: string,
    public approverComments:string,
    public approverId:number,
  ) {}
}
export class MemberLeaveRequest {
  public constructor(

    public id: number,
    public memberId: number,
    public leaveTypeId: number,
    public leaveType:string,
    public startDate: string,
    public endDate: string,
    public numberofDays:string,
    public statusId: number,
    public leaveStatus:string,
    public requesterComments: string,
    public approverComments:string,
    public approverId:number,
  ) {}
}

export class MemberLeavesData
{
  public constructor(
    public id: number,
    public memberId: number,
    public leaveTypeId: number,
    public allotedLeaves: number,
    public claimedLeaves: number,
    public carryforwardedLeaves: number,
    public balanceLeaves: number,
    public currentyear: number,
    public isactive: boolean,
    public createDate: string,
    public createdBy: number,
    public modifiedDate: number,
    public modifiedby: number

  ) {}
}

export class Checkstatus {
  public constructor(
    public id:number,
    public name:string,

  ) {}
}

export class leavetypes {
  constructor(
    public leaveId:number,
    public lTypeName:string
  ) {}
}

// public class MemberLeavesData
//     {
//         public int Id { get; set; }
//         public int MemberId { get; set; }
//         public int LeaveTypeId { get; set; }
//         public int AllotedLeaves { get; set; }
//         public int ClaimedLeaves { get; set; }
//         public int CarryforwardedLeaves { get; set; }
//         public int BalanceLeaves { get; set; }
//         public int Currentyear { get; set; }
//         public bool isactive { get; set; }
//         public DateTime? CreateDate { get; set; }
//         public int CreatedBy { get; set; }
//         public DateTime? ModifiedDate { get; set; }
//         public int Modifiedby { get; set; }
//     }
