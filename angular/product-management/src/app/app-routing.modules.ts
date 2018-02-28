import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductNewComponent } from './product/product-new/product-new.component';

/*
	Routes... note delte route - "products/delete/:id" not needed as we delete the product in the componenet
	and then redirect to products page. Looks restful but...
*/
const routes: Routes = [
	// Home page
	{path: '', pathMatch: 'full', component: HomeComponent},
	// Products page
	{path: 'products', component: ProductComponent},
	// Edit product page
	{path: 'products/edit/:id', component: ProductEditComponent},
	// New product page
	{path: 'products/new', component: ProductNewComponent}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }