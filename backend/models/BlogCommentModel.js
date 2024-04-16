const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: Number,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  blogId: {
    type: String,
    required: true // Assuming you have a BlogPost schema
  }
});

module.exports = mongoose.model('BlogComment', commentSchema);