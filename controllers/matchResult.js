const { UNAUTHORIZED, INVALID, OK, NOT_FOUND } = require("../constants/constants");
const { AUTH_FAILED, MATCH_RESULT_ADDED, UNEXPECTED_ERROR, MATCH_RESULT_UPDATED } = require("../constants/messages");
const { makeResponse, listDataWithPopulate, searchDataWithPopulate } = require("../services/general");
const MatchResultModel = require("../models/MatchResult");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let givenObject = {
        name: req.body?.name || "",
        gameName: req.body?.gameName || "",
        winner: req.body?.winner || "",
        matchId: req.body?.matchId || ""
    }

    if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is empty"));
    if(!givenObject.winner) return res.status(INVALID).send(makeResponse("Winner is empty"));
    if(!givenObject.matchId) return res.status(INVALID).send(makeResponse("Match ID is empty"));
    
    let value = await new MatchResultModel(givenObject).save().catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse(MATCH_RESULT_ADDED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.body?.id || "";
    let givenObject = {
        name: req.body?.name || "",
        gameName: req.body?.gameName || "",
        winner: req.body?.winner || "",
        matchId: req.body?.matchId || ""
    }

    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is empty"));
    if(!givenObject.winner) return res.status(INVALID).send(makeResponse("Winner is empty"));
    if(!givenObject.matchId) return res.status(INVALID).send(makeResponse("Match ID is empty"));
    
    let value = await MatchResultModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(MATCH_RESULT_UPDATED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    let givenObject = {
        isDeleted: true, 
        deletedAt: Date.now()
    }
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    
    let value = await MatchResultModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(MATCH_RESULT_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    let value = await MatchResultModel.findOne({_id: id}).populate(["matchId"]).catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("", value));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let page_number = req.query?.pageNum || 1;
    let fields = ["matchId"];
    res.status(OK).send(makeResponse("", listDataWithPopulate(MatchResultModel, page_number, fields)));
}







module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body?.filter.toLowerCase() || "";
    let fields = ["name", "gameName"];
    let population_fields = ["matchId"];
    res.status(OK).send(makeResponse("", searchDataWithPopulate(MatchResultModel, filter, fields, population_fields)));
}