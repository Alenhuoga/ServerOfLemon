var mongoose = require('mongoose')

var Schema = mongoose.Schema

var bannerSchema = new Schema({
	imageUrl:{
		type:String,
		require:true
	}
})

module.exports = mongoose.model('Banner', bannerSchema);
