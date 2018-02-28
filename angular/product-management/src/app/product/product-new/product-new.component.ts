import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Product } from '../../product';
import { DataService } from '../../data.service';

@Component({
	selector: 'app-product-new',
	templateUrl: './product-new.component.html',
	styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
	product = new Product();
	/*
		parameters:
			_dataService - Used in updating the data.
			_router - Used to redirect toproducts page
	*/
	constructor(private _dataService: DataService,
				private _router: Router) { }

	ngOnInit() {
	}
	/*
		User has submitted a new product. Call DataService to update product.
		parameters:
			this.product - Information gottne from the form... ngModel...
			Format of product in form need to match product.ts...
	*/
	onSubmit(){
		this._dataService.addProduct(this.product);
		this._router.navigate(['products']);
	}
}