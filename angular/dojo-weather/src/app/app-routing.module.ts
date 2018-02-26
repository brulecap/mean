import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DojoComponent } from './dojo/dojo.component';

const routes: Routes = [
	{ path: '', component: DojoComponent },
	{ path: ':city', component: DojoComponent },
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }