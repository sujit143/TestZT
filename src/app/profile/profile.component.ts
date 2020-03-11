import { Component, OnInit } from '@angular/core';

import { Leave } from './leave';
import { Profile } from './profile';
// import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 employee: any;
  displayDialog: boolean;
  username: any;
  fullname: any;
email: any;
designation: any;
phoneno: any;
dateofbirth: any;
gender: any;
address: any;


arr: Profile[] = [
    new Profile ( 'Ashwini', 'Ashwini Sunkoppad',
   'ashwiniss173@gmil.com', 'Developer', '154879553',
    '15-12-1998', 'Female', 'Hebbal,Bangalore' ),
];
arr1: Leave[] = [
  new Leave ('Allowed leaves'),
  new Leave ('Requested leaves'),
  new Leave ('Pending leaves'),
  new Leave ('Emergency leaves'),
  new Leave ('Sick leaves'),
  new Leave ('Total leaves')
];
  updatedItem: any;
  constructor()
{
  console.log(this.arr[0].username);
}
  ngOnInit() {
    this.username = this.arr[0].username;
    this.fullname = this.arr[0].fullname;
    this.email = this.arr[0].email;
    this.designation = this.arr[0].designation;
    this.phoneno = this.arr[0].phoneno;
    this.dateofbirth = this.arr[0].dateofbirth;
    this.gender = this.arr[0].gender;
    this.address = this.arr[0].address;
    this.updatedItem = 0;
    }
    onFormSubmit() {
            const data = this.updatedItem;
            for (let i = 0; i < this.arr.length; i++) {
              if (i === data) {
                this.arr[0].username = this.username;
                this.arr[0].fullname = this.fullname ;
                this.arr[0].email = this.email ;
                this.arr[0].designation = this.designation;
                this.arr[0].phoneno = this.phoneno ;
                this.arr[0].dateofbirth = this.dateofbirth ;
                this.arr[0].gender = this.gender ;
                this.arr[0].address = this.address ;


               }
                                         }

  }
  uploadedFiles: any[] = [];

  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

}
}
