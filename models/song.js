const mongoose = require ('mongoose');

const songSchema = new mongoose.Schema({
name : {type: String, required: true},
singer: String,
category  : {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
album :{ type: mongoose.Schema.Types.ObjectId, ref: 'Album'}
}, {timestamps:true});

module.exports = mongoose.model('Song', songSchema);