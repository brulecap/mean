import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-quote',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.css']
})
export class QuoteComponent {
	@Input() appQuotes;
	@Output() quoteEventEmitter = new EventEmitter();
	constructor() { }
	triggerEvent(actionObject){
		console.log("event",actionObject, this.appQuotes);
		this.quoteEventEmitter.emit(actionObject);
	}
}