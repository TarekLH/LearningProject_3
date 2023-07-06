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
  };
};

// GET a single post
async function getPost(req, res) {
  try {
    let _id = req.params.id;
    const datas = await postModel.findById({_id});
    const locals = {
      title: datas.title,
      description: "Simple blog created with NodeJs, Express and mongoDB."
    };

    res.render('post', { locals, datas });
  } catch (error) {
    console.log(error);
  };
};

// POST the search term
async function searchPost(req, res) {
  try {
    const locals = {
      title: 'Search',
      description: "Simple blog created with NodeJs, Express and mongoDB."
    };
    let {searchTerm} = req.body;
    const noSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const datas = await postModel.find({
      $or: [
        {title: { $regex: new RegExp(noSpecialChar, 'i')}},
        {body: { $regex: new RegExp(noSpecialChar, 'i')}}
      ]
    });

    res.render('search', { locals, datas });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPosts,
  getPost,
  searchPost
}