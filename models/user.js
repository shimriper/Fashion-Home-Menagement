var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	//type_of_user: String,
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
})
module.exports = UserSchema;

