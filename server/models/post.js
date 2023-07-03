const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// post schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {collection: 'Posts'})

// creating post model
const postModel = mongoose.model('postModel', postSchema);

//export model
module.exports = postModel;