// here we load the Quote model that we created on the server.js page
var bears = require('../controllers/bears.js');
module.exports = function(app) {
	// root route to render the index.ejs file
	app.get("/", function (request, response) {
		console.log("get quotes");
		bears.show(request, response);
	})
	// Displays new bears form
	app.get("/bears/new", function (request, response) {
		var errors;
		if (request.session.err) {
			errors = request.session.err;
			request.session.err = null;
		}
		response.render('add', errors);
	})
	// Handles post from /bears/new and adds new bear
	app.post("/bears", function (request, response){
		console.log("create body", request.body);
		bears.create(request, response);
	})
	// Handles post from edit page
	app.post("/bears/:id", function (request, response){
		console.log("save edit");
		bears.edit_save(request, response);
	})
	// Displays edit page
	app.get("/bears/edit/:id", function (request, response) {
		console.log("display edit");
		bears.edit_display(request, response);
	})
	// Delete bear
	app.post("/bears/destroy/:id", function (request, response) {
		console.log("delete");
		bears.delete(request, response);
	})
	// Display error page
	app.post("/error", function (request, response) {
		response.render('error');
	})
}