var express = require('express');
var api = express.Router();
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

api.post('/api/register', function(req, res) {
    var message=''
    var body = req.body;
    if(!body.first_name||!body.last_name||!body.email||!body.password){
        return res.send ("not all key values are entered! failed to post");
    }
    Model.User.findOne({
        email:body.email
    },function (err,doc) {
        if(doc){
            message = 'emai already exists';
            return res.send (message);
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
        message = 'account is created!';
        return res.send (message);
    });
});



api.post('/api/check_account',function (req,res) {
    // console.log(req.body);
    var username = req.body.email;
    var password = req.body.password;
    var message=''
    if(!password|| !username){
        message = 'User name or Password is empty';
        return res.send (message);
    }
    Model.User.findOne({
        email:username,
        password:password
    },function (err,doc) {
        if(doc){
            message = 'Account and password match!';
            return res.send (message);
        }else{
            message = 'Account and password do not match!';
            return res.send (message);
        }
        return
    });
});

api.post('/api/add_vehicle',function (req,res) {
    var body = req.body;
    // Transform tags and content
    body.picture = body.picture.split(",");
    body.first_picture=body.picture[0];
    var vehicle = new Model.Vehicle({
        make: body.make,
        model: body.model,
        type:body.type,
        zip:body.zip,
        purpose:body.purpose,
        year: body.year,
        mileage: body.mileage,
        color: body.color,
        price: body.price,
        picture: body.picture,
        description: body.description,
        user_email:req.session.email,
        first_picture:body.first_picture
    });
    Vehicle.save(function(err) {
        if (err) throw err;
    });
    message = 'New vehicle is added';
    return res.send (message);
});


api.delete('/api/deletebyId/:id', function(req, res) {
    Model.Vehicle.findByIdAndRemove(req.params.id, function(err, vehicle) {
        if (err) throw err;
        if (!vehicle) {
            return res.send('No vehicle found with given ID.');
        }
        return  res.send('Vehicle deleted!');
    });
});

api.delete('/api/deleteAccount/:email', function(req, res) {
    Model.User.deleteOne({ email: req.params.email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            return res.send('No user found with given email.');
        }
        return  res.send('User deleted!');
    });
});

api.get('/api/getVehicleByUser/:email', function(req, res) {
    Model.Vehicle.find({user_email:req.params.email}, function(err, vehicles) {
        if (err) throw err;
        if(vehicles){
            res.send(vehicles);
        }else{
            res.send("No vehicle found")
        }
    });
});

api.get('/api/getVehicleByPurpose/:purpose', function(req, res) {
    Model.Vehicle.find({purpose:req.params.purpose}, function(err, vehicles) {
        if (err) throw err;
        if(vehicles){
            res.send(vehicles);
        }else{
            res.send("No vehicle found")
        }
    });
});

api.get('/api/getVehicleByType/:type', function(req, res) {
    Model.Vehicle.find({type:req.params.type}, function(err, vehicles) {
        if (err) throw err;
        if(vehicles){
            res.send(vehicles);
        }else{
            res.send("No vehicle found")
        }
    });
});

api.get('/api/getAllVehicles', function(req, res) {
    Model.Vehicle.find({}, function(err, vehicles) {
        if (err) throw err;
        if(vehicles){
            res.send(vehicles);
        }else{
            res.send("No vehicle found")
        }
    });
});

api.get('/api/getAllUsers', function(req, res) {
    Model.User.find({}, function(err, users) {
        if (err) throw err;
        if(users){
            res.send(users);
        }else{
            res.send("No user found")
        }
    });
});

module.exports = api;