// fs module allows us to read and write content for responses!!
var fs = require('fs');// Sends response to client.
// url to file mapping object
const urlMapping = {
		'/' : 'index.html',
		'/cars' : 'cars.html',
		'/cats' : 'cats.html',
		'/cars/new' : 'new_car.html'
}
// Directory structure constants
const cssDirectory = 'stylesheets';
const htmlDirectory = 'views';
const imageDirectory = 'images';
// Check and validate html file
function isValidHTML(splitFileName, splitUrl){
	// Check file name extension html AND url is of the form "/fileName.html".
	// Note: splitUrl should be as follows: ['', htmlfilename]
	if ((splitFileName[1] === 'html') && (splitUrl[1] === (splitFileName[0]+'.'+splitFileName[1]))) {
		return true;
	}
	return false;
}
// Valid css file?
function isValidCSS(splitFileName, splitUrl){
	// Check file name extension css AND url is of the form "/cssDirectory/fileName.css".
	// Note: splitUrl should be as follows: ['', cssDirectory, cssFileName]
	if ((splitFileName[1] === 'css') && (splitUrl[1] === cssDirectory) && (splitUrl[2] === (splitFileName[0]+'.'+splitFileName[1]))) {
		return true;
	}
	return false;
}
// Valid image file?
function isValidImage(splitFileName, splitUrl){
	// Check url is of the form "/imageDirectory/imagename".
	// Note: splitUrl should be as follows: ['', cssDirectory, cssFileName]. Image extension
	// will be checked in getImageMimeType.
	if ((splitUrl[1] === imageDirectory) && (splitUrl[2] === (splitFileName[0]+'.'+splitFileName[1]))) {
		return true;
	}
	return false;
}

// Gets mime type of an image file.
// Parameters:
//	ext: The file extension... jpg, jpeg, png, ...
function getImageMimeType(ext) {
	switch (ext) {
		case 'png':
			return "image/png";
		case 'gif':
			return "image/gif";
		case 'svg':
			return "image/svg+xml";
		case 'jpg':
		case 'jpeg':
			return "image/jpeg"
		default: 
        	return false;
	}
}
// Parameters:
//	response: response object
//	fileName: path and name of file.
//	mimeType: You guessed it... mime type of file being sent.
//	encoding: character encoding of file being sent. Defaults to empty string
//			  which seems to work for image files and others(?)
function sendResponse(response, fileName, mimeType, encoding="") {
	fs.readFile(fileName, encoding, function (errors, contents) {
		if (!errors) {
			response.writeHead(200, {'Content-Type': mimeType});
			response.write(contents);
			response.end();
		} else {
			// Error occurred. Could extract code and send appropriate response.
			// For now assume it is a 404.
			console.log(errors.message);
			response.writeHead(404);
			response.end('File not found!!!');
		}
	});
}

module.exports = function (request, response){
	console.log('client request URL: ', request.url);
	if (urlMapping[request.url]) {
		// Found mapping. Serve file
		console.log(urlMapping[request.url]);
		sendResponse(response, 'views/' + urlMapping[request.url], 'text/html', 'utf8');
	} else {
		// Mapping didn't exist. Assume request is for a file.
		// We will enforce strict directory structure for css
		// and image files. They must be in the stylesheets and
		// images directories respectively. i.e. request.url
		// must be of the form /stylesheetsdirectory/stylesheet
		// We will allow html files in views directory to be
		// accessed via base url, i.e. /htmlFile.html, but that html
		// file must be in the views directory.
		// Split url on /
		let splitUrl = request.url.split('/');
		let splitFileName = splitUrl[splitUrl.length-1].split('.');
		if (isValidHTML(splitFileName, splitUrl)) {
				sendResponse(response, htmlDirectory + '/' + splitUrl[1], 'text/html', 'utf8');
		} else if (isValidCSS(splitFileName, splitUrl)) {
				sendResponse(response, splitUrl[1] + "/" + splitUrl[2], 'text/css', 'utf8');
		} else if (isValidImage(splitFileName, splitUrl) && getImageMimeType(splitFileName[1])) {
				sendResponse(response, splitUrl[1] + "/" + splitUrl[2], getImageMimeType(splitFileName[1]));
		} else {
			console.log("Error processing " + request.url);
			response.writeHead(404);
			response.end('File not found!!!');
		}
	}
};