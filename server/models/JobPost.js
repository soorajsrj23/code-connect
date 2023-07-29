const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    companyName: String,
    phone:String,
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
    employmentType:String,
    experience:String,
    applicantId: [
      {
        developerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        developerName:{
          type:String
        },
         appliedAt: {
        type: Date,
        default: Date.now,
      },
      jobStatus: {
        type: String,
        default: 'New', // Set the default value to "New"
      },
      },
     
    ],
    createdAt: {
        type: Date,
        default: Date.now,
      },
  
  });
  const Job = mongoose.model('Job', jobPostSchema);
  
  
  module.exports = Job ;