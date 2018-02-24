import { Component, OnInit  } from '@angular/core';
import { DataService } from './data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	gold_count: number = 0;
	buildings: Array<any> = [];
	history: Array<string> = [];
	constructor(private _dataService: DataService) { }
	ngOnInit() {
		this.buildings = this._dataService.retrieveBuildings();
		this.history = this._dataService.retrieveHistory();
	}
	dataFromChild(gold_event_data) {
		this.gold_count += gold_event_data.golds;
		let history_string = "You've" + (gold_event_data.golds>0? " earned " : " lost ") + gold_event_data.golds + " gold at the " + gold_event_data.building.name;
		this._dataService.addHistory(history_string);
	}
}