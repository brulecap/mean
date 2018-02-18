import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	// numberDivs is a dumby array looped through in the template to give us numberDivs.length divs 
	numberDivs = new Array<number>(10);
	colors = ["Magenta", "Lime", "Red", "Blue", "Orange", "Yellow", "Gold", "DeepPink", "DarkSlateBlue", "DarkMagenta"];
}