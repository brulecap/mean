import { Component } from '@angular/core';
import { Dojos } from './dojos';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	cities = Dojos;

	constructor() { }

}