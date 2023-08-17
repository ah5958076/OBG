const mongoose=require("mongoose");

const schema = new mongoose.Schema({
    name: {type: String, required: true, default: ""},
    members: {type: Array, default: [], required: false},
    size: {type: Number, required: true, default: 0}
});

module.exports=mongoose.model("teams", schema);