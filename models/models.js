

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

var brideSchema = new mongoose.Schema({	
	created_at: {type: Date, default: Date.now},
	b_id: {type:Number,require: true},
	first_name: {
		type:String,
		require: true
		},
	last_name: {
		type:String,
		require: true
		},
	email: {
		type:String,
		require: true
		},
	phone1: {
		type:Number,
		require: true
		},
	phone2: Number,
	adress: String,

	date_event: {
		type:Date,
		require: true
		},
	dress_type:{
		type:String,
		require: true
		},
	dress_type2:String,
	day_service:{
		type:Boolean,
		require: true
		},
	price: Number,
	remark: String,
	payments:[{type: Schema.Types.ObjectId, ref: 'Payment'}]
})

var paymentSchema = new mongoose.Schema({
	bride:{type: Schema.Types.ObjectId, ref: 'Bride'},
	pay:Number,
	date_pay: {type:Date},
	done:Boolean
})


mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
mongoose.model('Bride', brideSchema);
mongoose.model('Payment', paymentSchema);

