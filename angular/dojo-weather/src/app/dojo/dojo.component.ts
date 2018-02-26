import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OpenweatherApiService } from '../openweather-api.service';
import { Dojos } from '../dojos';

@Component({
	selector: 'app-dojo',
	templateUrl: './dojo.component.html',
	styleUrls: ['./dojo.component.css']
})
export class DojoComponent implements OnInit {
	default_city = "washington";
	city: string = "";
	city_weather: any = {};

	constructor(private _route: ActivatedRoute,
				private _openweatherAPI: OpenweatherApiService) {
		this._route.paramMap.subscribe( params => {
			if (params.get('city')) {
				this.city = params.get('city');
			} else {
				this.city = this.default_city;
			}
			let dojo_index = Dojos.findIndex(dojo => dojo.link === this.city);
			this._openweatherAPI.retrieveWeather(Dojos[dojo_index].openweather_name);
		})
	}

	ngOnInit() {
		this._openweatherAPI.city_weather.subscribe(
			(weather) => { 	if (weather.name) {
								let dojo_index = Dojos.findIndex(dojo => dojo.openweather_name === weather.name.toLowerCase());
								this.city_weather = weather;
								this.city_weather.image = Dojos[dojo_index].image;
								this.city_weather.display_name = Dojos[dojo_index].name;
							}
						}
		);
	}
}