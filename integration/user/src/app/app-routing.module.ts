import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: UserComponent },
	{ path: 'register', component: RegisterComponent }
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }