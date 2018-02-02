// Load the express module
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();
// setup sessions used in error reporting
var session = require('express-session');
app.use(session({secret: 'D0Imaed8ad2ppw',
				 resave: true,
    			 saveUninitialized: true}));
// get body parser and use it
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// install mongoose and connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// setup mongoose schemas
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
    name:  { type: String,
    		 required: [true, "Name is required."],
    		 minlength: [4, "Name must be at least 4 characters."],
    		 trim: true},
    message: { type: String,
    		   required: [true, "Message is required"],
    		   minlength: [4, "Message must be at least 4 characters."],
    		   trim: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
// setup mongoose comment schema
var CommentSchema = new mongoose.Schema({
	_message: {type: Schema.Types.ObjectId, ref: 'Message'},
    name:  { type: String,
    		 required: [true, "Name is required."],
    		 minlength: [4, "Name must be at least 4 characters."],
    		 trim: true},
    comment: { type: String,
    		   required: [true, "Comment is required"],
    		   minlength: [4, "Comment must be at least 4 characters."],
    		   trim: true}
	},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');
// set the location for the ejs views
app.set('views', __dirname + '/views'); 
// set the view engine
app.set('view engine', 'ejs');
// set the static file location
app.use(express.static(__dirname + "/static"));
// Make error messages more "pretty"
function prettifyErrors(errors) {
	return Object.keys(errors).map(key => {
		return errors[key].message;
	});	
}
// Set up is complete. Now handle the routes!
// root route to render the index.ejs file
app.get("/", function (request, response) {
	var errors;
	if (request.session.err) {
		errors = request.session.err;
		request.session.err = null;
	}
	Message.find({})
		.populate('comments')
		.exec()
		.then(function(messages) {
			response.render('index',{errors, messages:messages});
		})
		.catch(function(error) {
			console.log(error);
			response.redirect('/error');
		})

})
// Handles new messages
app.post("/message", function (request, response){
	var message = new Message({name:request.body.name,message:request.body.message});
	message.save()
		.then(function() {
			response.redirect('/');
		})
		.catch(function(error) {
			request.session.err = {message_err:prettifyErrors(error.errors)};
			response.redirect('/');
		})
})
// Handles new comment post
app.post("/comment/:id", function (request, response){
    Message.findOne({_id:request.params.id})
    	.then(function(message) {
        	var comment = new Comment(request.body);
        	comment._message = message._id;
        	comment.save()
        		.then(function() {
					message.comments.push(comment);
					message.save()
						.then(function() {
							response.redirect('/');
						})
				})
		.catch(function(error) {
			request.session.err = {comment_err:{id:request.params.id,errors:prettifyErrors(error.errors)}};
			response.redirect('/');
		})
    })
})
app.get("/error", function (request, response) {
	response.render('error');
})
// Start Node server listening on port 8000.
var server = app.listen(8000, function() {
	console.log("listening");
});