const { NOT_FOUND, OK } = require("../constants/constants");
const { FANTASY_LEAGUE_ADDED, UNEXPECTED_ERROR, FANTASY_LEAGUE_UPDATED, FANTASY_LEAGUE_DELETED, NO_DATA_FOUND } = require("../constants/messages");
const FantasyLeagueModel = require("../models/FantasyLeague");
const { makeResponse } = require("./general");





exports.store = async (object) => {
    let value = await new FantasyLeagueModel(object).save().catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(FANTASY_LEAGUE_ADDED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.update = async (id, object) => {
    let value = await FantasyLeagueModel.updateOne({_id: id}, object).catch((e) => {console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(FANTASY_LEAGUE_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {
    let value = await FantasyLeagueModel.deleteMany({_id: ids}).catch((e) => {console.log(e)});
    if(value.deletedCount) return {code: OK, data: makeResponse(FANTASY_LEAGUE_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let value = await FantasyLeagueModel.findOne({_id: id}).populate(["grandPrixLeague"]).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse("", value)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}