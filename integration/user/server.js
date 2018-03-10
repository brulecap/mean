const port = process.env.PORT || 8000;
// Load the express module
const express = require("express");
// Load path
const path = require("path");
// invoke var express and store the resulting application in var app
const app = express();
const logger = require('morgan');
app.use(logger('dev'));
app.use(express.static(__dirname + '/dist'));
// setup sessions
const session = require('express-session');
app.use(session({saveUninitialized: true,
				  secret: 'D0Imaed8ad2ppw',
				  resave: false,
				  name: 'session',
				  rolling: true,
				  cookie: {
					secure: false,
					httpOnly: false,
					maxAge: 360000
					}
				}));
// setp cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser('D0aqxxLM3!'));
// get body parser and use it
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// store the routes function in a variable
const routes_setter = require('./server/config/routes.js');
// invoke the routes function stored in routes_setter and pass it the "app" variable
routes_setter(app);
// Start Node server listening on port 8000.
const server = app.listen(port, function() {
	console.log(`listening on ${port}`);
});