// we implement the signup function in order to handle the user signup
const bcrypt = require('bcrypt');
const user = require('../models/user');

//to handle the login function 
async function login(email, password){
  const user = await user.findOne({email});
  if(!user){
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    throw new Error('Invalid password');
  }return user;
}

async function signup(name, email, password, dateOfBirth, location){
  //hash the password before saving it into the database
const hashedPassword = await bcrypt.hash(password,15);
const user = new User({name, email, password:hashedPassword, dateOfBirth, location});

return await user.save();
}
module.export = {login,signup};