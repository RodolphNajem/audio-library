//add the user model

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema ({
  name:{
    type:String,
    required:true
  },
  email :{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  registrationDate:{
    type:Date,
    default: Date.now
  },
  dateOfBirth:Date,
  location:{
    type:{
      type:String,
      enum:['Point'],
      default:'Point'
    },
    coordinates:{
      type:[Number],
      required:true
    }
  }
});
userSchema.index({location:'2DSphere'});

const User= mongoose.model('User',userSchema);
module.exports = User;


    
    