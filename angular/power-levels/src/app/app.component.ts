import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	base_power_level = 50;
	power_level: number;
	onSubmit(){
		this.power_level = this.base_power_level;
		console.log("submitted", this.base_power_level);
	}
}
