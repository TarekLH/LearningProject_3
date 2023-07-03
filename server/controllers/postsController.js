// models
const postModel = require('../models/post');

//get all posts
async function getPosts(req, res) {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJs, Express and mongoDB."
    };
    const datas = await postModel.find({}).sort({createdAt: -1});
    res.render('index', {locals, datas});
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPosts,
}