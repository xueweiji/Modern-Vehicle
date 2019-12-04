var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var dataUtil = require("./data-util");
var logger = require('morgan');
var exphbs = require('express-handlebars');
var app = express();
var _DATA = dataUtil.loadData().property_posts;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
app.use(require('./user/user'));
app.use(require('./main/main'));
app.use(require('./api/api'));
var dotenv = require('dotenv');
dotenv.config()

var typeList = ["Single Family", "Town House", "Appartment"];
var purpose = ["For Rent", "For Sale"]

app.get('/api/get_all_property_data',function(req,res){
    return res.send(_DATA);
})


app.post('/api/add_property', function(req, res) {
    var body = req.body;
    if(!body.type||!body.purpose||!body.area||!body.bedroom||!body.bathroom||!body.zip||!body.price||!body.picture||!body.description){
       return res.send ("not all key values are entered! failed to post");
    }
    var max_id = dataUtil.getMaxId(_DATA)
    // Transform tags and content
    body.picture = body.picture.split(",");
    body.first_picture=body.picture[0];
    // Add time and preview
    body.id=++max_id;

    // Save new blog post
    if(!_DATA){
        var tempbody=[];
        tempbody[0]=req.body;
        dataUtil.saveData(tempbody);
    }else{
        _DATA.push(req.body);
        dataUtil.saveData(_DATA);
    }
   return res.send( "success!");
});


app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port 3000!');
});
