import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../user';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	user: User = new User();
	errors: Array<string> = []; 

	constructor(private _authService: AuthService,
				private _router: Router) { }

	ngOnInit() {
	}

	onSubmit() {
		this._authService.register(this.user).subscribe(response => {
			if (response.json().errors) {
				this.errors =  response.json().errors;
			} else {
				this._router.navigateByUrl('/');
			}
		})
	}
}
