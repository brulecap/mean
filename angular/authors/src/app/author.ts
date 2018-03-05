export class Author {
	public _id: string = "";
	public first_name: string = "";
	public last_name: string = "";
	public birthdate: string = "";
	public country: string = "";
	public books: Array<any> = [];
	public created_at: Date = new Date();
	public updated_at: Date = new Date();

	constructor(){}
}
