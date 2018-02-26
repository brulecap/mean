import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubApiService {
	user_info: BehaviorSubject<any> = new BehaviorSubject({});
	base = "https://api.github.com/users/";

	constructor(private _http: HttpClient) { }

	retrieveUser(user_name) {
		this._http.get(this.base+user_name).subscribe(
			(user: any) => { this.user_info.next(user); }
		);
	}
}