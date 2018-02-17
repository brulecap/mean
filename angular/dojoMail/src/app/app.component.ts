import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  emails=[{email:"Bill@gates.com",important:true,subject:"New Windows",content:"Windows XI will launch in year 2100."},
  		  {email:"ada@lovelace.com",important:true,subject:"Programming",content:"Enchantress of Numbers"},
  		  {email:"john@Carmac.com",important:false,subject:"Updated Algo",content:"New algorithm for shadow columes."},
  		  {email:"gabe@newel.Com",important:false,subject:"HL3!",content:"Just kidding..."}];
}
