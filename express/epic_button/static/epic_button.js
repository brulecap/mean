$(document). ready(function (){
	// this triggers the connection event in our server!
	var socket  = io.connect();
	console.log(socket);
	$('button').click(function (){
		socket.emit("update_count");
		return false;
	});
	$('a').click(function (){
		socket.emit("reset");
		return false;
	});
	socket.on('count_updated', function (data){
		$('#count').text(data.response);
	});
})