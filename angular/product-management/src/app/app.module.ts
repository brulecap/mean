import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { AppRoutingModule } from './app-routing.modules';

import { DataService } from './data.service';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProductComponent,
		ProductEditComponent,
		ProductNewComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule
	],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule { }