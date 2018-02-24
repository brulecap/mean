import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'app-building',
	templateUrl: './building.component.html',
	styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
	@Input() myBuilding: any;
	@Output() goldEventEmitter = new EventEmitter();
	name: string = "";
	class_name: string = "";
	min: number = 0;
	max: number = 0;
	display_text: string = "";

	constructor(private _dataService: DataService) { }

	ngOnInit() {
		this.name = this.myBuilding.name;
		this.class_name = this.name.toLowerCase();
		this.min = this.myBuilding.earns.min;
		this.max = this.myBuilding.earns.max;
		if (this.min >= 0) {
			this.display_text = "Earns " + this.min + " - " + this.max + " Gold";
		} else {
			this.display_text = "Earn up to Lose up to " + this.max + " Gold";
		}
	}
	generateGold(building) {
		let gold_event_data = {building:building,
							   golds:Math.floor(Math.random() * (building.max - building.min + 1)) + building.min};
		this.goldEventEmitter.emit(gold_event_data);
	}
}