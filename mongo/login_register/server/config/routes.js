var user = require('../controllers/user.js');
module.exports = function(app) {
	// root route to display registration page
	app.get("/", function (request, response) {
		if (!request.session.logged_in) { 
			user.register(request, response);
		} else {
			response.redirect("/success/");
		}
		
	})
	// route process registration
	app.post("/", function (request, response) {
		user.process_registration(request, response);
	})
	// login route
	app.get("/login", function (request, response) {
		if (!request.session.logged_in) {
			user.login(request,response);
		} else {
			response.redirect("/success/");
		}
	})
	// route process login request
	app.post("/login", function (request, response) {
		user.process_login(request, response);
	})
	// route to display login success page
	app.get("/success", function (request, response) {
		if (request.session.logged_in) {
			console.log("success",request.session.name);
			response.render("success", {name:request.session.name});
		} else {
			response.redirect("/login/");
		}
	})
	// logout route
	app.get("/logout", function (request, response) {
		request.session.destroy();
		response.redirect("/login/");
	})
}