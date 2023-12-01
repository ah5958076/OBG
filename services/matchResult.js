const constantMsgs = require("../constants/messages");
const {PAGINATION_MAX_RECORD_SIZE} = require("../constants/constants");
const MatchResultModel = require("../models/MatchResult");


module.exports.store = async (req) => {
    let data = req.body;
    if(!(data.name && data.gameName && data.winner))
        return constantMsgs.FIELD_EMPTY;
    
    
    let objToInsert={
        name: data.name,
        gameName: data.gameName,
        winner: data.winner,
        matchId: data.matchId
    }
    let value = await new MatchResultModel(objToInsert).save().catch((e) => {
        console.log(e);
    });
    if(value)
        return constantMsgs.MATCH_RESULT_ADDED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.update = async (req) => {
    let data = req.body;
    
    let id=data.id;
    delete data.id;
    let value = await MatchResultModel.updateOne({_id: id}, data).catch((e) => {
        console.log(e);
    });
    if(value.modifiedCount)
        return constantMsgs.MATCH_RESULT_UPDATED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.delete = async (id) => {    
    let value = await MatchResultModel.updateOne({_id: id}, {isDeleted: true, deletedAt: Date.now()}).catch((e) => {
        console.log(e);
    });

    if(value.modifiedCount)
        return constantMsgs.MATCH_RESULT_DELETED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.show = async (id) => {
    let value = await MatchResultModel.findOne({_id: id}).populate("matchId").catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async (page_number=1) => {
    let value = await GPLeagueModel.find({}).populate("matchId").catch((e) => {
        console.log(e);
    });
    
    let startingIndex=(PAGINATION_MAX_RECORD_SIZE*(page_number-1));   
    let data=[];
    if(startingIndex<value.length){
        for(let i=0; (i<startingIndex+PAGINATION_MAX_RECORD_SIZE && i<value.length); i++){
            data.push(value[i]);
        }
    }
    return data;
}

module.exports.searchData = async (searchText) => {
    let value = await MatchResultModel.find().populate("matchId").catch((e) => {
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