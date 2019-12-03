var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

var vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    mileage:{
        type: Number,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    first_picture:{
        type: String
    },
    type:{
        type: String,
        required: true
    },
    purpose:{
        type: String,
        required: true
    },
    picture:{
        type: [String]
    },
    color:{
        type: String,
        required: true
    }
});

var Vehicle = mongoose.model('Vehicle', vehicleSchema);
var User = mongoose.model('User', userSchema);
module.exports = {
    User : User,
    Vehicle: Vehicle
}