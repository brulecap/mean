import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { DataService } from '../../data.service';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
	id: number = 0;
	product: any = {};

	/*
		ProductEdit Component consturctor
		parameters:
			_route: ActivatedRoute - Used to update any changes to the parameters... id...
			_dataService: DataService - Used to get information from the database... dataservice
			_router: Router - used to redirect to appropriate page...
	*/
	constructor(private _route: ActivatedRoute,
				private _dataService: DataService,
				private _router: Router) {
		this._route.paramMap.subscribe( 
			params => {
				this.id = parseInt(params.get('id'));
				this.product = this._dataService.retrieveProduct(this.id);
			},
			error => {
				console.log("product-edit-component subscribe error: ", error);
			})
	}
	ngOnInit() {
	}
	/*
		User has submiited updates to the product.
		parameters:
			product - product object with updates. See product.ts for format of product object.
	*/
	onSubmit(id) {
		this._dataService.updateProduct(this.product);
		this._router.navigate(['products']);
	}
	/*
		user has selected the product delete button.
		parameters:
			event - mouse click event? preventDefault is needed to avoid execeptions. The <button> used to delete the product
					is included inside the form. As a result the <button> click is interpreted to be part of form submission and 
					if preventDefault is not called the form submission errors out??? Still unclear on this to an extent, but I
					think that's the general flow.
			id - unique id of product to be deleted. The DataService should worry about mapping id to a particular product.
	*/
	delete(event, id) {
		event.preventDefault();
		this._dataService.deleteProduct(id);
		// redirect to products page
		this._router.navigate(['products']);
	}
}