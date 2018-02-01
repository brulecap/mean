// Load the express module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// Load sessions used to handle error messages.
var session = require('express-session');
app.use(session({secret: 'D0Imaed8ad2ppw',
				 resave: true,
    			 saveUninitialized: true}));
// get body parser and use it
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// install mongoose and connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// setup mongoose quote schema and quote collection
var BearSchema = new mongoose.Schema({
    name:  { type: String,
    		 required: [true, "Name is required."],
    		 minlength: [3, "Name must be at least 3 characters."],
    		 trim: true},
    favorite_foods: [{ type: String,
    		 required: [true, "At least one favorite food is required."],
    		 minlength: [3, "Each favorite food must be at least 3 characters."],
    		 trim: true}]
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
mongoose.model('Bear', BearSchema);
var Bear = mongoose.model('Bear');
// set the location for the ejs views
app.set('views', __dirname + '/views'); 
// set the view engine
app.set('view engine', 'ejs');
// set the static file location
app.use(express.static(__dirname + "/static"));
function prettifyErrors(errors) {
return Object.keys(errors).map(key => {
		return errors[key].message;
	});	
}
// Set up is complete. Now handle the routes!
// root route to render the index.ejs file
app.get("/", function (request, response) {
	Bear.find({})
		.then(function(bears) {
			console.log("here", bears);
			response.render('index', {bears:bears})
		})
		.catch(function(error) {
			console.log('index -', prettifyErrors(error.errors));
			response.redirect('/error');
		})
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
	var bear = new Bear({name:request.body.name,favorite_foods:request.body.favorite_foods.split(',')});
	bear.save()
		.then(function() {
			response.redirect('/');
		})
		.catch(function(error) {
			request.session.err = {errors:prettifyErrors(error.errors)};
			response.redirect('/bears/new');
		})
})
// Handles post from edit page
app.post("/bears/:id", function (request, response){
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
})

// Displays edit page
app.get("/bears/edit/:id", function (request, response) {
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
})

// Delete bear
app.post("/bears/destroy/:id", function (request, response) {
	Bear.findByIdAndRemove(request.params.id)
		.then(function() {
			console.log("deleted bear");
			response.redirect('/');
		})
		.catch(function(error) {
			console.log("delete -", prettifyErrors(error.errors));
			response.render('edit', {errors:errors});
		})
})
app.post("/error", function (request, response) {
	response.render('error');
})
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
	console.log("listening");
});