var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('site/index', {
        title: 'Home'
    });
});

/* GET about page. */
router.get('/about', function(req, res) {
    res.render('site/about', {
        title: 'About'
    });
});

module.exports = router;
