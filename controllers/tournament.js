const { INVALID, OK, NOT_FOUND } = require("../constants/constants");
const { TOURNAMENT_ADDED, UNEXPECTED_ERROR, TOURNAMENT_UPDATED, TOURNAMENT_DELETED } = require("../constants/messages");
const { checkFile, makeResponse, listData, writeExcelFile, searchData } = require("../services/general");
const TournamentModel = require("../models/Tournament");
const {unlinkSync} = require("fs");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response){
        let givenObject={
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            entryFee: req.body?.entryFee || "",
            prize: req.body?.prize || "",
            teamSize: req.body?.teamSize || "",
            totalTeams: req.body?.totalTeams || "",
            startingDate: req.body?.startingDate || "",
            endingDate: req.body?.endingDate || "",
            picture: req.file.path
        }

        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"))
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game name is empty"))
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse("Entry fee is empty"))
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse("Prize is empty"))
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team Size is empty"))
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is empty"))
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse("Starting Date is empty"))
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse("Ending Date is empty"))

        let value = await new TournamentModel(givenObject).save().catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(TOURNAMENT_ADDED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response){
        let id = req.body?.id || "";
        let givenObject={
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            entryFee: req.body?.entryFee || "",
            prize: req.body?.prize || "",
            teamSize: req.body?.teamSize || "",
            totalTeams: req.body?.totalTeams || "",
            startingDate: req.body?.startingDate || "",
            endingDate: req.body?.endingDate || "",
            picture: req.file.path
        }

        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"))
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game name is empty"))
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse("Entry fee is empty"))
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse("Prize is empty"))
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team Size is empty"))
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is empty"))
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse("Starting Date is empty"))
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse("Ending Date is empty"))

        value = await TournamentModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
        if(value.modifiedCount) return res.status(OK).send(makeResponse(TOURNAMENT_UPDATED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));

    let value=await TournamentModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value && value.picture){ unlinkSync(value.picture) }

    value = await TournamentModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(TOURNAMENT_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || ""
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));    

    let value = await TournamentModel.findOne({_id: id}).catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("", value));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let page_number = req.query?.pageNum || 1;
    res.status(OK).send(makeResponse("", await listData(TournamentModel, page_number)));
}







module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body.filter.toLowerCase() || "";
    let fields = ["name", "catagory", "gameName"];
    res.status(OK).send(makeResponse("", await searchData(TournamentModel, filter, fields)));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let fields = ["name", "type", "gameName", "entryFee", "prize", "teamSize", "totalTeams", "startingDate"];
    let value = TournamentModel.find().catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)));
}