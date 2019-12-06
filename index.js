var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var app = express();
var _DATA = dataUtil.loadData().property_posts;
var dotenv = require('dotenv');
var http = require('http').Server(app);
var io = require('socket.io')(http);
dotenv.config()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
app.use(require('./user/user'));
app.use(require('./main/main'));
app.use(require('./api/api'));

var Model = require('./models/Models');
var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var typeList = ["SUV", "Truck", "Regular Car"];
var purpose = ["For Rent", "For Sale"]

app.get("/add_vehicle", function(req, res) {
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
app.post('/add_vehicle', function(req, res) {
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
        io.emit('new vehicle', vehicle);
        if (err) throw err;
    });
    res.redirect("/");
});
app.get("/about", function(req, res) {
    res.render('about');
});
http.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port 3000!');
});
