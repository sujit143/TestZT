import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { LeaveTypes } from './leavetypess';
import { LeavemanagementService } from '../../services/appservices/leavemanagement.service';
// import { Router } from '@angular/router';
import { Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
selector: 'app-leavetype',
templateUrl: './leavetype.component.html',
styleUrls: ['./leavetype.component.scss']
})
export class LeavetypeComponent implements OnInit {

id: number;
taskreactive: FormGroup;
dialogTitle: string;
leavetypedetails: LeaveTypes[];
submitted: boolean;
private _subscriptions = new Subscription();


constructor(public dialog: MatDialog,
private fb: FormBuilder,
private _data: LeavemanagementService,
private router: Router,
){}


displayedColumns: string[] = ['Name', 'Leave Type', 'Total Days Per year', 'Location Id', 'Gender',
'Department', 'Designation', 'Role', 'Actions'];
datasource = this.leavetypedetails;
@ViewChild('matdialog', { static: false }) matdialog: TemplateRef<any>;

ngOnInit() {
this.getLeavetypes();
this.taskreactive = this.fb.group({
id: new FormControl(null),
name: new FormControl(null, Validators.required),
leavetype: new FormControl(null, Validators.required),
totaldaysperyear: new FormControl(null, Validators.required),
locationid: new FormControl(null, Validators.required),
gender: new FormControl(null, Validators.required),
department: new FormControl(null, Validators.required),
designation: new FormControl(null, Validators.required),
role: new FormControl(null, Validators.required),
});
}

getLeavetypes() {
  this._subscriptions.add(this._data.getLeaveTypes().subscribe((data: LeaveTypes[]) => {
this.leavetypedetails = data;
console.log(this.leavetypedetails);
// console.log(this.datasource);
}));
}




onClick(item) {
console.log(item);
alert(item.id);
this.router.navigate(['/configuration'], { queryParams: { id: item.id }});
}

showDialogToAdd(){
console.log();
this.router.navigateByUrl('/configuration');
}

ngOnDestroy() {
  this._subscriptions.unsubscribe();
}
}







