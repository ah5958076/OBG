const { LADDER_ADDED, LADDER_DELETED, LADDER_UPDATED, UNEXPECTED_ERROR, NO_DATA_FOUND } = require("../constants/messages");
const { OK, NOT_FOUND } = require("../constants/constants");
const { makeResponse } = require("./general");
const LadderModel = require("../models/Ladder");





exports.store = async (object) => {
    let value = await new LadderModel(object).save().catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(LADDER_ADDED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.update = async (id, object) => {
    if(object.picture){
        let value = await LadderModel.findOne({_id: id}).catch((e) => {console.log(e)});
        if(value && value.picture){
            try{
                unlinkSync(value.picture);
            }catch(e){}
        }
    }
    value = await LadderModel.updateOne({_id: id}, object).catch((e) => {console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(LADDER_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {
    let value=await LadderModel.find({_id: ids}).catch((e) => {console.log(e)});
    value.forEach((elem) => {
        if(elem && elem.picture){ 
            try{
                unlinkSync(elem.picture) 
            }catch(e){}
        };
    });
    
    value = await LadderModel.deleteMany({_id: ids}).catch((e) => {console.log(e)});
    if(value.deletedCount) return {code: OK, data: makeResponse(LADDER_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let value = await LadderModel.findOne({_id: id}).populate(["gameName"]).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse("", value)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}