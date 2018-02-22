import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { HumanComponent } from './character/human/human.component';
import { SaiyanComponent } from './character/saiyan/saiyan.component';
import { SuperSaiyanComponent } from './character/super-saiyan/super-saiyan.component';
import { SuperSaiyanTwoComponent } from './character/super-saiyan-two/super-saiyan-two.component';
import { SuperSaiyanThreeComponent } from './character/super-saiyan-three/super-saiyan-three.component';
import { SuperSaiyanFourComponent } from './character/super-saiyan-four/super-saiyan-four.component';


@NgModule({
	declarations: [
		AppComponent,
		CharacterComponent,
		HumanComponent,
		SaiyanComponent,
		SuperSaiyanComponent,
		SuperSaiyanTwoComponent,
		SuperSaiyanThreeComponent,
		SuperSaiyanFourComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
