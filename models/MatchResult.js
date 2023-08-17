const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {type: String, required: true, default: ""},
    results: {type: String, required: false, default: ""},
    matchId: {type: mongoose.Schema.Types.ObjectId, required: true, default: null, ref: "matches"},
    gameName: {type: String, required: true, default: ""},
    winner: {type: Number, required: true, default: 0},
    isDeleted: {type: String, required: false, default: ""},
    deletedAt: {type: String, required: false, default: ""}
}, {timestamps: true});


module.exports=mongoose.model("match-results", schema);