import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Author } from '../author';

@Component({
	selector: 'app-new',
	templateUrl: './new.component.html',
	styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	author: Author = new Author();
	submit_response: string = "";
	submit_error: string = "";

	constructor(private _router: Router,
				private _dataService: DataService) { }

	ngOnInit() {
	}
	onSubmit(event, form_data) {
		this._dataService.createAuthor(this.author).subscribe(response => {
			(response.error?this.submit_error = response.error:this._router.navigate(['']))
		});
	}

}
