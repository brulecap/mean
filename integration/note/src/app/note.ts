export class Note {
	constructor(
		public _id: number = null,
		public note_text: string = "",
		public created_at: Date = new Date(),
		public updated_at: Date = new Date()
	){}
}
