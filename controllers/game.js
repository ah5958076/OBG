const { NOT_FOUND, OK, INVALID } = require("../constants/constants");
const { IMAGE_NOT_UPLOADED, GAME_ADDED, UNEXPECTED_ERROR, GAME_UPDATED, GAME_DELETED } = require("../constants/messages");
const {unlinkSync}=require("fs");
const { makeResponse, listData, checkFile, searchData, writeExcelFile } = require("../services/general");
const GameModel = require("../models/Game");
const { isObjectIdOrHexString } = require("mongoose");




module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            name: req.body?.name || "",
            type: req.body?.type || "",
            platform: req.body?.platform || "",
            picture: req.file.path,
        }
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
        if(!givenObject.type) return res.status(INVALID).send(makeResponse("Type is empty"));
        if(!givenObject.platform) return res.status(INVALID).send(makeResponse("Platform is empty"));
        if(!givenObject.picture) return res.status(INVALID).send(makeResponse(IMAGE_NOT_UPLOADED));

        let value = await new GameModel(givenObject).save().catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(GAME_ADDED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }  
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let givenObject = {
        name: req.body?.name,
        type: req.body?.type,
        platform: req.body?.platform,
        picture: req.file?.path,
    }
    if(!req.body?.id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!givenObject.type) return res.status(INVALID).send(makeResponse("Size is empty"));
    if(!givenObject.platform) return res.status(INVALID).send(makeResponse("Platform is empty"));
    if(!givenObject.picture) return res.status(INVALID).send(makeResponse(IMAGE_NOT_UPLOADED));

    let value=await GameModel.findOne({_id: req.body?.id}).catch((e) => {console.log(e)});
    if(value && value.picture) unlinkSync(value.picture);
    value = await GameModel.updateOne({_id: req.body?.id}, givenObject).catch((e)=>{console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(GAME_UPDATED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value=await GameModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) {
        try{
            unlinkSync(value.picture);
        }catch(e){}
    }

    value = await GameModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(GAME_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value = await GameModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED))

    let page_number = req.query?.pageNum || 1;
    return res.status(OK).send(makeResponse("", await listData(GameModel, page_number)));
}





module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body.filter?.toLowerCase() || "";
    let fields = ["name", "type", "platform"];
    return res.status(OK).send(makeResponse("", {searchedData: await searchData(GameModel, filter, fields)}));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let fields = ["name", "size"];
    let value = await GameModel.find({}).catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)));
}