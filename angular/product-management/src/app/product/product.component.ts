import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	products: Array<any> = [];
	/*
		parameters:
			_dataService - Used for updating data of course.
	*/
	constructor(private _dataService: DataService) { }

	ngOnInit() {
		// Retrieve all products
		this.products = this._dataService.retrieveProducts();
	}
	/*
		delete button clicked. Call data service to delete it.
		parameters:
			id - id of product to delete from form.
	*/
	delete(id) {
		this._dataService.deleteProduct(id);
	}
}