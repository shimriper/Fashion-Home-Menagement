

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	text: String
})

var userSchema = new mongoose.Schema({
	role: {type:Number,require: true},
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
	dresses:[{type: Schema.Types.ObjectId, ref: 'Dress'}],
	day_service:{
		type:String
		},
	price: Number,
	remark: String,
	payments:[{type: Schema.Types.ObjectId, ref: 'Payment'}],
	allPayments: Number,
	sizes:[{type:Schema.Types.ObjectId,ref:'Size'}],
	stages:[{type:Schema.Types.ObjectId,ref: 'Stage'}],
	status:String
})


// var meetingSchema = new mongoose.Schema({	
// 	created_at: {type: Date, default: Date.now},
// 	meet_id: {type:Number,require: true},
// 	first_name: {
// 		type:String,
// 		require: true
// 		},
// 	last_name: {
// 		type:String,
// 		require: true
// 		},
// 	arrival_date: {
// 		type:Date,
// 		require: true
// 		},
// 	phone1: {
// 		type:Number,
// 		require: true
// 		},
// 	date_event: {
// 		type:Date,
// 		require: true
// 		},
// 	arrived:{
// 		type:String,
// 		require: true
// 		},
// 	living_area:{
// 		type:String,
// 		require: true
// 		},
//     dress_type:{
// 		type:String,
// 		require: true
// 		},
//     dress_model:{
// 		type:String,
// 		require: true
// 		},
//     price_offered:{
// 		type:Number,
// 		require: true
// 		},
//     service_day:{
// 		type:Boolean,
// 		require: true
// 		},
//     close_deal:{
// 		type:Boolean,
// 		require: true
// 		},
//     final_price:{
// 		type:Number,
// 		require: true
// 		},
// 	price:{
// 		type: mongoose.Schema.Types.ObjectId,
//         ref: 'Payment'
// 	},
// 	remark: String
// })

var paymentSchema = new mongoose.Schema({
	bride:{type: Schema.Types.ObjectId, ref: 'Bride'},
	pay:Number,
	date_pay: {type:Date},
	done:Boolean
})

var sizeSchema = new mongoose.Schema({
	last_update:{type: Date, default: Date.now},
	chest:Number,
	waist:Number,
	hips:Number,
	upChest:Number,
	downChest:Number,
	breast_seam:Number,
	stitch_back:Number,
	front_width:Number,
	back_width:Number,
	chest_weidh:Number,
	hip_lenght:Number,
	side_lenght:Number,
	shoulder:Number,
	sleeve_length:Number,
	dress_lenght:Number,
	top_lenght:Number
})
var stageSchema = new mongoose.Schema({
	s: String,
	last_update: {type: Date, default: Date.now}
})

var dressSchema = new mongoose.Schema({
	totalPrice:{type: Number},
	last_update:{type: Date, default: Date.now},
	price_dress:Number,
	t_dress:String,
	model:String,
	color:String,
	t_cloth:String,
	t_lace:String,
	cleavage_detailes:String,
	cleft_place:String,
	sleeve:String,
	another_skirt:String,
	remark:String
})


mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
mongoose.model('Bride', brideSchema);
mongoose.model('Payment', paymentSchema);
mongoose.model('Size', sizeSchema);
mongoose.model('Dress', dressSchema);
mongoose.model('Stage', stageSchema);

