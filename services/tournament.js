const { OK, NOT_FOUND } = require("../constants/constants");
const { TOURNAMENT_ADDED, UNEXPECTED_ERROR, TOURNAMENT_UPDATED, TOURNAMENT_DELETED, NO_DATA_FOUND } = require("../constants/messages");
const { makeResponse } = require("./general");
const TournamentModel = require("../models/Tournament");



exports.store = async (object) => {
    let value = await new TournamentModel(object).save().catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(TOURNAMENT_ADDED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.update = async (id, object) => {
    let value = await TournamentModel.updateOne({_id: id}, object).catch((e) => {console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(TOURNAMENT_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {
    let value=await TournamentModel.find({_id: ids}).catch((e) => {console.log(e)});
    value.forEach((elem) => {
        if(elem && elem.picture){ 
            try{
                unlinkSync(elem.picture); 
            }catch(e){}
        }
    });
    
    value = await TournamentModel.deleteMany({_id: ids}).catch((e) => {console.log(e)});
    if(value.deletedCount) return {code: OK, data: makeResponse(TOURNAMENT_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let value = await TournamentModel.findOne({_id: id}).populate(['gameName']).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse("", value)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}