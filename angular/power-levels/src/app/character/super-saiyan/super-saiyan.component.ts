import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
	selector: 'app-super-saiyan',
	templateUrl: './super-saiyan.component.html',
	styleUrls: ['./super-saiyan.component.css']
})
export class SuperSaiyanComponent implements OnChanges {
	multiplier: number = 90;
	@Input() myPowerLevel: number;
	constructor() { }
	ngOnChanges(changes: SimpleChanges) {
		this.myPowerLevel = changes.myPowerLevel.currentValue * this.multiplier;
	}
}