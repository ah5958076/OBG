const { isObjectIdOrHexString } = require("mongoose");
const { INVALID, OK, NOT_FOUND } = require("../constants/constants");
const { UNEXPECTED_ERROR, INVALID_ID, NAME_EMPTY, GRAND_PRIX_NAME_EMPTY, TOTAL_TEAMS_EMPTY, TEAM_SIZE_EMPTY, DRAFT_DATETIME_EMPTY } = require("../constants/messages");
const FantasyLeagueModel = require("../models/FantasyLeague");
const { makeResponse, writeExcelFile, computeDate, listDataWithPopulate, searchDataWithPopulate } = require("../services/general");
const { store, update, deleteRecord, show } = require("../services/fantasyLeague");





module.exports.store = async (req, res) => {

    let givenObject = {
        name: req.body?.name || "",
        grandPrixLeague: req.body?.grandPrixLeague || "",
        totalTeams: req.body?.totalTeams || "",
        teamSize: req.body?.teamSize || "",
        draftDateTime: req.body?.draftDateTime || "",
    }

    if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
    if(!givenObject.grandPrixLeague) return res.status(INVALID).send(makeResponse(GRAND_PRIX_NAME_EMPTY));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY));
    if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse(TEAM_SIZE_EMPTY));
    if(!givenObject.draftDateTime) return res.status(INVALID).send(makeResponse(DRAFT_DATETIME_EMPTY));

    let response = await store(givenObject);
    return res.status(response.code).send(response.data);
}



module.exports.update = async (req, res) => {
    let id = req.body?.id || "";
    let givenObject = {
        name: req.body?.name || "",
        grandPrixLeague: req.body?.grandPrixLeague || "",
        totalTeams: req.body?.totalTeams || "",
        teamSize: req.body?.teamSize || "",
        draftDateTime: req.body?.draftDateTime || "",
    }

    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
    if(!givenObject.grandPrixLeague) return res.status(INVALID).send(makeResponse(GRAND_PRIX_NAME_EMPTY));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY));
    if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse(TEAM_SIZE_EMPTY));
    if(!givenObject.draftDateTime) return res.status(INVALID).send(makeResponse(DRAFT_DATETIME_EMPTY));

    let response = await update(id, givenObject);
    return res.status(response.code).send(response.data);
}



module.exports.delete = async (req, res) => {
    let ids = req?.body?.ids || [];
    if(!ids?.length) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    for(i of ids){
        if(!isObjectIdOrHexString(i)) return res.status(INVALID).send(makeResponse(INVALID_ID));
    }

    let response = await deleteRecord(ids);
    return res.status(response.code).send(response.data);
}



module.exports.show = async (req, res) => {
    let id = req.params?.id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse(INVALID_ID))

    let response = await show(id);
    return res.status(response.code).send(response.data);
}



module.exports.list = async (req, res) => {
    let page_number = req.query?.pageNum || 1;
    console.log(page_number)
    let population_fields = ['grandPrixLeague']
    res.status(OK).send(makeResponse("", await listDataWithPopulate(FantasyLeagueModel, page_number, population_fields)));
}



module.exports.searchData = async (req, res) => {
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name", "grandPrixLeague->name,", "type"];
    let population_fields = ["grandPrixLeague"];
    return res.status(OK).send(makeResponse("", await searchDataWithPopulate(FantasyLeagueModel, filter, fields, population_fields)));
}



module.exports.downloadExcel = async (req, res) => {
    let fields = ["name", "grandPrixLeague", "type", "year", "totalTeams", "teamSize", "draftDateTime", "winner"];
    let value = await FantasyLeagueModel.find().populate(["grandPrixLeague"]).catch((e) => {console.log(e)});

    let data = [];
    value.forEach((obj) => {
        let datum = {
            name: obj.name,
            grandPrixLeague: obj.grandPrixLeague.name,
            type: obj.type,
            year: obj.year,
            totalTeams: obj.totalTeams,
            teamSize: obj.teamSize,
            draftDateTime: computeDate(obj.draftDateTime),
            winner: obj.winner
        }
        data.push(datum);
    })

    res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(data, fields)));
}
