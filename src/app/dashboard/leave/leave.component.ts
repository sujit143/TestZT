import { Component, OnInit } from '@angular/core';
interface Country {
  Leave: string;
  Requested: string;
  Applied: string;
  Status: string;
  Sent: string;

}


const COUNTRIES: Country[] = [
  {
    Leave: 'Earned Leave',
    Requested: '	Aug 25, 2014',
    Applied : '	Sept 7, 2014',
    Status : 'Pending',
    Sent : 'Othon Mourkakos'
  },
  {
    Leave: 'Sick Leave',
    Requested: 'Jul 14, 2013',
    Applied : '	Jul 14, 2013',
    Status : 'Approved',
    Sent : 'Othon Mourkakos'

  },
  {
    Leave: 'Sick Leave',
    Requested: 'Jan 1, 2013',
    Applied : 'Jan 1, 2013',
    Status : 'Approved',
    Sent : 'Othon Mourkakos'

  },
  {
    Leave: 'Sick Leave',
    Requested: 'Jan 1, 2013',
    Applied : 'Jan 1, 2013',
    Status: 'Approved',
    Sent: 'Othon Mourkakos'

  },
{
  Leave: 'Earned Leave',
    Requested: 'Aug 25, 2014',
    Applied: 'Sept 7, 2014',
    Status: 'Pending',
    Sent: 'Othon Mourkakos'
},
{
  Leave: 'Earned Leave',
    Requested: 'Aug 25, 2014',
    Applied: 'Sept 7, 2014',
    Status: 'Pending',
    Sent: 'Othon Mourkakos'
},
{
  Leave: 'Sick Leave',
  Requested: 'Jul 14, 2013',
  Applied: 'Jul 27, 2013',
  Status: 'Approved',
  Sent: 'Othon Mourkakos'
},
{
    Leave: 'Sick Leave',
    Requested: 'Jan 1, 2013',
    Applied: 'Jan 1, 2013',
    Status: 'Approved',
    Sent: 'Othon Mourkakos'
},
{
  Leave: 'Sick Leave',
  Requested: 'Jan 1, 2013',
  Applied: 'Jan 1, 2013',
  Status: 'Approved',
  Sent: 'Othon Mourkakos'

}
];
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  a: number = Math.floor(Math.random() * 6) + 1;
  b = Math.floor(Math.random() * 6) + 1;
  c = Math.floor(Math.random() * 6) + 1;
  e = Math.floor(Math.random() * 6) + 1;
  panelOpenState = false;
  model1: any;
  model2: any;
  placement = 'bottom-center';
  countries = COUNTRIES;
  constructor() {}

  ngOnInit() {}
}
