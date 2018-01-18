// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// Gets mime type of an image file.
// Parameters:
//	ext: The file extension... jpg, jpeg, png, ...
// To do:
//	Add other types if this function is used in other places. 
function getImageMimeType(ext) {
	if (ext === 'png') {
		return "image/png";
	} else if ((ext === 'jpg') || (ext === 'jpeg')) {
		return "image/jpeg"
	}
}
// Sends response to client.
// Parameters:
//	response: response object
//	fileName: path and name of file.
//	mimeType: You guessed it... mime type of file being sent.
//	encoding: character encoding of file being sent. Defaults to empty string
//			  which seems to work for image files and others(?)
function sendResponse(response, fileName, mimeType, encoding="") {
	fs.readFile(fileName, encoding, function (errors, contents) {
		response.writeHead(200, {'Content-Type': mimeType});  // send data about response
		response.write(contents);  //  send response body
		response.end(); // finished!
	});

}
// creating a server using http module:
var server = http.createServer(function (request, response){
	// see what URL the clients are requesting:
	console.log('client request URL: ', request.url);
	// Check request url
	if (request.url === '/cars') {
		sendResponse(response, 'views/cars.html', 'text/html', 'utf8');
	} else if (request.url === '/cats') {
		sendResponse(response, 'views/cats.html', 'text/html', 'utf8');
	} else if (request.url === '/cars/new') {
		sendResponse(response, 'views/new_car.html', 'text/html', 'utf8');
	} else {
		// Split url on /
		splitUrl = request.url.split('/')
		if (splitUrl[1] === "images") {
			// url is for the images directory
			// Try to serve any file requested. Need to make more bullet proof.
			sendResponse(response, splitUrl[1] + "/" + splitUrl[2], getImageMimeType(splitUrl[2].split('.')[1]));
		} else if (splitUrl[1] === "stylesheets") {
			// url is for the stylesheets directory
			// Try to serve any file requested. Need to make more bullet proof.
			sendResponse(response, splitUrl[1] + "/" + splitUrl[2], 'text/css', 'utf8');
		} else {
			// request didn't match anything:
			response.writeHead(404);
			response.end('File not found!!!');
		}
	}
});
// tell your server which port to run on
server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");