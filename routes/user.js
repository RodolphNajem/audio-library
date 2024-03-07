const express = require('express');
const router = express.Router();
const userService = require('../services/user');
// route for user signup

router.post('/signup', async(req,res)=>{
  try {
    const body = {name, email, password,dateOfBirth, location}= req.body;
    const user = await userService.signup(name, email, password, dateOfBirth, location);
   res.status(201).json(user);
  } catch (error){
    res.status(400).json({error:error.message});
  }
});
module.exports = router;