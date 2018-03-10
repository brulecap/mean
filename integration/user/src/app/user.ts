export class User {
	constructor(
		public _id: number = null,
		public email: string = "",
		public password: string = "",
		public confirm: string = "",
		public created_at: Date = new Date(),
		public updated_at: Date = new Date()
	){}
}
