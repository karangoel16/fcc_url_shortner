'use strict';
var mongoose = require("mongoose");
var Schema= mongoose.Schema;
var link = new Schema({
	add:{
		type:String,
		required:true
	},
	link:{
		type:String,
		required:true
	}
});
module.exports=mongoose.model('Post',link);