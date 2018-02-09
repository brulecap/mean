// here we load the Quote model that we created on the server.js page
var double_nickle_people = require('../controllers/double_nickle_people.js');
module.exports = function(app) {
	// root route to display all double nickle people or just one if optional name param supplied
	app.get("/:name?/", function (request, response) {
		double_nickle_people.show(request, response);
	})
	// route to insert double nickle person(:name)
	app.get("/new/:name/", function (request, response) {
		double_nickle_people.create(request, response);
	})
	// route to delete double nickle person(:name)
	app.get("/remove/:name/", function (request, response) {
		double_nickle_people.delete(request, response);
	})
}