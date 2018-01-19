// Load the express module (Where do you think this comes from?)
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// require body-parser used to look at POST data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// require express-session for counter
var session = require('express-session');
app.use(session({secret: 'codingdojorocks'}));
// setting up ejs and our views folder
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
// root route to render the index.ejs view
app.get('/', function(req, res) {
	if (!req.session.counter) {
		req.session.counter = 0;
	}
	console.log(req.session.counter);
	req.session.counter += 1;
	res.render("index", { counter : req.session.counter});
})
app.post('/', function (req, res){
	console.log("POST DATA \n\n", req.body)
	if (!req.session.counter) {
		req.session.counter = 0;
	}
	if (req.body.action === "plusPlus") {
		req.session.counter += 1; // Second increment will happen on the redirect
	} else if (req.body.action === "reset") {
		req.session.counter = 0; 
	}
	res.redirect('/');
})
// Tell the express app to listen on port 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
})