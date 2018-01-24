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
// Declare users
let users = {};
// Maximum number messages to store
const max_messages = 20;
// Declare messages array
// This will contain the last max_messages messages
let messages = [];
// root route to render the index.ejs file
app.get("/", function (request, response){
	response.render('index', {host:request.protocol + '://' + request.get('host')});
})
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
});
var io = require('socket.io').listen(server);
io.sockets.on("connection", function (socket) {
	socket.on( "got_a_new_user", function (data){
		console.log("new user", data);
		// Add user to users object. We will use socket id to uniquely identify each user.
		// This is a stand in for a database connection.
		users[socket.id] = data.name;
		// Need to update new user with all current users.
		socket.emit('new_user', {users:users});
		// Need to update user on current messages
		console.log("new user", messages)
		socket.emit('new_message', {messages:messages});
		// Let user know their id.
		socket.emit('user_id', {id:socket.id});
		// Update all other users with just the new user.
		var temp_user = {};
		temp_user[socket.id] = data.name;
		socket.broadcast.emit( 'new_user', {users:temp_user});
	})
	socket.on("disconnect", function (data) {
		socket.broadcast.emit( 'remove_user', {id:socket.id});
		delete users[socket.id];
	})
	socket.on("send_message", function (data) {
		if (messages.length > max_messages) {
			// FIFO list. Take first on off the list.
			messages.shift();
		}
		messages.push({name:users[socket.id], message:data.message});
		io.emit( 'new_message', {messages:[{name:users[socket.id], message:data.message}]});
	})
})