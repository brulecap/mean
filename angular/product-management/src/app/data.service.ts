import { Injectable } from '@angular/core';

import { Products } from './products';

@Injectable()
export class DataService {
	products = Products;
	// id included in lieu of a database connection... assuming id would be automatically inserted of course...
	id: number;

	constructor() {
		/*
			Set current id to length of "sample" products included in products.ts. Just trying to get a  
			unique id... With a database I assume this would be taken care of there.
		*/
		this.id = this.products.length;
	}
	/*
		Retrieve all products
	*/
	retrieveProducts() {
		return this.products;
	}
	/*
		Retrieve a product
		parameters:
			id: id of product to retrieve
	*/
	retrieveProduct(id) {
		// get index of product with product.id === id. Good use case of an anonymous function!!!
		let product_index = this.products.findIndex(product => product.id === id);
		if (product_index > -1) {
			// Found product!!! Otherwise findIndex would have returned -1(I hope :))
			return this.products[product_index];
		}
	}
	/*
		Add a product.
		parameters: product - See product.ts for the format of the product object
	*/
	addProduct(product) {
		/*
			id would normally be handled via database connectivity. this.id shoud contain the
			"next" id. Set it and increment...
		*/
		product.id = this.id;
		this.products.push(product);
		this.id += 1;
	}
	/*
		Delete product
		parameters:
			id: id of product to delete
	*/
	deleteProduct(id) {
		// get index of product with product.id === id. Good use case of an anonymous function!!!
		let product_index = this.products.findIndex(product => product.id === id);
		if (product_index > -1) {
			// Found product!!! Otherwise findIndex would have returned -1(I hope :))
			this.products.splice(product_index, 1);
		}
	}
	/*
		Update product
		parameters:
			updated_product: product object... See product.ts... Hopefuly form complies! :)
	*/
	updateProduct(updated_product: any) {
		// get index of product with product.id === id. Good use cae of an anonymous function!!!
		let product_index = this.products.findIndex(product => updated_product.id === product.id);
		if (product_index > -1) {
			// Found product!!! Otherwise findIndex would have returned -1(I hope :))
			this.products[product_index] = updated_product;
		}
	}
}