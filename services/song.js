const Song = require ('../models/song');

// here, we implement the getSongsByAlbum to fetch songs by album id, filtered by category
//and sorted by the created date
async function getSongsByAlbum(albumId, category, sortBy){
    let query = {album:albumId};
    if(category){
        query.category = category;
    }
    let sortOptions = {};
    if(sortBy){
        sortOptions[sortBy] = 1;
    }
    return await song.find(query).sort(sortOptions).select('name singer');
}
async function addSong (name, singer, category, album) {
    try {
        const song = new Song ({name, singer, category,album});
        return await song.save();

    } catch (error){
        throw new Error('Failed to add song:' + error.message);
    }
    
}

async function deleteSong(id) {
    try {
        const song = await Song.findByIdAndDelete(id);
        if (!song){
            throw new Error ('Song not found');
        }
        return song;
    } catch (error) {
        throw new Error ('Failed to delete song:' + error.message);
    }
} 

module.exports = {addSong, deleteSong,getSongsByAlbum};