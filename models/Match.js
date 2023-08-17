const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    userId :{type: mongoose.Schema.Types.ObjectId, required: true, default: "", ref: "users"},
    score :{type: Number, required: false, default: 0},
    mapScore1 :{type: Number, required: false, default: 0},
    mapScore2 :{type: Number, required: false, default: 0},
    mapScore3 :{type: Number, required: false, default: 0},
    mapScore4 :{type: Number, required: false, default: 0},
    mapScore5 :{type: Number, required: false, default: 0},
    video: {type: String, required: true, default: ""},
    result: {type: String, required: true, default: ""}
}, {timestamps: true});


module.exports=mongoose.model("matches", schema);