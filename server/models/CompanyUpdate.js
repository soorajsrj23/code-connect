// models/companyUpdate.js
const mongoose = require('mongoose');

const companyUpdateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image:{
       type:String
    },
    idOfPostedCompany:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    }
  },
  {
    collection: 'companyUpdates',
  }
);

const CompanyUpdate = mongoose.model('CompanyUpdate', companyUpdateSchema);

module.exports = CompanyUpdate;
