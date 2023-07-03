// requirements
const router = require('express').Router();
// controllers
const { getPosts } = require('../controllers/postsController');


router.get('/', getPosts);

router.get('/about', (req, res) => {
  res.render('about')
});


module.exports = router;