// require mongoose
var mongoose = require('mongoose');
// require bcrypt for passwords
let bcrypt = require('bcrypt-as-promised');
// setup mongoose double_nickle_people schema and collection
var UserSchema = new mongoose.Schema({
	first_name:	{ type: String,
				  required: [true, "First name is required."],
				  minlength: [3, "First name must be at least 3 characters."],
				  trim: true},
	last_name:	{ type: String,
				  required: [true, "Last name is required."],
				  minlength: [3, "Last name must be at least 3 characters."],
				  trim: true},
	email:		{ type: String,
				  required: [true, "Email is required."],
				  unique: true,
				  trim: true},
	birthday:	{ type: Date,
				  required: [true, "Birthday is required."]},
	password:	{ type: String,
				  required: [true, "Password is required."]}
				},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
UserSchema.pre('save', function(done) {
	console.log("pre",this);
	let user = this;
	bcrypt.hash(user.password, 10)
		.then(function(hashed_password) {
			user.password = hashed_password;
			console.log("bcrypt then", user.password);
			done();
		})
		.catch(function(error) {
			console.log("bcrypt error", error);
		});

});
UserSchema.virtual('confirm')
	.get(function() {
		return this._confirm;
})
	.set(function(value) {
		this._confirm = value;
});
UserSchema.path('password').validate(function(v) {
	if (this.password || this.confirm) {
		if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(this.password))) {
			this.invalidate('password', 'Password failed validation, you must have at least 1 number, 1 uppercase and 1 special character');
		}
		if (this.password !== this._confirm) {
			this.invalidate('confirm', 'Password must match confirmation password.');
		}
	}
})
UserSchema.path('email').validate(function(v) {
	if (this.email) {
		if (!(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(this.email))) {
			this.invalidate('email', 'Email is not properly formatted');
		}
	}
})
mongoose.model('User', UserSchema);