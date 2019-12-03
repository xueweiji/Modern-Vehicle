var express = require('express');
var user = express.Router();
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var session = require('express-session');
var dotenv = require('dotenv');
dotenv.config()
var Model = require('../models/Models');
var Main = require('../main/main')
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

user.use(session({
    secret: 'secret',
    cokkie: { maxAge: 60 * 1000 * 300 }
}))

// Define the home page route
user.get('/user/register', function(req, res) {
    res.render('register');
});


user.post('/user/register', function(req, res) {
    var message = ''
    if( req.body.password != req.body.confirm_password){
        message = 're enter password does not match with password';
        res.render('register',{message: message} );
        return;
    }
    Model.User.findOne({
        email:req.body.email
    },function (err,doc) {
        if(doc){
            message = 'emai already exists';
            res.render('register',{message: message} );
            return;
        }
        var user = new Model.User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });

        user.save(function(err) {
            if (err) throw err;
        });
        res.redirect('login');
    });
});


user.get('/user/login', function(req, res) {
    res.render('login');
});

user.post('/user/login',function (req,res) {
    // console.log(req.body);
    var username = req.body.email;
    var password = req.body.password;

    if(password == ''|| username==''){
        var message = 'User name or Password is empty';
        res.json(messgage);
        return
    }
    Model.User.findOne({
        email:username,
        password:password
    },function (err,doc) {
        if(doc){
            if(req.session.sign){
                if(req.session.name !== username){
                    req.session.email = username;
                    req.session.id=doc._id;
                    req.session.name = doc.first_name;
                }
                res.render('../');
            }
            else{
                req.session.sign=true;
                req.session.email = username;
                req.session.id=doc._id;
                req.session.name = doc.first_name
                res.redirect('../');
            }
        }else{
            res.send("Account Does Not Exist")
        }
        //responseData.code = 2;
        //responseData.message = 'User Name or Password does not exist';
        //res.json(responseData);
        return
    });
});

user.get('/user/logout', function(req, res) {
    req.session.sign=false;
    req.session.email = null;
    req.session.id=null;
    req.session.name = null
    res.redirect('login');
});

module.exports = user;


