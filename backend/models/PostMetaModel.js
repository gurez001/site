const mongoose = require("mongoose");

const postMetaSchema = new mongoose.Schema({
  item_id: {
    type: String,
    ref: "Product",
  },
  meta_uuid: {
    type: String,
  },
  meta_key: {
    type: String,
  },
  meta_value: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("postMeta", postMetaSchema);
