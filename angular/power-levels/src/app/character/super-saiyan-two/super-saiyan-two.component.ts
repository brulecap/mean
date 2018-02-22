import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
	selector: 'app-super-saiyan-two',
	templateUrl: './super-saiyan-two.component.html',
	styleUrls: ['./super-saiyan-two.component.css']
})
export class SuperSaiyanTwoComponent implements OnChanges {
	multiplier: number = 150;
	@Input() myPowerLevel: number;
	constructor() { }
	ngOnChanges(changes: SimpleChanges) {
		this.myPowerLevel = changes.myPowerLevel.currentValue * this.multiplier;
	}
}