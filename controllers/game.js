const { NOT_FOUND, OK, INVALID } = require("../constants/constants");
const { IMAGE_NOT_UPLOADED, UNEXPECTED_ERROR, NAME_EMPTY, TYPE_EMPTY, PLATFORM_EMPTY } = require("../constants/messages");
const { makeResponse, listData, checkFile, searchData, writeExcelFile } = require("../services/general");
const { store, update, deleteRecord, show } = require("../services/games");
const GameModel = require("../models/Game");
const { isObjectIdOrHexString } = require("mongoose");






module.exports.store = async (req, res) => {
    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            name: req.body?.name || "",
            type: req.body?.type || "",
            platform: req.body?.platform || "",
            picture: response.data,
        }
        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
        if(!givenObject.type) return res.status(INVALID).send(makeResponse(TYPE_EMPTY));
        if(!givenObject.platform) return res.status(INVALID).send(makeResponse(PLATFORM_EMPTY));
        if(!givenObject.picture) return res.status(INVALID).send(makeResponse(IMAGE_NOT_UPLOADED));

        response = await store(givenObject);
        return res.status(response.code).send(response.data);
    }  
    return res.status(response.code).send(makeResponse(response.data));
}



module.exports.update = async (req, res) => {
    let id = req?.body?.id;
    let oldPicture = req?.body?.oldPicture;
    let response = checkFile(req.file);
    if(response.code===OK || (oldPicture && !req.file)) {
        let givenObject = {
            name: req.body?.name,
            type: req.body?.type,
            platform: req.body?.platform,
            picture: req.file?.path,
        }
        if(!req.file)
            delete givenObject.picture;

        if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
        if(!givenObject.type) return res.status(INVALID).send(makeResponse(TYPE_EMPTY));
        if(!givenObject.platform) return res.status(INVALID).send(makeResponse(PLATFORM_EMPTY));

        response = await update(id, givenObject);
        return res.status(response.code).send(response.data);
    }
    return res.status(response.code).send(makeResponse(response.data));
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
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let response = await show(id);
    return res.status(response.code).send(response.data);
}



module.exports.list = async (req, res) => {
    let page_number = req.query?.pageNum || 1;
    return res.status(OK).send(makeResponse("", await listData(GameModel, page_number)));
}



module.exports.searchData = async (req, res) => {
    let filter = req.body.filter?.toLowerCase() || "";
    let fields = ["name", "type", "platform"];
    return res.status(OK).send(makeResponse("", await searchData(GameModel, filter, fields)));
}



module.exports.downloadExcel = async (req, res) => {
    let fields = ["name", "type", "platform"];
    let value = await GameModel.find({}).catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)));
}