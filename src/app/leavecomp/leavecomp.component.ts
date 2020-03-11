import { filter } from "rxjs/operators";
import { DataSource } from "@angular/cdk/collections";
import { LeavemanagementService } from "./../services/appservices/leavemanagement.service";
import { MasterService } from "./../services/master.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationService, MessageService, Message } from "primeng/api";
import * as _ from "lodash";
import { DatePipe } from "@angular/common";
// import { AppConstant } from "../../app/app.constant";
import { MatDialog, MatTabGroup, MatPaginator } from "@angular/material";
import {
  MemberLeaveTransactions,
  MemberLeavesData,
  MemberLeaveRequest,
  Checkstatus,
  leavetypes
} from "./leavereq";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import moment from "moment";
import { AppConstant } from '../app.constant';
@Component({
  selector: "app-leavecomp",
  templateUrl: "./leavecomp.component.html",
  styleUrls: ["./leavecomp.component.scss"]
})
export class LeavecompComponent implements OnInit {
  searchText;
  id: number;
  display: boolean;
  submitted = false;
  mydetails: MemberLeaveTransactions[];
  classnameforbalance: MemberLeavesData[];
  leaverequstsclass: MemberLeaveRequest[];
  arr: leavetypes[] = [];
  taskreactive: FormGroup;
  taskreactive2: FormGroup;
  taskreactive3: FormGroup;
  approveCancelReq: FormGroup;
  dateVal: Date;
  dateVal1: Date;
  private datePipe: DatePipe;
  role: string;
  userinfo: any;
  cancelReason = false;
  data_clone: MemberLeaveRequest[] = [];
  public days = 0;
  private _subscriptions = new Subscription();
  errorLog = false;
  @ViewChild("selectedTab", { static: false }) selectedTab: MatTabGroup;
  @ViewChild("secondDialog", { static: true }) secondDialog: TemplateRef<any>;
  @ViewChild("cancel", { static: true }) cancel: TemplateRef<any>;

