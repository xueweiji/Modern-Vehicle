var express = require('express');
var main = express.Router();
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var session = require('express-session');
nodeMailer = require('nodemailer');
var dotenv = require('dotenv');
dotenv.config()
var Model = require('../models/Models');
var typeList = ["SUV", "Truck", "Regular Car"];
var purpose = ["For Rent", "For Sale"]
var Model = require('../models/Models');
main.use(session({
    secret: 'secret',
    cokkie: { maxAge: 60 * 1000 * 300 }
}))

main.get('/',function(req,res){
        Model.Vehicle.find({}, function(err, vehicle) {
        if (err) throw err;
            if(req.session.sign){
                res.render('home',{data: vehicle,username:req.session.name });
            }else{
                res.render('home',{data: vehicle });
            }
    });
})

main.get("/main/add_vehicle", function(req, res) {
    if(req.session.sign){
        Model.Make.find({}, function(err, makes) {
            if (err) throw err;
            res.render('add_vehicle', {
                typeList: typeList,
                purpose: purpose,
                username:req.session.name,
                makes: makes
            });
        });

    }else{
        res.render('login');
    }
});

main.post('/main/add_vehicle', function(req, res) {
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
    vehicle.save(function(err) {
        if (err) throw err;
    });
    res.redirect("/");
});


main.get('/main/detail/:id', function(req, res) {
    var _id = req.params.id;
    Model.Vehicle.findOne({_id:_id}, function(err, vehicles) {
        if (err) throw err;
        if(req.session.sign){
            res.render('detail',{data: vehicles,username:req.session.name });
        }else{
            res.render('detail',{data: vehicles });
        }
    });
});

main.get('/main/truck/', function(req, res) {
    Model.Vehicle.find({type:'Truck'}, function(err, vehicles) {
        if (err) throw err;
        if(req.session.sign){
            res.render('home',{data: vehicles,username:req.session.name });
        }else{
            res.render('home',{data: vehicles });
        }
    });
});

main.get('/main/regular/', function(req, res) {
    Model.Vehicle.find({type:'Regular Car'}, function(err, vehicles) {
        if (err) throw err;
        if(req.session.sign){
            res.render('home',{data: vehicles,username:req.session.name });
        }else{
            res.render('home',{data: vehicles });
        }
    });
});

main.get('/main/suv/', function(req, res) {
    Model.Vehicle.find({type:'SUV'}, function(err, vehicles) {
        if (err) throw err;
        if(req.session.sign){
            res.render('home',{data: vehicles,username:req.session.name });
        }else{
            res.render('home',{data: vehicles });
        }
    });
});
main.get('/main/rent/', function(req, res) {
    Model.Vehicle.find({purpose:'For Rent'}, function(err, vehicles) {
        if (err) throw err;
        if(req.session.sign){
            res.render('home',{data: vehicles,username:req.session.name });
        }else{
            res.render('home',{data: vehicles });
        }
    });
});
main.get('/main/sale/', function(req, res) {
    Model.Vehicle.find({purpose:'For Sale'}, function(err, vehicles) {
        if (err) throw err;
        if(req.session.sign){
            res.render('home',{data: vehicles,username:req.session.name });
        }else{
            res.render('home',{data: vehicles });
        }
    });
});

main.get('/main/myVehicle/', function(req, res) {
    Model.Vehicle.find({user_email:req.session.email}, function(err, vehicles) {
        if (err) throw err;
        if(req.session.sign){
            res.render('my_vehicle',{data: vehicles,username:req.session.name});
        }
    });
});


main.post('/main/myVehicleDeletion/', function(req, res) {

    var body = req.body;
    var vehicleId=body.vehicleId
    Model.Vehicle.findByIdAndRemove(vehicleId, function(err, vehicle) {
        if (err) throw err;
        if (!vehicle) {
            return res.send('No vehicle found with given ID.');
        }
        res.redirect('/main/myVehicle')
    });
});

main.post('/main/sendEmail', function (req, res) {
    var body=req.body
    var sellerEmail = body.sellerEmail
    var customerEmail = body.customerEmail
    var emailBody = body.emailBody
    var subject = 'Modern Car Delear: From customer:' + customerEmail
    let transporter = nodeMailer.createTransport({
        service:'gmail',
        //host: 'smtp.gmail.com',
        //port: 587,
        //secure: true,
        auth: {
            user: 'UMD.XWJ.Study@gmail.com',
            pass: 'UMD.XWJ.Study'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        from:customerEmail,
        to: sellerEmail,
        subject: subject,
        text: emailBody
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return res.redirect("/");
    });
    return res.redirect("/");
});


main.get('/main/sendEmail/:email', function(req, res) {
    var email = req.params.email;
        if(req.session.sign){
            return  res.render('sendEmail',{sellerEmail: email,customerEmail:req.session.email });
        }else{
            return res.redirect("/");
        }
});

module.exports = main;