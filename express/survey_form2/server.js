// Load the express module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
app.use(express.static(__dirname + "/static"));
// root route to render the index.html file
// Use express default to render index.html

// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Client/socket id is: ", socket.id);
  socket.on( "posting_form", function (data){
    console.log(data.location);
    let message = `{name: '${data.name}', location: '${data.location}', language: '${data.language}', comment: '${data.comment}'}`
    socket.emit('updated_message', {response:`You emitted the following information to the server: ${message}`});
    socket.emit('random_number', {response:Math.ceil(Math.random()*1000)});
	})
})