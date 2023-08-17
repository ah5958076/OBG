const constantMsgs = require("../constants/messages");
const {PAGINATION_MAX_RECORD_SIZE} = require("../constants/constants");
const TournamentResultModel = require("../models/TournamentResult");


module.exports.store = async (req) => {
    let data = req.body;
    if(!(data.name && data.gameName && data.teamId))
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.VIDEO_NOT_UPLOADED;
    
    
    let objToInsert={
        name: data.name,
        gameName: data.gameName,
        video: req.file.path,
        teamId: data.teamId
    }
    let value = await new TournamentResultModel(objToInsert).save().catch((e) => {
        console.log(e);
    });
    if(value)
        return constantMsgs.TOURNAMENT_RESULT_ADDED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.update = async (req) => {
    let data = req.body;
    
    let id=data.id;
    delete data.id;
    let value = await TournamentResultModel.updateOne({_id: id}, data).catch((e) => {
        console.log(e);
    });
    if(value.modifiedCount)
        return constantMsgs.TOURNAMENT_RESULT_UPDATED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.delete = async (id) => {    
    let value = await TournamentResultModel.updateOne({_id: id}, {isDeleted: true, deletedAt: Date.now()}).catch((e) => {
        console.log(e);
    });

    if(value.modifiedCount)
        return constantMsgs.TOURNAMENT_RESULT_DELETED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.show = async (id) => {
    let value = await TournamentResultModel.findOne({_id: id}).populate(["tournamentId","teamId","submittedBy"]).catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async (page_number=1) => {
    let value = await GPLeagueModel.find({}).populate(["tournamentId","teamId","submittedBy"]).catch((e) => {
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
    let value = await TournamentResultModel.find().populate(["tournamentId","teamId","submittedBy"]).catch((e) => {
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