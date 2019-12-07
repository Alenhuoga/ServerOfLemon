var mongoose = require('mongoose')

var Schema = mongoose.Schema

var songSchema = new Schema(
{
	name:String,
	singer:String,
	url:String,
	picurl:String

});

module.exports = mongoose.model('Song', songSchema);
