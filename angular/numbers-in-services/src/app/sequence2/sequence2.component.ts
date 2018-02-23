import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
	selector: 'app-sequence2',
	templateUrl: './sequence2.component.html',
	styleUrls: ['./sequence2.component.css']
})
export class Sequence2Component implements OnInit {
	numbers: number[] = [];

	constructor(private _dataService: DataService) { }

	ngOnInit() {}
	generateSequence() {
		this._dataService.generateSequence(this._dataService.sequence2, 3, 6);
		this.numbers = this._dataService.retrieveSequence2();
	}
}