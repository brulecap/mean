function prettifyErrors(errors) {
	let error = Object.keys(errors).map(key => {
		return errors[key].message;
	});
	return {"error":error[0]};
}
var mongoose = require('mongoose');
var DoubleNicklePeople = mongoose.model('DoubleNicklePeople');
module.exports = {
	show: function(request, response) {
		let query_object = {};
		if (request.params.name) {
			query_object = {name:request.params.name};
		} 
		DoubleNicklePeople.find(query_object)
			.then(function(people) {
				response.json(people);
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	},
	create: function(request, response) {		
		var person = new DoubleNicklePeople({name:request.params.name});
		person.save()
			.then(function() {
				response.redirect('/');
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	},
	delete: function(request, response) {		
		DoubleNicklePeople.remove({name:request.params.name})
			.then(function() {
				response.redirect('/');
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	}
}