/*
	Takes a mongoos error object and creates an array of error messages
	Returns an object with following format:
		{errors:[error_string]}
*/
function prettifyErrors(errors) {
	let error = Object.keys(errors).map(key => {
		return errors[key].message;
	});
	return {"errors":error};
}
var mongoose = require('mongoose');
var User = mongoose.model('User');
// require bcrypt for passwords
let bcrypt = require('bcrypt-as-promised');
module.exports = {
	login(request, response) {
 		User.findOne({ email: request.body.email })
			.then(user => {
				if (!user) {
					throw new Error();
				}
				bcrypt.compare(request.body.password, user.password)
					.then(function() {
						response.json({status:"OK"});
					})
					.catch(function(error) {
						response.json({errors:["Email/Password combination not found."]});
					})
			})
			.catch(error => {
				response.json({errors:["Email/Password combination not found."]});
			});
	},
	register: function(request, response) {
		console.log("register", request.body);
		User.create(request.body)
			.then(user => {
				response.json({status:"OK"});
			})
			.catch(error => {
				console.log
				response.json(prettifyErrors(error.errors));
			});
	}
}