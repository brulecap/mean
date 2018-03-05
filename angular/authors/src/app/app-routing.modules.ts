import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

/*
	Routes... 
*/
const routes: Routes = [
	// Home page
	{path: '', pathMatch: 'full', component: HomeComponent},
	// New page
	{path: 'new', component: NewComponent},
	// Edit page
	{path: 'edit/:id', component: EditComponent}]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }