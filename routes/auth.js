// to handle user login and generate a JWT
const express = require('express');
const router = express.Router();
const userService = require ('../services/user');
const jwt = require('jsonwebtoken');
//route for the user login
router.post('./login', async(req,res)=>{
  try{
    const {email, password}= req.body;
    const user = await userService.login(email,password);
    const token = jwt.sign({userId: user>_id},'secretkey',{expiresIn: '1h'});
    res.status(200).json({token});
  } catch (error){
    res.status(401).json({error: error.message});

  }
});
module.exports = router;