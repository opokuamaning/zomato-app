// import Mongoodr
const mongoose = require("mongoose");

// create a schema
const UserSchema = new mongoose.Schema({
        "id": {type: Number},
        "first_name": {type: String},
        "email": {type: String},
        "address": {type: String},
        "mobile": {type: Number},
        "password": {type: String},
})

// create a model
const UserModel = mongoose.model("user", UserSchema, "users");

module.exports = UserModel;