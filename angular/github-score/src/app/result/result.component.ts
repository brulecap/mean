import { Component, OnInit } from '@angular/core';
import { GithubApiService } from '../github-api.service';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
	user_info: any = {};

	constructor(private _githubAPI: GithubApiService) { }

	ngOnInit() {
		this._githubAPI.user_info.subscribe(
			(user_info) => { this.user_info = user_info; }
		);
	}

}
