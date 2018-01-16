function create_content_html(res) {
	var html_str = `<h2>${res.name}</h2><img src="${res.sprites.front_default}"  alt="${res.name}">`;
	var type_str = "<h3>Types</h3><ul>";
	for (var j=0; j<res.types.length; j++) {
		type_str += `<li>${res.types[j].type.name}</li>`;
	}
	type_str += "</ul>";
	html_str += `${type_str}<h3>Weight</h3><p>${res.weight}</p><h3>Height</h3><p>${res.height}</p>`;
	return html_str;
}

$(document).ready(function(){
	let pokeURL2 = "https://pokeapi.co/api/v2/pokemon/";
	const number_pokemon = 718; //Doing 151 caused problems outlined below. Seems good with 50.

	for (var index=1; index<=number_pokemon; index++) {
		var sprite_img = `<img id="${index}" src="images/sprites/${index}.png" alt="index">`;
		$("#sprites").append(sprite_img);
	};

	$("#sprites").on("click", "img", function() {

		// Create promise
		let p = new Promise((resolve, reject) => {
			let data = $.get(pokeURL2 + $(this).attr("id") + "/")
			// Success
			.done(function( data ) {
				resolve(data);
			})
			// Fail
			.fail(function() {
			reject();
			});
		});
		// Successful promise.
		p.then(function(data) {
			console.log(data.id);
			$(".selected").removeClass("selected");
			$("#content").removeClass("hidden");
			$("#content").addClass("display");
			$("#content").html(create_content_html(data));
			$("#"+data.id).addClass("selected");
		});
		// If promise failed
		p.catch(function() {
			console.log('failure');
		});
	});
});