// require mongoose
var mongoose = require('mongoose');
// setup mongoose double_nickle_people schema and collection
var DoubleNicklePeopleSchema = new mongoose.Schema({
	name:  { type: String,
			 required: [true, "Name is required."],
			 minlength: [3, "Name must be at least 3 characters."],
			 trim: true}
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
var DoubleNicklePeople = mongoose.model('DoubleNicklePeople', DoubleNicklePeopleSchema);