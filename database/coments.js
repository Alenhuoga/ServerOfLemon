var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var comentSchema = new Schema({
    name : String,
    description : String,
    createTime : Number,
    user : String,
});

var Coment = mongoose.model('Coment',comentSchema);

module.exports = Coment;