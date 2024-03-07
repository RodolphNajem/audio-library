const Album = require('../models/album');

async function createAlbum(name, description, showNbTracks){
    try{
        const album = new Album ({name, description, showNbTracks});
        return await album.save();

    }catch (error){
        throw new Error('Failed to create album:' + error.message);
    }
}
//for add find one before deleting or updating, we need to update our delete album and update album in this folder 
async function updateAlbum(id, updates){
    try {
        const album = await Album.findById(id);
        if (!album){
            throw new Error('Album not found');
        }
        return await album.findByIdAndUpdate(id, updates, {new:true});
} catch (error){
    throw new Error('Failed to update album:' + error.message);
}
}

async function readAlbum(id) {
    try {
        const album = await Album.findById(id);
        if (!album){
            throw new Error ('Album not found');
        }
        return album;
    }catch (error){
        throw new Error('Failed to read album:' + error.message);
    }
}
//for add find one before deleting or updating, we need to update our delete album and update album in this folder 
async function deleteAlbum(id){
    try {
        const album =  await Album.findByIdAndDelete(id);
        if (!album){
            throw new Error('Album not found');
        }
        // to see if the album is related to a song
        const relatedSongs = await Song.find({album:id});
        if(relatedSongs.length>0){
            throw new Error('Album is related to one or more songs. Delete songs first.');
        }
        return await album.findByIdAndDelete(id);
    } catch (error) {
        throw new Error ('Failed to delete album:' + error.message);
    }
}

module.exports = {createAlbum, updateAlbum, readAlbum, deleteAlbum};

//function to getting basic info about album
async function getBasicAlbumInfo(id){
    return await album.findById(id).select('name description');
}

// function to retrieve album info by its ID
async function getAlbumById(id){
    try {
        const album = await Album.findById(id).select('name description showNbTracks createdAt updatedAt lastSongAddedAt');
        if (!album){
        throw new error ('Album not found');
        }
        return album;
    } catch (error){
        throw new Error ('Failed to get album by ID' + error.message);
    }
}

module.exports = {getAlbumById, getBasicAlbumInfo};