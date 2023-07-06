// requirements
const router = require('express').Router();
// controllers
const { getPosts, getPost, searchPost } = require('../controllers/postsController');

// GET all posts
router.get('/', getPosts);

// GET a single post
router.get('/post/:id', getPost);

// POST search term
router.post('/search', searchPost)


module.exports = router;