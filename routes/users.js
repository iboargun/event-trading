var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var db = req.db;
    db.collection('usercollection').find().toArray(function (err, items) {
        res.render('users/index', {
            "title" : "Users",
            "users" : items
        });
    });
});

/* GET new user form. */
router.get('/new', function(req, res) {
    res.render('users/new', { title: 'New User' });
});

/* POST add user */
router.post('/add', function(req, res){
    var db = req.db;

    db.collection('usercollection').insert(req.body, function(err, result){
        if(err){
            // if it failed return error
            res.send("There was a problem adding the information to the database: " + err);
        }else{
            // if it worked, set the header so the address bar doesn't still say /add
            res.location("/users");
            // and foreward to success page
            res.redirect("/users");
        }
    });


});

/* DELETE delete user */
router.delete('/delete/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;

    db.collection('usercollection').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;