  @ViewChild("paginator", { static: true }) paginator: MatPaginator;
  @ViewChild("paginator1", { static: true }) paginator1: MatPaginator;
  @ViewChild("matdialog", { static: false }) matdialog: TemplateRef<any>;
  today = new Date().toJSON();
  minDate = new Date(this.today).toJSON();
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private _data: LeavemanagementService,
    private confirmationService: ConfirmationService
  ) {}

  checkstatus: Checkstatus[] = [
    //  new Checkstatus(1,'Pending'),
    new Checkstatus(2, "Approved"),
    new Checkstatus(3, "Cancel")
  ];
  displayedColumns: string[] = [
    "leaveType",
    "startDate",
    "endDate",
    "numberofDays",
    "requesterComments",
    "leaveStatus",
    "action"
  ];
  dataSource;

  displayedColumnsForRequests: string[] = [
    "id",
    "leaveType",
    "startDate",
    "endDate",
    "numberofDays",
    "approverComments",
    "leaveStatus",
    "action"
  ];
  requestDataSource;
  ngOnInit() {
    this.getLeave();
    this.getleavebalancetodispayoncard_group();
    this.getshowrequstleave_group();
    this.getleaverequest();
    this.getaprovereqfromcontrol();
    this.leavetypedropdown();
    this.taskreactive = this.fb.group({
      id: new FormControl(),
      leaveTypeId: new FormControl(),
      leaveType: new FormControl(null, Validators.required),
      requesterComments: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      numberofDays: new FormControl(null),
      statusId: new FormControl(),
      leaveStatus: new FormControl(null),
      approverId: new FormControl(null)
    });
  }
  OnstatusChange(status, leaveId) {
    const data = {
      id: leaveId,
      statusId: status
    };

    if (status === 3) {
      this.cancelReason = true;
      this.confirmationService.confirm({
        message: "Are you sure that you want to denied?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this._data.aprroveorreject(data).subscribe(
            data => {
              console.log(data);
              this.getleaverequest();
            },
            e => console.log(e)
          );
        },
        reject: () => {}
      });
    } else if (status === 2) {
      this._data.aprroveorreject(data).subscribe(
        data => {
          console.log(data);
          this.getleaverequest();
        },
        e => console.log(e)
      );
    }
  }
  showbalance_leave() {
    this.taskreactive2 = this.fb.group({
      id: new FormControl(),
      leaveTypeId: new FormControl(),
      allotedLeaves: new FormControl(null),
      claimedLeaves: new FormControl(null),
      carryforwardedLeaves: new FormControl(null),
      balanceLeaves: new FormControl(null),
      approverId: new FormControl(null)
    });
  }

  getaprovereqfromcontrol() {
    this.approveCancelReq = this.fb.group({
      requesterComments: new FormControl(null, Validators.required),
      id: new FormControl(),
      statusId: new FormControl()
    });
  }

  getshowrequstleave_group() {
    this.taskreactive3 = this.fb.group({
      leaveTypeId: new FormControl(),
      leaveType: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      numberofDays: new FormControl(null, [Validators.required]),
      statusId: new FormControl(null),
      leaveStatus: new FormControl(null),
      requesterComments: new FormControl(null, [Validators.required]),
      approverComments: new FormControl(null),
      approverId: new FormControl(null)
    });
  }

  getleaverequest() {
    this._subscriptions.add(
      this._data.getLeaveRequest().subscribe(data => {
        this.leaverequstsclass = data;
        this.data_clone = _.cloneDeep(this.leaverequstsclass);
        this.requestDataSource = new MatTableDataSource<MemberLeaveRequest>(
          this.leaverequstsclass
        );
        console.log(this.leaverequstsclass);
      })
    );
  }

  getleavebalancetodispayoncard_group() {
    this._subscriptions.add(
      this._data.getLeaveBalance().subscribe(data => {
        this.classnameforbalance = data;
        console.log(this.classnameforbalance);
      })
    );
  }
  getLeave() {
    this._subscriptions.add(
      this._data.getLeave().subscribe(data => {
        this.mydetails = data;
        this.dataSource = new MatTableDataSource<MemberLeaveTransactions>(
          this.mydetails
        );
        console.log(this.mydetails);
      })
    );
  }
  addDialog() {
    this.dialog.open(this.matdialog, {});
    this.taskreactive.reset();
    this.id = undefined;
    this.display = true;
  }

  openedit(item) {
    this.dialog.open(this.matdialog, {});
    this.display = true;
    var startDate = new Date(item.startDate);
    var endDate = new Date(item.endDate);

    this.id = item.id;
    this.taskreactive.patchValue({
      leaveType: item.leaveTypeId,
      startDate: startDate,
      endDate: endDate,
      leaveStatus: item.leaveStatus,
      numberofDays: item.numberofDays,
      requesterComments: item.requesterComments,
      approverComments: item.approverComments,
      approverId: item.approverId
    });
  }

  onFormSubmit(addForm) {
    const test = this.masterService.getFormErrorMessage(
      addForm,
      this.taskreactive
    );
    console.log(test);
    if (test !== undefined) {
      this.messageService.add({
        severity: "error",
        summary: "Error Message",
        detail: test
      });
    } else {
      this.submitted = true;
      if (this.id === undefined) {
        // const req = {

        //   memberId: 2,
        //   leaveTypeId: 1,
        //   leaveType: addForm.value.leaveType,
        //   startDate: addForm.value.startDate,
        //   endDate: addForm.value.endDate,
        //   numberofDays: addForm.value.numberofDays,
        //   statusId: 1,
        //   leaveStatus: 'Pending',
        //   requesterComments: addForm.value.requesterComments,
        //   approverComments: 'Waiting',
        //   approverId: 0,

        // };
        var StartDay = moment(addForm.value.startDate);
        var EndDay = moment(addForm.value.endDate);
        this.days = EndDay.diff(StartDay, "days");
        this.days = this.days + 1;
        console.log("count" + this.days);
        addForm.value.startDate = moment(addForm.value.startDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
        addForm.value.endDate = moment(addForm.value.endDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
        // const startDate = new Date(addForm.value.startDate)
        //   .toISOString()
        //   .slice(0, 10);
        // addForm.value.startDate = startDate;
        // const endDate = new Date(addForm.value.endDate)
        // .toISOString()
        // .slice(0, 10);
        // addForm.value.accuralDate = endDate;
        this._subscriptions.add(
          this._data
            .addEditLeaves(
              new MemberLeaveTransactions(
                this.id,
                2,
                addForm.value.leaveType,
                addForm.value.leaveId,
                addForm.value.startDate,
                addForm.value.endDate,
                this.days,
                1,
                "Pending",
                addForm.value.requesterComments,
                "",
                0
              )
            )
            .subscribe(x => {
              this.getLeave();
              this.display = false;
              const successMessage = "Applyed Successfuly";
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: successMessage
              });
            })
        );
        this.dialog.closeAll();
      } else {
        this.submitted = true;
        var StartDay = moment(addForm.value.startDate);
        var EndDay = moment(addForm.value.endDate);
        this.days = EndDay.diff(StartDay, "days");
        this.days = this.days + 1;
        console.log("count" + this.days);
        addForm.value.startDate = moment(addForm.value.startDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
        addForm.value.endDate = moment(addForm.value.endDate).format(AppConstant.API_CONFIG.DATE.apiFormat);
        this._subscriptions.add(
          this._data
            .addEditLeaves(
              new MemberLeaveTransactions(
                this.id,
                2,
                addForm.value.leaveType,
                addForm.value.leaveId,
                addForm.value.startDate,
                addForm.value.endDate,
                this.days,
                1,
                addForm.value.leaveStatus,
                addForm.value.requesterComments,
                "",
                addForm.value.approverId
              )
            )
            .subscribe(() => {
              this.ngOnInit();
              this.messageService.add({
                severity: "success",
                summary: "Update",
                detail: "Update Successfull"
              });
            })
        );
        this.dialog.closeAll();
      }
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter1(filterValue: string) {
    this.requestDataSource.filter = filterValue.trim().toLowerCase();
  }

  selectedFilter(item) {
    const test = _.filter(this.data_clone, c => {
      return c.leaveTypeId == item;
    });
    this.data_clone = _.cloneDeep(this.leaverequstsclass);
    this.requestDataSource = new MatTableDataSource<MemberLeaveRequest>(test);
  }

  confirmDelete(id) {
    console.log(id);
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.onItemDeleted(id);
      },
      reject: () => {}
    });
  }
  onItemDeleted(id) {
    this._subscriptions.add(
      this._data.deleteleave(id).subscribe((data: any) => {
        this.messageService.add({
          severity: "success",
          summary: "Success Message",
          detail: "Deleted Sucessfully"
        });
        this.getLeave();
      })
    );
  }

  public navigateTab(status) {
    this.requestDataSource.filter = status.trim().toLowerCase();
    this.selectedTab.selectedIndex = 1;
  }
  public navigateTab1(approvedstatus) {
    this.requestDataSource.filter = approvedstatus.trim().toLowerCase();
    this.selectedTab.selectedIndex = 1;
  }
  public navigateTab3(cancelstatus) {
    this.requestDataSource.filter = cancelstatus.trim().toLowerCase();
    this.selectedTab.selectedIndex = 1;
  }

  filterdata(status) {
    this.dataSource.filter = status.trim().toLowerCase();
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  openDialogWithoutRef(id) {
    this.taskreactive.patchValue({
      leaveTypeId: id.leaveTypeId
    });

    this.dialog.open(this.secondDialog);
    console.log(this.taskreactive.value.leaveType);
  }
  openDialogforApproveCancelReq(status, leaveId) {
    this.approveCancelReq.reset();
    this.approveCancelReq.patchValue({
      id: leaveId,
      statusId: status
    });

    if (status === 3) {
      this.cancelReason = true;
      this.dialog.open(this.cancel);
    } else if (status === 2) {
      this.dialog.open(this.cancel);
    }
  }

  leavetypedropdown() {
    this._subscriptions.add(
      this._data.getdropdownleavetypes().subscribe((data: leavetypes[]) => {
        this.arr = data;
        console.log(this.arr);
      })
    );
  }

  submitApproveCancel() {
    const reqdata = {
      id: this.approveCancelReq.value.id,
      statusId: this.approveCancelReq.value.statusId,
      approverComments: this.approveCancelReq.value.requesterComments
    };
    if (this.approveCancelReq.value.statusId != 2) {
      if (this.approveCancelReq.value.requesterComments == null) {
        this.errorLog = true;
      } else {
        this._subscriptions.add(
          this._data.aprroveorreject(reqdata).subscribe(
            data => {
              console.log(data);
              this.getleaverequest();
            },
            e => console.log(e)
          )
        );
        this.dialog.closeAll();
      }
    } else {
      console.log(reqdata);
      this._subscriptions.add(
        this._data.aprroveorreject(reqdata).subscribe(
          data => {
            console.log(data);
            this.getleaverequest();
          },
          e => console.log(e)
        )
      );
      this.dialog.closeAll();
    }
  }

  Approvereq(data) {
    this._subscriptions.add(
      this._data.aprroveorreject(data).subscribe(
        data => {
          console.log(data);
          this.getleaverequest();
        },
        e => console.log(e)
      )
    );
    this.dialog.closeAll();
  }

  onStatusChange1(item) {
    if (item.leaveStatus === "Cancel") {
      this.cancelReason = true;
      this.confirmationService.confirm({
        message: "Are you sure that you want to denied?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {}
        // reject: () => {
        //   var data = _.filter(this.data_clone, (d) => {
        //     return (d.leave_Id == item.leave_Id);
        //   });
        //   item.status = data[0].status;

        // }
      });
    } else {
    }
  }

  closeDialog() {
    this.leaverequstsclass = this.data_clone;
    this.data_clone = _.cloneDeep(this.leaverequstsclass);
    this.requestDataSource = new MatTableDataSource<MemberLeaveRequest>(
      this.leaverequstsclass
    );
    this.dialog.closeAll();
  }

  refresh() {
    this.getleaverequest();
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  checkLeaveType(leaveType) {
    if(leaveType.target.value == '2') {
      this.today = new Date().toJSON();
      this.minDate = '';
    }
    else {
      this.today = '';
      this.minDate = new Date().toJSON();
    }
  }

}
