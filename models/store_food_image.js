const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeFoodImagesSchema = new mongoose.Schema({
  store_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "store",
  },
  food_image: {
    type: String,
    required: true,
  },
    food_status:{
    type: String,
    required: true,
  },
  food_minitues : {
    type: String,
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
module.exports = mongoose.model('store_food_images',storeFoodImagesSchema)