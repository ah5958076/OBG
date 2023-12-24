const { OK, INVALID, NOT_FOUND } = require("../constants/constants");
const { UNEXPECTED_ERROR, NAME_EMPTY, INVALID_ID } = require("../constants/messages");
const { checkFile, makeResponse, searchData, listData } = require("../services/general");
const InventoryModel = require("../models/Inventory");
const { isObjectIdOrHexString } = require("mongoose");
const {store, update, deleteRecord, show} = require("../services/inventory");




module.exports.store = async (req, res) => {
    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            name: req.body?.name || "",
            picture: response.data,
        }
        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
        
        response = await store(givenObject);
        return res.status(response.code).send(response.data);
    }
    return res.status(response.code).send(makeResponse(response.data));
}



module.exports.update = async (req, res) => {
    let id = req.body?.id;
    let oldPicture = req.body?.oldPicture;
    let response = checkFile(req.file);
    if(response.code===OK || (!req.file && oldPicture)){
        let givenObject = {
            name: req.body?.name || "",
            picture: response.data,
        }

        if(!req.file)
            delete givenObject.picture;

        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
        
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
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse(INVALID_ID));

    let response = await show(id);
    return res.status(response.code).send(response.data);
}



module.exports.list = async (req, res) => {
    let page_number = req.query?.pageNum || 1;
    return res.status(OK).send(makeResponse("", await listData(InventoryModel, page_number)))
}



module.exports.searchData = async (req, res) => {
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name"];
    return res.status(OK).send(makeResponse("", await searchData(InventoryModel, filter, fields)))
}