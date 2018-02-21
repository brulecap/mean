import { Component } from '@angular/core';
import { User } from './user';
import { States } from './states';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	user = new User();
	users = [];
	new_user = {};
	states = States;
	onSubmit(){
		this.users.push(this.user);
		this.new_user = this.user;
		this.user = new User();
		console.log("submitted", this.users);
	}
}