const {addCategory} = require('./services/category');
const {createAlbum, deleteAlbum, getAlbumById} = require('./services/album');
const {addSong, deleteSong} = require('./services/song');
const mongoose = require ('mongoose');
const express = require ('express');
const bodyParser = require ('body-parser');
const category = require ('./routes/category');
const albumRoutes = require('./routes/album');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/song');
const app = express();    

app.use(express.json());
app.use('/api',category); //this will use thi category in routes
app.use ('/api',albumRoutes);
app.use('/api',userRoutes);
app.use('/api',authRoutes);
app.use('/api',songRoutes);

async function testCase () {
    try{
        //create the categories
        const popCategory = await addCategory('Pop', 'Pop Music');
        const jazzCategory = await addCategory('Jazz', 'Jazz Music');

        //create the albums
        const myAlbum = await createAlbum ('My Album','My first album',true);
        const tempAlbum = await createAlbum ('Temp Album','Temporary album',true);


        //add the songs to albums
        const song1 = await addSong('Song 1','Singer1',popCategory._id, myAlbum._id);
        const song2 = await addSong('Song 2','Singer2',popCategory._id, myAlbum._id);
        const song3 = await addSong('Song 3','Singer3',popCategory._id, myAlbum._id);
        const song4 = await addSong('Song 4','Singer4',jazzCategory._id, tempAlbum._id);
        const song5 = await addSong('Song 5','Singer5',jazzCategory._id, tempAlbum._id);
        const song6 = await addSong('Song 6','Singer6',jazzCategory._id, tempAlbum._id);

        //update necessary fields
        await createAlbum(myAlbum._id,{lastSongAddedAt: Date.now()});
        
        //delete the 2nd album
        await deleteAlbum(tempAlbum._id);

        //delete the final song on 1st album
        await deleteSong(song3._id);

        console.log('Test case completed successfully.');

    } catch (error){
        console.error('Test case failed:', error.message);

    }
}
const PORT = process.env.PORT || 3000;
app.listen(27017, () =>{
          console.log ('Server is running on port ${3000}');
});

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/audio-library',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
   then(() =>{
    console.log('Connected to MongoDB');
    //RUN THE TEST CASE
    testCase();
})
.catch(err);{
    console.log('Failed to connect to MongoDB:',err)
}
});