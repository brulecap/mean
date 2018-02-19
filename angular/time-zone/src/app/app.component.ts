import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
/*
	This would need to be modified to display times as savings time(i.e. edt rather than est.)
*/
export class AppComponent {
	title = 'app';
	date_now = Date();
	// get current timezone string... pst, mst, cst, pst. This is used to set the timezone
	// displayed.
	time_zone:string = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2].toLowerCase();
	display_time: boolean = true;
	// pst, mst, cst, est refer to each button id and are used to control styling.
	pst:boolean = false;
	mst:boolean = false;
	cst:boolean = false;
	est:boolean = false;
	constructor () {
		this[this.time_zone] = true;
	}
	onButtonClick(event) {
		this.date_now = Date();
		// clear all buttons 
		this.pst = this.mst = this.cst = this.est = false;
		// set current button selected. If the clear button is selected event.target.id is undefined and no buttons
		// are set as selected.
		this[event.target.id] = true;
		this.time_zone = event.target.id;
		if (!event.target.id) {
			this.display_time = false;
		} else {
			this.display_time = true;
		}
	}
}
