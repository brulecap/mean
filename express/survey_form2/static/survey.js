$(document). ready(function (){
	// this triggers the connection event in our server!
	var socket  = io.connect();
	console.log(socket);
	$('#submit_survey').click(function (){
		socket.emit("posting_form", {name:$('#name').val(),
									 location:$('#location').val(),
									 language:$('#language').val(),
									 comment:$('#comment').val()});
		return false;
	});
	socket.on('updated_message', function (data){
		$('#placeholder').html(`<p>${data.response}</p>`);
		$('#placeholder').css( "display", "block" );
	});
	socket.on('random_number', function (data){
		$('#placeholder').append( `<p>Your lucky number emitted by the server is ${data.response}.</p>` );
	});
})