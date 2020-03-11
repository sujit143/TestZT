import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { MatDialog, MatTableDataSource, } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { AppConstant } from './../../../app.constant';
import { LocalStorageService } from './../../../shared/local-storage.service';
export interface PeriodicElement {
  no: string;
  Name: string;
  LeaveType: string;
  location: number;
  TotalLeaves: number;
  EarnedLeves: number;
  LeavesUsed: number;
  SickLeaves: number;
  CasualLeaves: number;
}


export interface Locations {
  id: number;
  value: string;
  viewValue: string;
}




let ELEMENT_DATA: PeriodicElement[] = [
  { no: '1', Name: 'kiran', LeaveType: 'sick', location: 1, TotalLeaves: 24, EarnedLeves: 14, LeavesUsed: 10, SickLeaves: 5, CasualLeaves: 5 },
  { no: '1', Name: 'madan', LeaveType: 'emg', location: 2, TotalLeaves: 24, EarnedLeves: 16, LeavesUsed: 8, SickLeaves: 5, CasualLeaves: 3 },
  { no: '2', Name: 'hari', LeaveType: 'sick', location: 2, TotalLeaves: 24, EarnedLeves: 10, LeavesUsed: 14, SickLeaves: 9, CasualLeaves: 5 },
  { no: '3', Name: 'mahesh', LeaveType: 'emg', location: 2, TotalLeaves: 24, EarnedLeves: 14, LeavesUsed: 10, SickLeaves: 5, CasualLeaves: 5 },
  { no: '2', Name: 'samarth', LeaveType: 'sick', location: 1, TotalLeaves: 24, EarnedLeves: 16, LeavesUsed: 8, SickLeaves: 5, CasualLeaves: 3 },
  { no: '4', Name: 'anannya', LeaveType: 'emg', location: 2, TotalLeaves: 24, EarnedLeves: 20, LeavesUsed: 4, SickLeaves: 3, CasualLeaves: 1 },
  { no: '3', Name: 'kavya', LeaveType: 'sick', location: 1, TotalLeaves: 24, EarnedLeves: 8, LeavesUsed: 16, SickLeaves: 10, CasualLeaves: 6 },
  { no: '5', Name: 'karan', LeaveType: 'emg', location: 2, TotalLeaves: 24, EarnedLeves: 16, LeavesUsed: 8, SickLeaves: 5, CasualLeaves: 3 },
  { no: '6', Name: 'vinay', LeaveType: 'sick', location: 2, TotalLeaves: 24, EarnedLeves: 18, LeavesUsed: 6, SickLeaves: 4, CasualLeaves: 2 },
  { no: '7', Name: 'shiva', LeaveType: 'emg', location: 2, TotalLeaves: 24, EarnedLeves: 14, LeavesUsed: 10, SickLeaves: 5, CasualLeaves: 5 },
  { no: '4', Name: 'rishi', LeaveType: 'sick', location: 1, TotalLeaves: 24, EarnedLeves: 12, LeavesUsed: 12, SickLeaves: 5, CasualLeaves: 7 },
  { no: '8', Name: 'krishna', LeaveType: 'emg', location: 2, TotalLeaves: 24, EarnedLeves: 16, LeavesUsed: 8, SickLeaves: 5, CasualLeaves: 3 },
];

@Component({
  selector: 'app-employesearch',
  templateUrl: './employesearch.component.html',
  styleUrls: ['./employesearch.component.scss']
})
export class EmployesearchComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  someProperty: string;
  Location: any;
  data = Object.assign(ELEMENT_DATA);
  ELEMENT_DATA1: any[];
  Locations: Locations[] = [];
  selectedLocation: number;
  selected_Array: any;
  userinfo: any;
  role: string;
  selectDatasource = ELEMENT_DATA;
  totalleaves: any;
  earnedleaves: any;
  leavesused: any;
  sickleaves: any;
  casualleaves: any;
  constructor(public dialog: MatDialog,
    private localStorageService: LocalStorageService, ) {

  }

  @ViewChild('matdialog', { static: false }) matdialog: TemplateRef<any>;

  showDialogToAdd(item) {
    console.log(item);
    const dialogRef = this.dialog.open(this.matdialog, {
      disableClose: true,
      height: '350px',
      width: '500px',
    });

    this.totalleaves = item.TotalLeaves;
    this.earnedleaves = item.EarnedLeves;
    this.leavesused = item.LeavesUsed;
    this.sickleaves = item.SickLeaves;
    this.casualleaves = item.CasualLeaves;

  }



  ngOnInit() {

    this.changeTableContent();

  }

  displayedColumns: string[] = ['Name', 'Actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.selected_Array.filter = filterValue.trim().toLowerCase();
  }

  location: Locations[] = [
    { id: 1, value: 'Bangalore-0', viewValue: 'Bangalore' },
    { id: 2, value: 'Dharwad-1', viewValue: 'Dharwad' }
  ];


  public changeTableContent() {
    // alert(this.selectedLocation);
    ELEMENT_DATA.forEach(element => {
      if (element.location === this.selectedLocation) {

        console.log(element.location);

        this.selected_Array = _.filter(ELEMENT_DATA, (s) => {
          return s.location == element.location;
        });
        console.log(this.selected_Array);
      }
    });
  }

  // public changeTableContent() {

  //   this.selected_Array = _.filter(this.selectDatasource, (s) => {
  //     return s.location === this.selectedLocation;
  //   });
  //   // console.log(this.selected_Array);


  // }
}
