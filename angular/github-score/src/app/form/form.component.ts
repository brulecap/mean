import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	user_info: any = {};
	user_name: string = "";

	constructor(private _githubAPI: GithubApiService) { }

	ngOnInit() {
		this._githubAPI.user_info.subscribe(
			(user_info) => { this.user_info = user_info; }
		);
	}
	onSubmit() {
		this._githubAPI.retrieveUser(this.user_name);
	}
}