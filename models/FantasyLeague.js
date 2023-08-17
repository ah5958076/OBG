const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {type: String, require: true, default: ""},
    grandPrixLeague: {type: String, require: true, default: ""},
    totalTeams: {type: Number, require: true, default: 0},
    teamSize: {type: Number, require: true, default: 0},
    draftDateTime: {type: Date, require: true, default: null},
    type: {type: String, require: false, default: ""},
    year: {type: Number, require: false, default: 0},
    winner: {type: String, require: false, default: ""},
}, {timestamps: true});

module.exports=mongoose.model("fantasyLeagues", schema);