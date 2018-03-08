const path = require('path');
// load the Task model
var notes = require('../controllers/notes.js');
module.exports = function(app) {
	app.get("/api/notes", function (request, response) {
		notes.getAll(request,response);
	})
	app.post('/api/notes', function(request,response){
		notes.create(request, response);
	})
	app.delete('/api/tasks/:id', function(request,response){
		notes.delete(request, response);
	})
	app.all("**", function(request, response) {
		response.sendFile(path.resolve("./dist/index.html"))
	});
}