// require mongoose
var mongoose = require('mongoose');
// setup mongoose note schema
var NoteSchema = new mongoose.Schema({
	note_text:  { type: String,
				  required: [true, "Note text is required and must have at least 3 characters"],
				  minlength: 3,
				  trim: true}
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
var Note = mongoose.model('Note', NoteSchema);