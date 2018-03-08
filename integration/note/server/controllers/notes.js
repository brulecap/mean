function prettifyErrors(errors) {
	let error = Object.keys(errors).map(key => {
		console.log("errors", key,errors[key]);
		return errors[key].message;
	});
	return {"errors":error};
}
var mongoose = require('mongoose');
var Note = mongoose.model('Note');
module.exports = {
	getAll: function(request, response) {
		Note.find({})
			.then(function(notes) {
				response.json(notes);
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	},
	create: function(request, response) {
		var note = new Note(request.body);
		note.save()
			.then(function() {
				response.json({status:"OK"});
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	},
	delete: function(request, response) {
		Note.remove({_id:request.params.id})
			.then(function() {
				response.json({status:"OK"});
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	}

}