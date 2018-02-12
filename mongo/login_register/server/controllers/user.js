function prettifyErrors(errors) {
	return Object.keys(errors).map(key => {
		return errors[key].message;
	});
}
var mongoose = require('mongoose');
var User = mongoose.model('User');
// require bcrypt for passwords
let bcrypt = require('bcrypt-as-promised');
module.exports = {
	register: function(request, response) {
		var errors;
		if (request.session.err) {
			errors = request.session.err;
			request.session.err = null;
		}
		response.render("register", errors);
	},
	process_registration: function(request, response) {
		var user = new User({first_name:request.body.first_name,
							 last_name:request.body.last_name,
							 email:request.body.email,
							 birthday:request.body.birthday,
							 password:request.body.password,
							 confirm:request.body.confirm});
		user.save()
			.then(function() {
				request.session.success = {success:"You successfully registered. Login below."};
				response.redirect('/login/');
			})
			.catch(function(error) {
				var errors;
				if (error.code === 11000) {
					errors = ["Email already associated with an account"];
				} else {
					errors = prettifyErrors(error.errors);
				}
				request.session.err = {errors:errors,
									   first_name:request.body.first_name,
									   last_name:request.body.last_name,
									   email:request.body.email,
									   birthday:request.body.birthday};
				response.redirect("/");
			});
	},
	login: function(request, response) {
		if ((typeof(request.session.logged_in) !== "undefined") && request.session.logged_in) {
			reponse.redirect("/success/");
		}
		var message;
		if (request.session.success) {
			message = request.session.success;
			request.session.success = null;
		}
		if (request.session.err) {
			message = request.session.err;
			request.session.err = null;
		}
		response.render("login", message);
	},
	process_login: function(request, response) {
		User.findOne({email:request.body.email})
			.then(function(user) {
				bcrypt.compare(request.body.password, user.password)
					.then(function() {
						request.session.logged_in = true;
						request.session.name = user.first_name;
						response.redirect("/success/");
					})
					.catch(function(error) {
						request.session.err = {errors:["Password is incorrect."]};
						response.redirect("/login/");
					})
			})
			.catch(function(error) {
				request.session.err = {errors:["No user with that email found."]};
				response.redirect("/login/");
			});
	},
}