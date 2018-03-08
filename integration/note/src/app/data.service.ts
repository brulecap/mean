import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Note } from './note';


@Injectable()
export class DataService {
	base = "/api/";

	constructor(private _http: HttpClient) {}

	getNotes(): Observable<any> {
		return this._http.get(`${this.base}notes/`);
	}
	createNote(note: Note): Observable<any> {
		console.log("creating note", note);
		return this._http.post(`${this.base}notes/`, note);
	}
	deleteNote(id: number): Observable<any> {
		return this._http.delete(`${this.base}tasks/${id}`);
	}

}