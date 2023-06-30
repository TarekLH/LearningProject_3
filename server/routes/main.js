// requirements
const router = require('express').Router();

router.get('/', (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple blog created with NodeJs, Express and mongoDB."
  }
  res.render('index', locals);
});

router.get('/about', (req, res) => {
  res.render('about')
});


module.exports = router;