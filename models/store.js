const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({
  store_name: {
    type: String,
    required: true,
  },
  store_email: {
    type: String,
    required: true,
  },
  store_image: {
    type: String,
    required: true,
  },
  store_location:{
    type: String,
    required: true,
  },
  store_status:{
    type: String,
    required: true,
  },
  store_time : {
    type: Date,
    required: true,
  },
  status:{
    type: String,
    default: "active",
  },
  is_deleted : {
    type : Boolean,
    default: false
  }
})
module.exports = mongoose.model('store',storeSchema)