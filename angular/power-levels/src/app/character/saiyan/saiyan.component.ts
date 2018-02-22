import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
	selector: 'app-saiyan',
	templateUrl: './saiyan.component.html',
	styleUrls: ['./saiyan.component.css']
})
export class SaiyanComponent implements OnChanges {
	multiplier: number = 10;
	@Input() myPowerLevel: number;
	constructor() { }
	ngOnChanges(changes: SimpleChanges) {
		this.myPowerLevel = changes.myPowerLevel.currentValue * this.multiplier;
	}
}