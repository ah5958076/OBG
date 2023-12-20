const { OK, SERVER_ERROR, NOT_FOUND } = require("../constants/constants");
const { GRAND_PRIX_ADDED, UNEXPECTED_ERROR, GRAND_PRIX_UPDATED, GRAND_PRIX_DELETED, NO_DATA_FOUND } = require("../constants/messages");
const { makeResponse } = require("./general");
const GrandPrixModel = require("../models/GrandPrix")



exports.store = async (grandPrixObject) => {
    let value = await new GrandPrixModel(grandPrixObject).save().catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(GRAND_PRIX_ADDED)};
    return {code: SERVER_ERROR, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.update = async (id, grandPrixObject) => {
    let value = await GrandPrixModel.updateOne({_id: id}, grandPrixObject).catch((e) => {console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(GRAND_PRIX_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {
    let value = await GrandPrixModel.deleteMany({_id: ids}).catch((e) => {console.log(e)});
    if(value.deletedCount) return {code: OK, data: makeResponse(GRAND_PRIX_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let value = await GrandPrixModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse("", value)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}



exports.updateStatus = async (id, object) => {
    let value = await GrandPrixModel.updateOne({_id:id}, object).catch((e)=>{console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(GRAND_PRIX_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}