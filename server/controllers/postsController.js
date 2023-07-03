// models
const postModel = require('../models/post');

//get all posts
async function getPosts(req, res) {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple blog created with NodeJs, Express and mongoDB."
    };

    // paginations query
    let perPage = 7;
    let page = req.query.page || 1;

    // take posts in descending order and skip the posts from the previous pages
    const datas = await postModel.aggregate([ { $sort: { createdAt: -1 }}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const totalPosts = await postModel.count();
    const nextPage = parseInt(page) + 1;
    // determines whether there is a next page available by comparing (nextPage) with the maximum number of pages needed to display all the documents
    const hasNextPage = nextPage <= Math.ceil(totalPosts / perPage);

    res.render('index', {
      locals,
      datas,
      currPage: page,
      nextPage: hasNextPage ? nextPage : null
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPosts,
}