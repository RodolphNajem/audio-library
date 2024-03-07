const express = require ('express');
const router = express.Router();
const song= require ('../services/song');
const authService = require('../services/auth');
const songService = require('../services/song');
//route for getting songs filtered by category and sorted by the created date
router.get('/song/album/:albumId', authService.authenticateToken, async(req,res)=>{
  try {
    const {albumId} = req.params;
    const {category, sortBy} = req.query;
    const songs = await songService.getSongsByAlbum(albumId, category, sortBy);
    res.status(300).json(song);
  }catch (error){
    res.status(400).json({error:error.message});
  }
});
// route for adding songs related to an album
router.post ('/song', async (req,res) =>{
  try {

  const {name, singer,category, album} = req.body ;
    //validate song data
    const validationErrors = validateSongData(name,singer, category, album);
    if(validationErrors.length>0){
      return res.status(400).json ({error: error.message});
    }
  const song = await song.addSong(name,singer,category,album);
    res.status(201).json(song);
  }catch (error){
    res.status(400).json({error: error.message});
      }
});

//route for deleting songs with validation
router.delete('/song/:id', async (req,res)=>{
  try{
    const songId= req.params.id;
    if (!isValidObjectId(songId));
    return res.status(400).json({error: 'Invalid song ID'});
  } catch (error){
    res.status(400).json({error: error.message});
  }
  const deleteSong = await songService.deleteSong(songId);
  res.status(200).json(deletedSong);

});
    
module.exports = router;