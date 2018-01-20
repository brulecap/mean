$(document).ready(function(){
	$('#guess').submit(function() {
		if ($("#number").val()!= "") {
			// Create promise
			let p = new Promise((resolve, reject) => {
				let data = $.post( "/guess", {"guess":$("#number").val()})
				// Success
				.done(function( data ) {
					resolve(data);
				})
				// Fail
				.fail(function() {
					reject(Error("Something wrong happened."));
				});
			});
			// Successful promise.
			p.then(function(data) {
				console.log(data);
				// Remove all classes so we don't have both correct and incorrect 
				$("#guess_result").removeClass();
				$("#guess_result").addClass(data.result_value);
				$("#guess_result h2").text(data.result);
				if (data.result_value === "correct") {
					//Hide form
					$("#guess").addClass("hidden");
					// Display reset link
					$("#reset").removeClass();
				} 
			}, function(err) {
				console.log(`Received err ${err}`);
			});
		} else {
			alert("Please enter a guess");
		}
		return false;
	});
});