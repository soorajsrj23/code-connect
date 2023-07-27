const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    companyName: String,
    email: {
      type:String,
  },
    phone:String,
    Industry:String,
    CompanyImage: {
      data: String,
      contentType: String,
    },
    title:String,
    description:String,
    salary:String,
    qualifications:String,
    location:String,
    skills:String,
    applicantId: [
      {
        developer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        name:{
          type:String
        }
      },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
      },
  
  });
  const Job = mongoose.model('Job', jobPostSchema);
  
  
  module.exports = Job ;