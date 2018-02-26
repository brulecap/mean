import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DojoComponent } from './dojo/dojo.component';
import { OpenweatherApiService } from './openweather-api.service';


@NgModule({
	declarations: [
		AppComponent,
		DojoComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [OpenweatherApiService],
	bootstrap: [AppComponent]
})
export class AppModule { }
