// Load the express module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// get body parser and use it
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// install mongoose and connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// setup mongoose quote schema and quote collection
var QuoteSchema = new mongoose.Schema({
    name:  { type: String,
    		 required: [true, "Name is required and must have at least 3 characters"],
    		 minlength: 3,
    		 trim: true},
    quote: { type: String,
    		 required: [true, "Quote is required and must have at least 3 characters"],
    		 minlength: 3,
    		 trim: true}
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');
// set the location for the ejs views
app.set('views', __dirname + '/views'); 
// set the view engine
app.set('view engine', 'ejs');
// set the static file location
app.use(express.static(__dirname + "/static"));
function format_date_time(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	const month_names = ["January", "February", "March", "April", "May", "June",
					  "July", "August", "September", "October", "November", "December"];
	return str_time + " " + month_names[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
}
function prettifyErrors(errors) {
return Object.keys(errors).map(key => {
		return errors[key].message;
	});	
}
// Set up is complete. Now handle the routes!
// root route to render the index.ejs file
app.get("/", function (request, response) {
	response.render('index');
})
// Handles adding new quote.
app.post("/quotes", function (request, response){
	console.log("body", request.body);
	var quote = new Quote({name: request.body.name, quote: request.body.quote});
	quote.save()
		.then(function() {
			console.log('successfully added a quote!');
			response.redirect('/quotes');
		})
		.catch(function(error) {
			const errors = prettifyErrors(error.errors);
			console.log(errors);
			response.render('index', {errors:errors});
		})
})
// Displays all quotes
app.get("/quotes", function (request, response) {
	Quote.find({})
		.then(function(quotes) {
			console.log("here", quotes);
//			response.send(quotes);
			response.render('quotes', {quotes:quotes})
		})
		.catch(function(error) {
			const errors = prettifyErrors(error.errors);
			console.log(errors);
			response.send(errors);
//			response.render('index', {errors:errors});
		})
})

// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
	console.log("listening");
});