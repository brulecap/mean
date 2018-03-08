// Load the express module
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/dist'));
// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json({extended: true}));
// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// store the routes function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the routes function stored in routes_setter and pass it the "app" variable
routes_setter(app);
// Tell the express app to listen on port 8000
app.listen(8000, function() {
	console.log("listening on port 8000 now");
})