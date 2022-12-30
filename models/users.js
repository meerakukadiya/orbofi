const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
  },
  user_type:{
    type: String,
    required: true,
  },
  otp : {
    type: Number,
    required: false,
  },
  profile_picture : {
    type: String,
    required: false,
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
module.exports = mongoose.model('users',userSchema)