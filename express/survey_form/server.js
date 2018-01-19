// Load the express module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// require body-parser used to look at POST data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// setting up ejs and our views folder
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// set the view engine to ejs.
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
// root route to render the index.html file
app.get('/', function(req, res) {
	res.sendFile('index.html');
})
// route to handle post from index.html
// This will render the results view
app.post('/result', function (req, res){
	console.log("POST DATA \n\n", req.body)
	res.render("result", { result : req.body});
})
// Tell the express app to listen on port 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
})