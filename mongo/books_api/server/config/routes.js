// here we load the Book controller
var book = require('../controllers/book.js');
module.exports = function(app) {
	// root route to display all authors or just one if optional id param supplied
	app.get("/authors/:id?/", function (request, response, next) {
		book.show(request, response);
	})
	// route to insert author
	app.post("/authors/", function (request, response, next) {
		book.create(request, response);
	})
	// route to update author. new book can be included {"book":{"title":"title","year":"year"}}
	app.put("/authors/:id/", function (request, response, next) {
		book.update(request, response);
	})
	// route to delete author by id
	app.delete("/authors/:id/", function (request, response, next) {
		book.deleteAuthor(request, response);
	})
	// route to delete book from author. id is the id of the book
	app.delete("/books/:id/", function (request, response, next) {
		book.deleteBook(request, response);
	})
}