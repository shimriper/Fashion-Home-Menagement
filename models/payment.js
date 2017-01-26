var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
	price:Number,
	pay:Number,
	date_pay: {type:Date},
	done:Boolean
})
module.exports = paymentSchema;