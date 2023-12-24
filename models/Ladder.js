const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {type: String, require: true, default: ""},
    gameName: {type: String, require: true, default: "", ref:"games"},
    entryFee: {type: Number, require: true, default: 0},
    prize: {type: Number, require: true, default: 0},
    teamSize: {type: Number, require: true, default: 0},
    totalTeams: {type: Number, require: true, default: 0},
    status: {type: String, require: true, default: ""},
    startingDate: {type: Date, require: true, default: null},
    endingDate: {type: Date, require: true, default: null},
    picture: {type: String, require: true, default: ""}
}, {timestamps: true});

module.exports=mongoose.model("ladders", schema);