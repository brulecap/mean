import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
	selector: 'app-super-saiyan-four',
	templateUrl: './super-saiyan-four.component.html',
	styleUrls: ['./super-saiyan-four.component.css']
})
export class SuperSaiyanFourComponent implements OnChanges {
	multiplier: number = 500;
	@Input() myPowerLevel: number;
	constructor() { }
	ngOnChanges(changes: SimpleChanges) {
		this.myPowerLevel = changes.myPowerLevel.currentValue * this.multiplier;
	}
}