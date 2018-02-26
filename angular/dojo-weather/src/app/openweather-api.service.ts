import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'Rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpenweatherApiService {
	city_weather: BehaviorSubject<any> = new BehaviorSubject({});
	base_url = "http://api.openweathermap.org/data/2.5/weather?units=imperial";
	api_key = "&appid=6dc2cc8059d26537c82de1951003f2f8";
	city_prefix = "&q=";

	constructor(private _http: HttpClient) { }
	retrieveWeather(city_name) {
		this._http.get(this.base_url+this.city_prefix+city_name+this.api_key).subscribe(
			(weather: any) => { this.city_weather.next(weather); }
		);
	}
}
