const mongoose = require("mongoose");

const LabelSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  attributeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
  },

  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  SwatchLabel: {
    type: String,
    required: true,
  },
  color: {
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

module.exports = mongoose.model("Label", LabelSchema);
