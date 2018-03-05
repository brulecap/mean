import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Author } from './author';


@Injectable()
export class DataService {
	base = "http://localhost:8000/";

	constructor(private _http: HttpClient) {}

	getAuthors(id=""): Observable<any> {
		return this._http.get(`${this.base}authors/`);
	}
	getAuthor(id: string): Observable<any> {
		return this._http.get(`${this.base}authors/${id}`);
	}
	deleteAuthor(id: string): Observable<any> {
		return this._http.delete(`${this.base}authors/${id}`);
	}
	updateAuthor(author: Author): Observable<any> {
		console.log("updating author", author);
		return this._http.put(`${this.base}authors/${author._id}/`, author);
	}
	createAuthor(author: Author): Observable<any> {
		console.log("creating author", author);
		return this._http.post(`${this.base}authors/`, author);
	}
}