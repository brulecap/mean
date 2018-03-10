// require mongoose
var mongoose = require('mongoose');
// require bcrypt for passwords
let bcrypt = require('bcrypt-as-promised');
// setup mongoose user schema
var UserSchema = new mongoose.Schema({
	email:		{ type: String,
				  required: [true, "Email is required."],
				  unique: true,
				  trim: true},
	password:	{ type: String,
				  required: [true, "Password is required."]}
				},{
	timestamps: { createdAt: 'created_at',
				  updatedAt: 'updated_at'}
});
// Before saving encrypt password
UserSchema.pre('save', function(done) {
	let user = this;
	bcrypt.hash(user.password, 10)
		.then(function(hashed_password) {
			user.password = hashed_password;
			done();
		})
		.catch(function(error) {
			console.log("bcrypt error", error);
		});

});
// Define virtual schema confirm property to use in comparing the password and confirm passwword
UserSchema.virtual('confirm')
	.get(function() {
		return this._confirm;
})
	.set(function(value) {
		this._confirm = value;
});
// Validate password --- Both for format and passwords match
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
// Validate format of email
UserSchema.path('email').validate(function(v) {
	if (this.email) {
		if (!(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(this.email))) {
			this.invalidate('email', 'Email is not properly formatted');
		}
	}
})
mongoose.model('User', UserSchema);