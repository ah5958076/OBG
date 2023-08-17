const constantMsgs = require("../constants/messages");
const MatchModel = require("../models/Match");


module.exports.store = async (req) => {
    let data = req.body;
    if(!data.userId)
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.VIDEO_NOT_UPLOADED;
    
    let objtoEdit={};
    objtoEdit.userId=req.body.userId;
    objtoEdit.result=req.body.result;
    objtoEdit.video=req.file.path;

    let value = await new MatchModel(objtoEdit).save().catch((e) => {
        console.log(e);
    });
    if(value)
        return constantMsgs.MATCH_ADDED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.update = async (req) => {
    let data = req.body;

    let objtoEdit={};
    objtoEdit.userId=req.body.userId;
    objtoEdit.result=req.body.result;
    objtoEdit.video=req.file.path;

    let value = await MatchModel.updateOne({_id: req.body.id}, objtoEdit).catch((e) => {
        console.log(e);
    });
    if(value.modifiedCount)
        return constantMsgs.MATCH_UPDATED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.delete = async (id) => {    
    let value = await MatchModel.deleteOne({_id: id}).catch((e) => {
        console.log(e);
    });

    if(value.deletedCount)
        return constantMsgs.MATCH_DELETED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.show = async (id) => {
    let value = await MatchModel.findOne({_id: id}).populate("userId").catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async () => {
    let value = await MatchModel.find().populate("userId").catch((e) => {
        console.log(e);
    });
    return value;
}

module.exports.searchData = async (searchText) => {
    let value = await MatchModel.find().populate("userId").catch((e) => {
        console.log(e);
    });    
    let data=[];
    value.forEach((elem) => {
        if(elem.name.toLowerCase().includes(searchText.toLowerCase()) || elem.gameName.toLowerCase().includes(searchText.toLowerCase())){
            data.push(elem);
        }
    });
    return data; 
}