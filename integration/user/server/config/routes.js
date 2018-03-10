const path = require('path');
var user = require('../controllers/user.js');
module.exports = function(app) {
	// login route
	app.post("/api/auth/login", function (request, response) {
		user.login(request, response);
	})
	// register route
	app.post("/api/auth/register", function (request, response) {
		console.log("registering");
		user.register(request, response);
	})
	app.all("**", function(request, response) {
		response.sendFile(path.resolve("./dist/index.html"))
	});
}