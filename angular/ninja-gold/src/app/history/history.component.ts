import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
	@Input() history: Array<string> = [];

	constructor(private _dataService: DataService) { }

	ngOnInit() {
		this.history = this._dataService.retrieveHistory();
	}
}
