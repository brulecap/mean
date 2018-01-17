function displayMessage() {
	let message = "";
	if (localStorage.getItem("lastLocation") === null) {
		message = "Welcome! I hope you find this weather API useful.";
	} else if (localStorage.getItem("lastLocation") === '') {
		message = "Congradulations on your first successful search!";
	} else {
		message = `Last search: ${localStorage.getItem("lastLocation")}`;
	}
	$("#message").text(message);
}

$(document).ready(function(){
	let base_url = "http://api.openweathermap.org/data/2.5/weather?units=imperial";
	let api_key = "&appid=6dc2cc8059d26537c82de1951003f2f8";
	let city_prefix = "&q=";
	localStorage.removeItem("lastLocation");
	displayMessage();
	$('form').submit(function() {
		if ($("#location").val()!= "") {
			// Create promise
			let p = new Promise((resolve, reject) => {
				let data = $.get(base_url+city_prefix+$("#location").val()+api_key)
				// Success
				.done(function( data ) {
					resolve(data);
				})
				// Fail
				.fail(function() {
					reject(Error(`${$("#location").val()} not found.`));
				});
			});
			// Successful promise.
			p.then(function(data) {
				if (localStorage.getItem("lastLocation") === null) {
					// Set lastLocation = "" so proper message displays on first success
					localStorage.setItem("lastLocation", "");
				}
				displayMessage();
				// Now update lastLocation
				localStorage.setItem("lastLocation", $("#location").val());
				var html_str = `<h2>${data.name}, ${data.sys.country}</h2><p>Temperature: ${data.main.temp}&#176; Fahrenheit</p>`;
				$("#content").html(html_str);
			}, function(err) {
				$("#content").html(`<p>${err}</p>`);
			});
		}
		return false;
	});
});