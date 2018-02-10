// here we load the Quote model that we created on the server.js page
var task = require('../controllers/task.js');
module.exports = function(app) {
	// root route to display all tasks or just one if optional id param supplied
	app.get("/tasks/:id?/", function (request, response) {
		task.show(request, response);
	})
	// route to insert task
	app.post("/tasks/", function (request, response) {
		console.log("add",request.body, request.method);
		task.create(request, response);
	})
	// route to update task
	app.put("/tasks/:id/", function (request, response) {
		task.update(request, response);
	})
	// route to delete double nickle person(:name)
	app.delete("/tasks/:id/", function (request, response) {
		task.delete(request, response);
	})
}