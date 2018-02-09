function prettifyErrors(errors) {
return Object.keys(errors).map(key => {
		return errors[key].message;
	});	
}
var mongoose = require('mongoose');
var Bear = mongoose.model('Bear');
module.exports = {
	show: function(request, response) {
		Bear.find({})
			.then(function(bears) {
				console.log("here", bears);
				response.render('index', {bears:bears})
			})
			.catch(function(error) {
				console.log('index -', prettifyErrors(error.errors));
				response.redirect('/error');
			})
	},
	create: function(request, response) {		
		var bear = new Bear({name:request.body.name,favorite_foods:request.body.favorite_foods.split(',')});
		bear.save()
			.then(function() {
				response.redirect('/');
			})
			.catch(function(error) {
				request.session.err = {errors:prettifyErrors(error.errors)};
				response.redirect('/bears/new');
			})
	},
	edit_save: function(request, response) {		
		Bear.findOne({_id:request.params.id})
			.then(function(bear) {
				bear.name = request.body.name;
				bear.favorite_foods = request.body.favorite_foods.split(',');
				bear.save()
					.then(function() {
						response.redirect('/');
					})
					.catch(function(error) {
						request.session.err = prettifyErrors(error.errors);
						response.redirect('/bears/edit/'+request.params.id);
					})
				})
			.catch(function(error) {
				console.log("edit error finding -", prettifyErrors(error.errors));
				response.redirect('/error');
			})
	},
	edit_display: function(request, response) {		
		var errors;
		if (request.session.err) {
			errors = request.session.err;
			request.session.err = null;
		}
		Bear.findOne({_id:request.params.id})
			.then(function(bear) {
				console.log("edit", bear);
				response.render('edit', {bear:bear,errors:errors});
			})
			.catch(function(error) {
				const errors = prettifyErrors(error.errors);
				console.log(error.errors);
				response.render('edit', {errors:errors});
			})
	},
	delete: function(request, response) {		
		Bear.findByIdAndRemove(request.params.id)
			.then(function() {
				console.log("deleted bear");
				response.redirect('/');
			})
			.catch(function(error) {
				console.log("delete -", prettifyErrors(error.errors));
				response.render('edit', {errors:errors});
			})
	}
}