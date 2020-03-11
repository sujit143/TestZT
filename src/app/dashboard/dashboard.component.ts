import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatExpansionPanel } from '@angular/material';

import { Subscription } from 'rxjs';
import { MessageService, Message } from 'primeng/api';
// import * as Chartist from 'chartist';

import { AppservicesService } from './../services/appservices.service';
import { Member } from '../Models/dashboard';
import { Department } from '../Models/department';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('MatExpansionPanel',  {static: true}) MatExpansionPanel: MatExpansionPanel;
  private _subscriptions = new Subscription();
  arrlogin: Member;
  arrdept: Department;
  msgs: Message[] = [];

  constructor(private _data: AppservicesService, private messageService: MessageService ) {}

  ngOnInit() {
    this.getMemberInfo();
  }

  getMemberInfo() {
    this._subscriptions.add(this._data.getMember().subscribe (
      (data: Member) => {
        this.arrlogin = data['memberDetails'];
        const result = this.arrlogin['associatedDepartments'][0];
        this.arrdept = result;
        console.log(this.arrlogin);
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server not responding' });
      }
    ));
  }
  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
