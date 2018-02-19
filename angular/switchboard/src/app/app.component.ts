import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	blocks = new Array<any>(10);
	constructor() {
		for (let i=0;i<this.blocks.length;i++) {
			this.blocks[i] = {on:false};
		}
	}
	onButtonClick(index) {
		this.blocks[index].on = !this.blocks[index].on;
	}
}
