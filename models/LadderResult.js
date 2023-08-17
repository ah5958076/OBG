const mongoose=require("mongoose");

const schema = new mongoose.Schema({
    name: {type: String, required: true, default: ""},
    score: {type: Number, required: false, default: 0},
    submissionDate: {type: Date, required: false, default: null},
    video: {type: String, required: true, default: ""},
    result: {type: String, required: false, default: ""},
    ladderId: {type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: "ladders"},
    teamId: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "teams", required: true},
    gameName: {type: String, required: true, default: ""},
    submittedBy: {type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: "users"},
    isDeleted: {type: Boolean, required: true, default: false},
    deletedAt: {type: Date, required: false, default: null}
}, {timestamps: true});

module.exports=mongoose.model("ladderResult", schema);