import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
	selector: 'app-human',
	templateUrl: './human.component.html',
	styleUrls: ['./human.component.css']
})
export class HumanComponent implements OnChanges {
	multiplier: number = 1;
	@Input() myPowerLevel: number;
	constructor() { }
	ngOnChanges(changes: SimpleChanges) {
		this.myPowerLevel = changes.myPowerLevel.currentValue * this.multiplier;
	}
}