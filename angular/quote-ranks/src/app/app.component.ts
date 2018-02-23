import { Component } from '@angular/core';
import { Quote } from './quote';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	quote = new Quote();
	quotes = [];
	onSubmit(){
		this.quote.id = this.quotes.length; // id should come from database. Use array length for now...
		this.quotes.push(this.quote);
		this.quotes.sort(this.compareRating);
		this.quote = new Quote();
	}
	dataFromChild(eventData) {
		// find array index of quote being "changed"
		const index = this.quotes.findIndex(quote => quote.id === eventData.id);
		if (eventData.action === "up") {
			this.quotes[index].rating += 1;
		} else if (eventData.action === "down") {
			this.quotes[index].rating -= 1;
		} else if (eventData.action === "delete") {
			this.quotes.splice(index, 1);
		}
		this.quotes.sort(this.compareRating);
	}
	// compareRating is being used by array.sort
	compareRating(a, b) {
		return (a.rating < b.rating? 1: -1);
	}
}
