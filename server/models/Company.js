const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: String,
    email: {
      type:String,
    unique:true},
    password: String,
    phone:String,
    Industry:String,
    image: {
      data: Buffer,
      contentType: String
    },
    
  
  });
  const Comapany = mongoose.model('Company', companySchema);
  
  
  module.exports = Comapany;