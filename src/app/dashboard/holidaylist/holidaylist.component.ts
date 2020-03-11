import { Component, OnInit } from '@angular/core';


interface Country {
  holiday: string;
  date: string;
  location: string;

}
const COUNTRIES: Country[] = [
  {
    holiday: 'Project This is example of project',
    date: '	Patrick Smith',
    location:'	Bangalore, Hubli, Englewood'

  },
  {
    holiday: 'Alpha project',
    date: '	Alice Jackson',
    location: 'Bangalore, Hubli'

  },
  {
    holiday: 'Betha project',
    date: 'John Smith',
    location:'Englewood.'

  },
  {
    holiday: 'Gamma project',
    date: '	Anna Jordan',
    location:'Bangalore, Hubli, Englewood.'

  },
{
  holiday: 'Alpha project',
    date: '	Alice Jackson',
    location: '	Bangalore, Hubli, Englewood.'
},
{
  holiday: 'Project This is example of project',
    date: '	Patrick Smith',
    location: '	Bangalore, Hubli, Englewood.'
},
{
  holiday: 'Gamma project',
    date: 'Anna Jordan',
    location:'Hubli'
},
{
  holiday: 'Project This is example of project',
    date: '	Patrick Smith',
    location:'Bangalore'
},
{
holiday: 'Alpha project',
date: '	Alice Jackson',
location: 'Bangalore, Hubli'

},
{

  holiday: 'Betha project',
    date: 'John Smith',
    location:'Englewood.'
},
{
  holiday: 'Gamma project',
    date: 'Anna Jordan',
    location:'Hubli'
},
{
  holiday: 'Gamma project',
    date: 'Anna Jordan',
    location:'Hubli'
},
{
  holiday: 'Gamma project',
    date: 'Anna Jordan',
    location:'Hubli'
},
{
  holiday: 'Gamma project',
    date: 'Anna Jordan',
    location:'Hubli'
},
];
@Component({
  selector: 'app-holidaylist',
  templateUrl: './holidaylist.component.html',
  styleUrls: ['./holidaylist.component.scss']
})
export class HolidaylistComponent{

  countries = COUNTRIES;
}
