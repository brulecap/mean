import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../user';

import {AuthService } from '../../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user: User = new User();
	errors: Array<string> = [];
	logged_in: boolean = false;

	constructor(private _authService: AuthService,
				private _router: Router) { }

	ngOnInit() {
		this._authService.loggedIn$.subscribe(authed => {
			console.log("authed", authed);
			this.logged_in = authed;
		})
	}
	onSubmit() {
		console.log("submitted", this.user);
		this._authService.login(this.user).subscribe(response => {
			if (response.errors) {
				console.log("errors", response.errors)
				this.errors =  response.errors;
			} else {
				console.log("response", response.errors);
				this._router.navigateByUrl('/');
			}
		})
	}
/*	onSubmit(user: User) {
		this._authService.login(user).subscribe(
			(something) => console.log("something", something, this._authService.isAuthed()),
			error => {
				console.log("error", error);
//				this.handleErrors(error.json());
			}
		);
	} */
}
