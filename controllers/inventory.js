const { OK, INVALID, NOT_FOUND, UNAUTHORIZED } = require("../constants/constants");
const { INVENTORY_ADDED, UNEXPECTED_ERROR, INVENTORY_UPDATED, INVENTORY_DELETED, AUTH_FAILED } = require("../constants/messages");
const { checkFile, makeResponse, listData, searchData } = require("../services/general");
const InventoryModel = require("../models/Inventory");
const {unlinkSync}=require("fs");
const { isObjectIdOrHexString } = require("mongoose");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            name: req.body?.name || "",
            picture: req.file.path,
        }
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
        
        let value = await new InventoryModel(givenObject).save().catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(INVENTORY_ADDED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            id: req.body?.id || "",
            name: req.body?.name || "",
            picture: req.file.path,
        }
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
        if(!givenObject.id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        
        let value=await InventoryModel.findOne({_id: givenObject.id}).catch((e) => {console.log(e)});
        if(value && value.picture){ unlinkSync(value.picture) }

        value = await InventoryModel.updateOne({_id: givenObject.id}, givenObject).catch((e) => {console.log(e)});
        if(value.modifiedCount) return res.status(OK).send(makeResponse(INVENTORY_UPDATED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    res.status(response.code).send(makeResponse(response.data));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));
    
    let value=await InventoryModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value && value.picture){ 
        try{
            unlinkSync(value.picture) 
        }catch(e){}
    }
    
    value = await InventoryModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(INVENTORY_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value = await InventoryModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let value = await InventoryModel.find().catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("", value));
}





module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name"];
    return res.status(OK).send(makeResponse("", await searchData(InventoryModel, filter, fields)))
}