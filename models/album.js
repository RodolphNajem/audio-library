const mongoose = require ('mongoose');
//modify the file to add fields createdBy and updatedBy
const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    showNbTracks: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    lastSongAddedAt: Date,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;