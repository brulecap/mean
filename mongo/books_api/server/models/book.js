// require mongoose
var mongoose = require('mongoose');
// setup author schema
var AuthorSchema = new mongoose.Schema({
	first_name: { type: String,
				  required: [true, "First name is required."],
				  minlength: [2, "First name must be at least 2 characters."],
				  trim: true},
	last_name: 	{ type: String,
				  required: [true, "Last name is required."],
				  minlength: [2, "Last name must be at least 2 characters."],
				  trim: true},
	country: 	{ type: String,
				  required: [true, "Country is required."],
				  minlength: [3, "Country must be at least 3 characters."],
				  trim: true},
	birthdate: 	{ type: String,
				  required: [true, "Birthdate is required."]},
	books: 		[{
				   title: { type: String,
							required:[true, "title is required."],
							minlength: [2, "Book title must be at least 2 characters."]},
				   year: {	type: Date,
							required: [true, "Book year is required."],
							validate: [{ validator: function( year ) {return number > new Date();},message: "Book year must be in the past."}]
						 }
				}]
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});

var AuthorSchema = mongoose.model('Author', AuthorSchema);