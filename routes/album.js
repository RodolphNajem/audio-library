const express = require ('express');
const router = express.Router();
const album = require ('../services/album');

//route to getting basic album info by ID
router.get('/album/:id', async (req,res) => {
  try {
    const albumId = eq.params.id;
    const album = await albumService.getBasicAlbumInfo(albumId);
    if (!album){
      res.status(404).json({message:'Album not Found'});
    }else {
      res.status (200).json(album);
    }
  }catch (error) {
    res.status(500).json({error:error.message});
  }
});
//route to create an album 
router.post ('/album', async (req, res)=>{
  try {
    const {name, description, showNbTracks} = req.body;
    const album = await album.createAlbum(name,description, showNbTracks);
    res.status(201).json(album);
  } catch (error) {
    res.status (500).json ({error : error.message});
  }
});

//route to read all albums:
router.get('albums', async (req,res) =>{
  try {
    const albums = await album.getAllAlbums();
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json ({error: error.message});
  }
});

//route to read a single album by its id
router.get('./album/:id', async (req, res)=>{
  try {
    const albumId = req.params.id;
    const album = await album.getAlbumById(albumId);
    if(!album){
      res.status(404).json({message: 'Album not found'});
    }else {
      res.status (200).json(album);
    }
  } catch (error){
           res.status(500).json({error: error.message});
}
});

//route to update album
router.put('/album/:id', async (req,res)=> {

  try {
    const albumId = req.params.id;
    const updates = req.body;
    const updatedAlbum = await album.updateAlbum(albumId,updates);
    if (!updatedAlbum){
      res.status (404).json({message:'Album not found'});
    }else {
      res.status(200).json (updateAlbum);
    }
  }catch (error) {
    res.status(500).json({error:error.message});
  }
});

// route to delete an album
router.delete('/albums/:id' ,async (req,res) =>{
  try {
    const albumId = req.params.id;
    const deletedAlbum = await album.deleteAlbum(albumId);
    if (!deletedAlbum){
      res.status(404).json;{message: 'Album not found'};
    } else {
      res.status (200).json(deletedAlbum);
    }
  } catch (error) {
    res.status (500).json ({error: error.message });
  }
});
module.exports = router;