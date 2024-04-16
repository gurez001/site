const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
  },
  enable: {
    type: Boolean,
    default: false,
  },
  typevalue: {
    type: String,
    required: true,
  },
  orderValue: {
    type: String,
    required: true,
  },
  labelid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label",
  }],

  riodeValue: {
    type: String,
    required: true,
  },
  riodeLink: {
    type: String,
    required: true,
  },
  riodeicon: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isdelete: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Number,
    ref: "User",
    // required: true,
  },
  creditAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Attribute", AttributeSchema);
