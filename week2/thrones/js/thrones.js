// Build a house object that contains a mapping from house id to house number
// We will access the house information from anapioficeandfire.com with the
// following url:
//		https://www.anapioficeandfire.com/api/houses/<house number>
// where house number is the mapping from house id to house number.
let houses = {"stark":362, "tagaryen":378, "lannister":229, "baratheon":15};
let url = "https://www.anapioficeandfire.com/api/houses/"
// Bind a click event to each house image.
$(".house").each(function(index) {
	$(this).bind('click', houseClicked);
});
function houseClicked() {
	// Create promise
	let p = new Promise((resolve, reject) => {
		let data = $.get(url + houses[$(this).attr('id')])
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
		$("#name").html(data.name);
		$("#words").html(data.words);
		let titles = "";
		for (let i=0;i<data.titles.length;i++) {
			titles += data.titles[i];
			if (i !== data.titles.length-1) {
				titles += ", ";
			}
		}
		$("#titles").html(titles);
	});
	// If promise failed
	p.catch(function() {
		console.log('failure');
	});
};