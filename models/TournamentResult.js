const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name :{type: String, required: true, default: ""},
    roundNumber :{type: Number, required: false, default: 0},
    score :{type: Number, required: false, default: 0},
    submissionDate :{type: Date, required: false, default: null},
    video :{type: String, required: false, default: ""},
    resultType :{type: String, required: false, default: ""},
    result :{type: String, required: false, default: ""},
    scheduleType :{type: String, required: false, default: ""},
    matchId :{type: String, required: false, default: ""},
    killPoints :{type: String, required: false, default: ""},
    placePoints :{type: String, required: false, default: ""},
    teamViewName :{type: String, required: false, default: ""},
    gameName :{type: String, required: true, default: ""},
    tournamentId :{type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: "tournaments"},
    teamId :{type: mongoose.Schema.Types.ObjectId, required: true, default: null, ref: "teams"},
    gameName :{type: String, required: false, default: ""},
    submittedBy :{type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: "users"},
    playerResults :{type: String, required: false, default: ""},
    isDeleted :{type: Boolean, required: true, default: false},
    deletedAt :{type: Date, required: false, default: null}

}, {timestamps: true});


module.exports=mongoose.model("tournament-results", schema);