function prettifyErrors(errors) {
	let error = Object.keys(errors).map(key => {
		return errors[key].message;
	});
	return {"error":error[0]};
}
var mongoose = require('mongoose');
var Task = mongoose.model('Task');
module.exports = {
	show: function(request, response) {
		let query_object = {};
		if (request.params.id) {
			query_object = {_id:request.params.id};
		} 
		Task.find(query_object)
			.then(function(task) {
				response.json(task);
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	},
	create: function(request, response) {
		var task = new Task({title:request.body.title,
							 description:request.body.description,
							 completed:request.body.completed});
		task.save()
			.then(function() {
				response.redirect('/tasks/');
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	},
	update: function(request, response) {
		console.log("updating",request.body.title);
		Task.findOne({_id:request.params.id})
			.then(function(task) {
				if (request.body.title) {
					task.title = request.body.title;
				}
				if (request.body.description) {
					task.description = request.body.description;
				}
				if (request.body.completed) {
					task.completed = request.body.completed;
				}
				task.save()
					.then(function() {
						response.redirect(`/tasks/${request.params.id}`);
					})
					.catch(function(error) {
						response.json(prettifyErrors(error.errors));
					})
				})
			.catch(function(error) {
				console.log("update error finding -", prettifyErrors(error.errors));
				response.json(prettifyErrors(error.errors));
			})
	},
	delete: function(request, response) {		
		Task.remove({_id:request.params.id})
			.then(function() {
				response.redirect('/tasks/');
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	}
}