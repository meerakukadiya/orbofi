const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weekDaysSchema = new Schema({
  
    day_name: {
        type: String,
        required: true,
    },
     status: {
        type: String,
       default : "active"
    },
}, {timestamps: true});

module.exports = mongoose.model("week_days",weekDaysSchema);