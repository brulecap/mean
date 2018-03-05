import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Author } from '../author';

import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	author: Author;
	submit_response: string = "";
	submit_error: string = "";

		constructor(private _router: Router,
					private _route: ActivatedRoute,
					private _dataService: DataService) {}

	ngOnInit() {
		this._route.paramMap
			.switchMap(params => this._dataService.getAuthor(params.get('id')))
			.subscribe(author => (this.author = author));
	}
	onSubmit(event, form) {
		event.preventDefault();
		this._dataService.updateAuthor(this.author).subscribe(response => {
			(response.error?this.submit_error = response.error:this._router.navigate(['']))
		});
	}
}