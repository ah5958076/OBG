const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {type: String, require: true, default: ""},
    picture: {type: String, require: true, default: ""}
}, {timestamps: true});

module.exports=mongoose.model("inventory", schema);