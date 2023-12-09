const { OK, INVALID, NOT_FOUND, UNAUTHORIZED } = require("../constants/constants");
const { LADDER_RESULT_ADDED, UNEXPECTED_ERROR, LADDER_RESULT_UPDATED, LADDER_RESULT_DELETED, AUTH_FAILED } = require("../constants/messages");
const { checkFile, makeResponse, listDataWithPopulate, searchDataWithPopulate } = require("../services/general");
const LadderResultModel = require("../models/LadderResult");
const {unlinkSync} = require("fs");
const { isObjectIdOrHexString } = require("mongoose");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            teamId: req.body?.teamId || "",
            video: req.file.path
        }

        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));        
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is empty"));        
        if(!givenObject.teamId) return res.status(INVALID).send(makeResponse("Team is empty"));        

        let value = await new LadderResultModel(givenObject).save().catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(LADDER_RESULT_ADDED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let response = checkFile(req.file);
    if(response.code===OK){
        let id = req.body?.id || "";
        let givenObject = {
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            teamId: req.body?.teamId || "",
            video: req.file.path
        }

        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));        
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));        
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is empty"));        
        if(!givenObject.teamId) return res.status(INVALID).send(makeResponse("Team is empty"));        

        let value = await LadderResultModel.findOne({_id: id}).catch((e) => {console.log(e)});
        if(value && value.picture) { unlinkSync(value.picture) }

        value = await LadderResultModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(LADDER_RESULT_UPDATED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    res.status(response.code).send(makeResponse(response.data));
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

    let value = await LadderResultModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value && value.video){
        try{
            unlinkSync(value.video);
        }catch(e){}
    }
    value = await LadderResultModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(LADDER_RESULT_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
 
    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value = await LadderResultModel.findOne({_id: id, isDeleted: false})
        .populate(["ladderId", "submittedBy", "teamId"])
        .catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
 
    let page_number = req.query?.pageNum || 1;
    let population_fields = ["ladderId", "submittedBy", "teamId"];
    res.status(OK).send(makeResponse("", await listDataWithPopulate(LadderResultModel, page_number, population_fields)));
}






module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name", "gameName"];
    let population_fields = ["ladderId", "submittedBy", "teamId"];
    res.status(OK).send(makeResponse("", await searchDataWithPopulate(LadderResultModel, filter, fields, population_fields)));
}

module.exports.downloadExcel = async (req, res) => {
    return res.status(NOT_FOUND).send(makeResponse("No URL EXISTS"))
}