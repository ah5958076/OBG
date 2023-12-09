const { isObjectIdOrHexString } = require("mongoose");
const { INVALID, OK, NOT_FOUND, UNAUTHORIZED } = require("../constants/constants");
const { FANTASY_LEAGUE_ADDED, UNEXPECTED_ERROR, FANTASY_LEAGUE_UPDATED, FANTASY_LEAGUE_DELETED, AUTH_FAILED } = require("../constants/messages");
const FantasyLeagueModel = require("../models/FantasyLeague");
const { makeResponse, listData, searchData, writeExcelFile } = require("../services/general");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let givenObject = {
        name: req.body?.name || "",
        grandPrixLeague: req.body?.grandPrixLeague || "",
        totalTeams: req.body?.totalTeams || "",
        teamSize: req.body?.teamSize || "",
        draftDateTime: req.body?.draftDateTime || "",
    }

    if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!givenObject.grandPrixLeague) return res.status(INVALID).send(makeResponse("Grand Prix League Name is empty"));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is empty"));
    if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team Size is empty"));
    if(!givenObject.draftDateTime) return res.status(INVALID).send(makeResponse("Draft Date and Time is empty"));

    let value = await new FantasyLeagueModel(givenObject).save().catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse(FANTASY_LEAGUE_ADDED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let givenObject = {
        id: req.body?.id || "",
        name: req.body?.name || "",
        grandPrixLeague: req.body?.grandPrixLeague || "",
        totalTeams: req.body?.totalTeams || "",
        teamSize: req.body?.teamSize || "",
        draftDateTime: req.body?.draftDateTime || "",
    }

    if(!givenObject.id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!givenObject.grandPrixLeague) return res.status(INVALID).send(makeResponse("Grand Prix League Name is empty"));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is empty"));
    if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team Size is empty"));
    if(!givenObject.draftDateTime) return res.status(INVALID).send(makeResponse("Draft Date and Time is empty"));

    let value = await FantasyLeagueModel.updateOne({_id: givenObject.id}, givenObject).catch((e) => {console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(FANTASY_LEAGUE_UPDATED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"))

    let value = await FantasyLeagueModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(FANTASY_LEAGUE_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"))

    let value = await FantasyLeagueModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    let page_number = req.query?.pageNum || 1;
    res.status(OK).send(makeResponse("", await listData(FantasyLeagueModel, page_number)));
}





module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name", "grandPrixLeague", "type"];
    return res.status(OK).send(makeResponse("", await searchData(FantasyLeagueModel, filter, fields)));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let fields = ["name", "grandPrixLeague", "type", "year", "totalTeams", "teamSize", "draftDateTime", "winner"];
    let value = await FantasyLeagueModel.find().catch((e) => {console.log(e)});
    res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)));
}
