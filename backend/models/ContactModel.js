const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uuid:{
type:String,
// required:true
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status:{
    type:Boolean,
    default:true
  },
  isdelete:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Contact", ContactSchema);