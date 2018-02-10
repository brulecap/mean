// require mongoose
var mongoose = require('mongoose');
// setup mongoose double_nickle_people schema and collection
var TaskSchema = new mongoose.Schema({
	title: 		 { type: String,
				   required: [true, "title is required."],
				   minlength: [3, "Name must be at least 3 characters."],
				   trim: true},
	description: { type: String,
				   default: "",
				   trim: true},
	completed:	 { type: Boolean,
				   default: false}
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
var Task = mongoose.model('Task', TaskSchema);