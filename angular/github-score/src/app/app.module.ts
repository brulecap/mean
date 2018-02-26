import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';

import { GithubApiService } from './github-api.service';

@NgModule({
	declarations: [
		AppComponent,
		FormComponent,
		ResultComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule
	],
	providers: [GithubApiService],
	bootstrap: [AppComponent]
})
export class AppModule { }
