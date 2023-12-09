const { OK, INVALID, NOT_FOUND, UNAUTHORIZED } = require("../constants/constants");
const { TOURNAMENT_RESULT_ADDED, UNEXPECTED_ERROR, TOURNAMENT_RESULT_UPDATED, TOURNAMENT_RESULT_DELETED, AUTH_FAILED } = require("../constants/messages");
const { checkFile, makeResponse, listDataWithPopulate, searchDataWithPopulate, writeExcelFile } = require("../services/general");
const TournamentResultModel = require("../models/TournamentResult");
const {unlinkSync} = require("fs");
const { isObjectIdOrHexString } = require("mongoose");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject={
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            teamId: req.body?.teamId || "",
            video: req.file.path
        }

        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is empty"))
        if(!givenObject.teamId) return res.status(INVALID).send(makeResponse("Team ID is empty"))
    
        let value = await new TournamentResultModel(givenObject).save().catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(TOURNAMENT_RESULT_ADDED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let id=req.body?.id || "";
        let givenObject={
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            teamId: req.body?.teamId || "",
            video: req.file.path
        }
        
        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is empty"))
        if(!givenObject.teamId) return res.status(INVALID).send(makeResponse("Team ID is empty"))
        
        let value = await TournamentResultModel.findOne({_id: id}).catch((e) => {console.log(e)});
        if(value && value.picture) {
            try{
                unlinkSync(value.picture)
            }catch(e){}
        }

        value = await TournamentResultModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
        if(value.modifiedCount) return res.status(OK).send(makeResponse(TOURNAMENT_RESULT_UPDATED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    let givenObject = {
        isDeleted: true, 
        deletedAt: Date.now()
    }
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value = await TournamentResultModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value && value.video){
        try{
            unlinkSync(value.video);
        }catch(e){}
    }

    value = await TournamentResultModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(TOURNAMENT_RESULT_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value = await TournamentResultModel.findOne({_id: id})
        .populate(["tournamentId","teamId","submittedBy"])
        .catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let page_number = req.query?.pageNum || 1;
    let fields = ["tournamentId", "teamId", "submittedBy"];
    res.status(OK).send(makeResponse("", await listDataWithPopulate(TournamentResultModel, page_number, fields)));
}






module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name", "gameName"];
    let population_fields = ["tournamentId", "teamId", "submittedBy"];
    res.status(OK).send(makeResponse("", await searchDataWithPopulate(TournamentResultModel, filter, fields, population_fields)));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let fields = ["name", "gameName"];
    let value = await TournamentResultModel.find({})
        .populate(["tournamentId","teamId","submittedBy"])
        .catch((e)=>{console.log(e)});

    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value || [], fields)));

}