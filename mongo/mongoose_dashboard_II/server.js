// Load the express module
var express = require("express");
// Load path
var path = require("path");
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
// set the static file location
app.use(express.static(path.join(__dirname, "./client/static")));
// set the location for the ejs views
app.set('views', path.join(__dirname, './client/views')); 
// set the view engine
app.set('view engine', 'ejs');
// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// store the routes function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the routes function stored in routes_setter and pass it the "app" variable
routes_setter(app);
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
	console.log("listening");
});