var express = require('express');
var router = express.Router();

/* GET termine listing. */
router.get('/', function(req, res) {
    var db = req.db;
    var termine = db.collection('userlist').find();

    termine.toArray(function (err, items) {
        res.render('termine/index', {
            "title" : "Aktuelle Termine",
            "termine" : items
        });
    });
});

module.exports = router;