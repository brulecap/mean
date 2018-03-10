import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AuthService } from './auth.service';

@NgModule({
	declarations: [
		AppComponent,
		UserComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpModule,
		CookieModule.forRoot()
	],
	providers: [DataService, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }