var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/pages/DnD.html', function (req, res, next) {
    res.render('Pages/DnD');
});

router.get('/pages/DnD_character_generator.html', function (req, res, next) {
    res.render('Pages/DnD_character_generator');
});

module.exports = router;
