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

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port 3000!');
});
