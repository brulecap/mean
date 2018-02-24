import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BuildingComponent } from './building/building.component';
import { HistoryComponent } from './history/history.component';

import { DataService } from './data.service';

@NgModule({
	declarations: [
		AppComponent,
		BuildingComponent,
		HistoryComponent
	],
	imports: [
		BrowserModule
	],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
