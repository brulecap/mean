$(document). ready(function () {
	// this triggers the connection event in our server!
	var socket  = io.connect();
	// Need to be connected to receive data from server.
	// Connected in this sense mean we have "logged" in to the system, not
	// made a connection... Make sense?
	let connected = false;
	console.log(socket);
	$(document).on('click', '#submit_form', function() {
		if ($('#name').val().length < 3) {
			alert("Name must have more than 2 characters");
		} else {
			socket.emit("got_a_new_user", {name:$('#name').val()});
			connected = true;
		}
		return false;
	});
	$('#users button').click(function () {
		socket.disconnect();
		connected = false;
		// Display form
		if (!$('#users').hasClass("hidden")) {
			$('#users').addClass("hidden");
		}
		if (!$('#message_placeholder').hasClass("hidden")) {
			$('#message_placeholder').addClass("hidden");
		}
		if ($('#name_form').hasClass("hidden")) {
			$('#name_form').removeClass("hidden").filter('[class=""]').removeAttr('class');
		}
		// Remove all divs under users div
		$("#users div").remove();
		// I could not get the socket to reconnect after it had been disconnected.
		// Probably a crappy solution, but refreshing the page works!
		window.location.reload();
		return false;
	});
	$(document).on('click', '#message', function() {
		socket.emit("send_message", {message:$('#message_form textarea').val()});
		$('#message_form textarea').val('');
		return false;
	});
	socket.on('new_user', function (data) {
		if (connected) {
			// Display users div
			if ($('#users').hasClass("hidden")) {
				$('#users').removeClass("hidden").filter('[class=""]').removeAttr('class');
			}
			if ($('#message_placeholder').hasClass("hidden")) {
				$('#message_placeholder').removeClass("hidden").filter('[class=""]').removeAttr('class');
			}
			if (!$('#name_form').hasClass("hidden")) {
				$('#name_form').addClass("hidden");
			}
			for (var key in data.users) {
				$( "#users" ).append(`<div id="${key}" class="user others"><h4>${data.users[key]}</h4></div>`);
			}
		}
	});
	socket.on('remove_user', function (data) {
		$('#'+data.id).remove();
	});
	socket.on('user_id', function (data) {
		// Highlight your user div
		$('#'+data.id).removeClass("others");
		$('#'+data.id).addClass("me");
		$('#'+data.id+' p').remove();
		$('#'+data.id).append('<form id="message_form" action="/" method="post"><textarea name="message" placeholder="Enter message..."></textarea><input id="message" class="btn btn-primary" type="submit" value="Send"></form>');
		$('#users').prepend($('#'+data.id));
	});
	socket.on('new_message', function (data) {
		if (connected) {
			for (let i=0;i<data.messages.length;i++) {
				$("#message_placeholder div").prepend(`<p>${data.messages[i].name} says: ${data.messages[i].message}`);
			}
		}
	});
	socket.on('disconnect', function(){
		console.log("Disconnected");
	});
})
