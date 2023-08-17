const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {type: String, require: true, default: ""},
    type: {type: String, require: true, default: ""},
    platform: {type: String, require: true, default: ""},
    picture: {type: String, require: true, default: ""}
}, {timestamps: true});

module.exports=mongoose.model("games", schema);