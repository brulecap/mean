import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { Author } from '../author';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	authors: Array<Author> = [];
	submit_error: string = "";
	submit_response: string = "";

	constructor(private _router: Router,
				private _dataService: DataService) { }

	ngOnInit() {
		this.getAuthors();
	}
	onDelete(event,id) {
		event.preventDefault();
		this._dataService.deleteAuthor(id).subscribe(response => {
			(response.error?this.submit_error = response.error:(this.getAuthors(), this._router.navigate(['/'])))
		});
	}
	getAuthors() {
		this._dataService.getAuthors().subscribe(authors => {
			this.authors = authors;
		});		
	}
}