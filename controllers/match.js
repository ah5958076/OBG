const { OK, INVALID, NOT_FOUND } = require("../constants/constants");
const { MATCH_ADDED, UNEXPECTED_ERROR, MATCH_UPDATED } = require("../constants/messages");
const { checkFile, makeResponse, listDataWithPopulate, searchDataWithPopulate } = require("../services/general");
const MatchModel = require("../models/Match");
const {unlinkSync} = require("fs");
const { isObjectIdOrHexString } = require("mongoose");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            "userId": req.body?.userId || "",
            "result": req.body?.result || "",
            "video": req.file.path
        }
        
        if(!givenObject.userId) return res.status(INVALID).send(makeResponse("User ID is empty"));
        if(!givenObject.result) return res.status(INVALID).send(makeResponse("Result is empty"));

        let value = await new MatchModel(givenObject).save().catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(MATCH_ADDED));
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
            "userId": req.body?.userId || "",
            "result": req.body?.result || "",
            "video": req.file.path
        }
        
        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));
        if(!givenObject.userId) return res.status(INVALID).send(makeResponse("User ID is empty"));
        if(!givenObject.result) return res.status(INVALID).send(makeResponse("Result is empty"));
        
        let value = await MatchModel.findOne({_id: id}).catch((e) => {console.log(e)});
        if(value && value.picture) { 
            try{
                unlinkSync(value.picture) 
            }catch(e){}
        }
        
        value = await MatchModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
        if(value.modifiedCount) return res.status(OK).send(makeResponse(MATCH_UPDATED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    res.status(response.code).send(makeResponse(response.data));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));
    
    let value = await MatchModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value && value.picture) { 
        try{
            unlinkSync(value.picture) 
        }catch(e){}
    }
    
    value = await MatchModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(MATCH_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value = await MatchModel.findOne({_id: id})
        .populate(["userId"])
        .catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let page_number = req.query?.pageNum || 1;
    let fields = ["userId"];
    res.status(OK).send(makeResponse("", await listDataWithPopulate(MatchModel, page_number, fields)));
}







module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["userId"];
    res.status(OK).send(makeResponse("", await searchDataWithPopulate(MatchModel, filter, fields)));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    return res.status(NOT_FOUND).send(makeResponse("UNDER-CONSTRUCTION"));

    // let value = await MatchModel.find().populate(["userId"]).catch((e)=>{console.log(e)});
    // let fields = [];

    // return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)))
}