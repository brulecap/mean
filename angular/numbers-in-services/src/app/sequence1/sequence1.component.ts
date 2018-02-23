import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'app-sequence1',
	templateUrl: './sequence1.component.html',
	styleUrls: ['./sequence1.component.css']
})
export class Sequence1Component implements OnInit {
	numbers: number[] = [];

	constructor(private _dataService: DataService) { }

	ngOnInit() {}
	generateSequence() {
		this._dataService.generateSequence(this._dataService.sequence1, 4, 10);
		this.numbers = this._dataService.retrieveSequence1();
	}
}