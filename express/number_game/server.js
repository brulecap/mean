// Load the express module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// require body-parser used to look at POST data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// require express-session used for number to guess. and then set secret key
var session = require('express-session');
app.use(session({secret: '!10CoyRDownStr'}));
// setup static directory.
app.use(express.static(__dirname + "/static"));
// route to handle post from index.html
// ****** No route is needed. Defaults to index.html in static folder. ******
// route to handle post containing guess. Check high/low/equal
// and respond accordingly.
app.post('/guess', function (req, res) {
	if (!req.session.number) {
		// Generate number between 1 and 100 inclusive to guess.
		req.session.number = Math.ceil(Math.random()*100);
	}
	console.log(req.session.number);
	console.log("POST DATA \n\n", parseInt(req.body.guess));
	let guess = parseInt(req.body.guess);
	let result = "Too low!";
	let result_value = "incorrect";
	if (req.session.number === guess) {
		result = `${req.body.guess} was the number`;
		result_value = "correct";
	} else if (req.session.number < guess) {
		result = 'Too high!';
	}
	res.send({'result':result, 'result_value':result_value});
});
app.get('/reset', function (req, res) {
	if (req.session.number) {
		req.session.number = null;
	}
	res.redirect('/');
});
// Tell the express app to listen on port 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
});