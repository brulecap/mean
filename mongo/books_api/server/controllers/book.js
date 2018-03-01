function prettifyErrors(errors) {
	let error = Object.keys(errors).map(key => {
		return errors[key].message;
	});
	return {"error":error[0]};
}
var mongoose = require('mongoose');
var Author = mongoose.model('Author');
module.exports = {
	show: function(request, response) {
		let query_object = {};
		if (request.params.id) {
			query_object = {_id:request.params.id};
		} 
		Author.find(query_object)
			.then(function(author) {
				response.json(author);
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
	},
	create: function(request, response) {
		var author = new Author({first_name:request.body.first_name,
								 last_name:request.body.last_name,
								 country:request.body.country,
								 birthdate:request.body.birthdate});
		author.save()
			.then(function() {
//				console.log("created");
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
		response.redirect('/authors/');
	},
	update: function(request, response) {
		console.log("updating",request.body);
		Author.findOne({_id:request.params.id})
			.then(function(author) {
				if (request.body.book) {
					author.books.push(request.body.book);
				}
				if (request.body.first_name) {
					author.first_name = request.body.first_name;
				}
				if (request.body.last_name) {
					author.last_name = request.body.last_name;
				}
				if (request.body.country) {
					author.country = request.body.country;
				}
				if (request.body.birthdate) {
					author.birthdate = request.body.birthday;
				}
				author.save()
					.then(function() {
//						console.log("updated", request.params.id);
					})
					.catch(function(error) {
						response.json(prettifyErrors(error.errors));
					})
			})
			.catch(function(error) {
				console.log("update error finding -", prettifyErrors(error.errors));
				response.json(prettifyErrors(error.errors));
			})
		response.redirect(`/authors/${request.params.id}`);
	},
	deleteAuthor: function(request, response) {
		Author.remove({_id:request.params.id})
			.then(function() {
//				console.log("deleted", request.params.id);
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
			response.redirect('/authors/');
	},
	deleteBook: function(request, response) {	
		console.log("delete book", request.params.id);
		Author.update({ },
					  { $pull: { books: { _id: request.params.id } } },
					  { multi: true })
			.then(function(author) {
//				console.log(author);
			})
			.catch(function(error) {
				response.json(prettifyErrors(error.errors));
			})
		response.redirect('/authors/');
	}
}