const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {type: String, require: false, default: ""},
    grandPrixOwner: {type: String, require: false, default: ""},
    totalTeams: {type: Number, require: false, default: 0},
    ownerOccupation: {type: String, require: false, default: 0},
    ownerYearlyIncome: {type: String, require: false, default: null},
    ownerAddress: {type: String, require: false, default: ""},
    isBlock: {type: Boolean, require: true, default: false}
}, {timestamps: true});

module.exports=mongoose.model("grandPrixes", schema);