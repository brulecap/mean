// Load the express module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// set the location for the ejs views
app.set('views', __dirname + '/views'); 
// set the view engine
app.set('view engine', 'ejs');
// set the static file location
app.use(express.static(__dirname + "/static"));
// Declare counter
var count;
// root route to render the index.ejs file
app.get("/", function (request, response){
	response.render('index', {count:count});
})
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
	count = 0;
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	socket.on( "update_count", function (data){
		count += 1;
		io.emit( 'count_updated', {response:count});
	})
	socket.on( "reset", function (data){
		count = 0;
		io.emit( 'count_updated', {response:count});
	})
})