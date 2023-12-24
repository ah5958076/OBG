const { OK, NOT_FOUND } = require("../constants/constants");
const { makeResponse } = require("./general");
const GPLeagueModel = require("../models/GPLeague");
const { GPLEAGUE_ADDED, UNEXPECTED_ERROR, GPLEAGUE_UPDATED, GPLEAGUE_DELETED, NO_DATA_FOUND } = require("../constants/messages");
const { unlinkSync } = require("fs")



exports.store = async (object) => {
    let value = await new GPLeagueModel(object).save().catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(GPLEAGUE_ADDED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.update = async (id, object) => {
    if(object.picture){
        let value=await GPLeagueModel.findOne({_id: id}).catch((e) => {console.log(e)});
        if(value && value.picture){ 
            try{
                unlinkSync(value.picture)
            }catch(e){}
        }
    }

    value = await GPLeagueModel.updateOne({_id: id}, object).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(GPLEAGUE_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {    
    let value=await GPLeagueModel.find({_id: ids}).catch((e) => {console.log(e)});
    if(value && value.picture){ 
        value.forEach((elem) => {
            try{
                unlinkSync(elem.picture) 
            }catch(e){}
        });
    }
    value = await GPLeagueModel.deleteMany({_id: ids}).catch((e) => {console.log(e)});
    if(value.deletedCount) return {code: OK, data: makeResponse(GPLEAGUE_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let value = await GPLeagueModel.findOne({_id: id}).populate(['gameName']).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse("", value)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}