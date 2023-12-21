const { NOT_FOUND, OK } = require("../constants/constants");
const { GAME_ADDED, GAME_UPDATED, GAME_DELETED, UNEXPECTED_ERROR, NO_DATA_FOUND } = require("../constants/messages");
const GameModel = require("../models/Game");
const { makeResponse } = require("./general");





exports.store = async (object) => {
    let value = await new GameModel(object).save().catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(GAME_ADDED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.update = async (id, object) => {
    let value = await GameModel.findOne({_id: id}).catch((e) => {console.log(e)});

    if(value && value.picture && object.picture) {
        try{
            unlinkSync(value.picture);
        }catch(e){}
    }

    value = await GameModel.updateOne({_id: id}, object).catch((e)=>{console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(GAME_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {
    let value=await GameModel.find({_id: ids}).catch((e) => {console.log(e)});
    value.forEach((elem) => {
        if(elem && elem.picture) {
            try{
                unlinkSync(elem.picture);
            }catch(e){}
        }
    });

    value = await GameModel.deleteMany({_id: ids}).catch((e) => {console.log(e)});
    if(value.deletedCount) return {code: OK, data: makeResponse(GAME_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let value = await GameModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse("", value)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}