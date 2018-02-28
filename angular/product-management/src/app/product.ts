export class Product {
	constructor(
		public id: number = null,
		public title: string = "",
		public price: number = 0,
		public image: string = "",
		public created_at: Date = new Date(),
		public updated_at: Date = new Date()
	){}
}
