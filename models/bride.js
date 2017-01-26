var mongoose = require('mongoose');

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
	price:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
	},
	remark: String
})
module.exports = brideSchema;