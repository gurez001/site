const mongoose = require("mongoose");
const CountModel = require("./CountModel");

const blogPostSchema = new mongoose.Schema({
  postid: Number,
  title: {
    type: String,
    // trim: true,
  },
  name: {
    type: String,
    // trim: true,
  },
  article: {
    type: String,
    // trim: true,
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'blogCategore',
  },
  slug: {
    type: String,
  },
  featureimage: {
    type: String,
  },
  seo: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'SEO',
  },
  user: {
    type: Number,
    ref: "User",
    required: true,
  },
  creditAt: {
    type: Date,
    default: Date.now(),
  },
});
blogPostSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const counter = await CountModel.findOneAndUpdate(
      { entityName: "User" },
      { $inc: { blogpost: 1 } },
      { new: true, upsert: true }
    );
    this.postid = counter.blogpost;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});
module.exports = mongoose.model("blogPost", blogPostSchema);
