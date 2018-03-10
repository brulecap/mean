import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';

import { User } from './user';

@Injectable()
export class DataService {
	usersObserver = new BehaviorSubject([]);
	base = "/api/";

	constructor(private _http: Http) { }

	retrieveAll() {
		this._http.get(`${this.base}users/`).subscribe(
			users => this.usersObserver.next(users.json()),
			errorResponse => console.log(errorResponse)
		);
	}

	createUser(user: User) {
		this._http.post(`${this.base}users/`, user).subscribe(
			response => this.retrieveAll(),
			errorResponse => console.log(errorResponse)
		);
	}
}