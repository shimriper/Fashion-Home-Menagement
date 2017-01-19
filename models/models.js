var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	text: String
})

var userSchema = new mongoose.Schema({
	//type_of_user: String,
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
})

// var brideSchema = new mongoose.Schema({
// 	name: String,
// 	last_name: String,
// 	date_event: Date,
// 	dress_type:{
// 		size:Float32Array,
// 		type_fabric:String
// 	}
// })

mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
//mongoose.model('BrideSchema' , brideSchema);