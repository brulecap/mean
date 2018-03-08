import { Component, OnInit, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from './data.service';

import { Note } from './note';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	notes: Array<Note> = [];
	note: Note = new Note();
	errors: Array<any> = [];
	subscription: Subscription;

	constructor(private _dataService: DataService) {}

	ngOnInit() {
		this.subscription = this._dataService.getNotes().subscribe(notes => {
			this.notes = notes;
		})
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this._dataService.createNote(this.note).subscribe(status => {
			if (status.errors) {
				this.errors = status.errors;
			} else {
				this.note = new Note();
				this._dataService.getNotes().subscribe(notes => {
					this.notes = notes;
				})
			}
		})
	}

	onDelete(event, id) {
		this._dataService.deleteNote(id).subscribe(status => {
			if (!status.errors) {
				this._dataService.getNotes().subscribe(notes => {
					this.notes = notes;
				})
			}
		})
	}
}
