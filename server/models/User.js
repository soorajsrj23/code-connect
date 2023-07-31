const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: {
      type:String,
    unique:true},
    password: String,
    phone:String,
    bio:String,
    image: {
      data: Buffer,
      contentType: String
    },
    
  
  });
  const User = mongoose.model('User', userSchema);

  module.exports = User ;
  
  