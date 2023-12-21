const { INVALID, OK, NOT_FOUND } = require("../constants/constants");
const userModel = require("../models/User");
const { UNEXPECTED_ERROR, USERNAME_EMPTY, NAME_EMPTY, PASSWORD_EMPTY, EMAIL_EMPTY, INVALID_ID, OLD_PASSWORD_EMPTY } = require("../constants/messages");
const { makeResponse, encryptData, writeExcelFile, listData, searchData, checkFile } = require("../services/general");
const {registerNewUser, update, deleteRecord, show, changePassword, uploadProfilePhoto, uploadCoverPhoto, addInventory } = require("../services/user");
const { isObjectIdOrHexString } = require("mongoose");






module.exports.store = async (req, res) => {
    if(!req.body?.username) return res.status(INVALID).send(makeResponse(USERNAME_EMPTY));
    if(!req.body?.fullName) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
    if(!req.body?.password) return res.status(INVALID).send(makeResponse(PASSWORD_EMPTY));
    if(!req.body?.email) return res.status(INVALID).send(makeResponse(EMAIL_EMPTY));

    let userObject = {
        username: req.body?.username,
        fullName: req.body?.fullName,
        email: req.body?.email,
        about: req.body?.about || "",
        password: await encryptData(req.body?.password),
        role: req.body?.role || "User"
    }

    let response = await registerNewUser(userObject);
    return res.status(response.code).send(response.data);
}



module.exports.update = async (req, res) => {
    let id = req.body?.id;
    let givenObject = {
        fullName: req.body?.fullName || "",
        username: req.body?.username || "",
        email: req.body?.email || "",
        about: req.body?.about || ""
    }

    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!givenObject.fullName) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
    if(!givenObject.username) return res.status(INVALID).send(makeResponse(USERNAME_EMPTY));
    if(!givenObject.email) return res.status(INVALID).send(makeResponse(EMAIL_EMPTY));
    
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
    return res.status(OK).send(makeResponse("", await listData(userModel, page_number, {deletedAt: null})));
}



module.exports.searchData = async (req, res) => {
    let filter = req.body.filter?.toLowerCase() || "";
    let fields = ["fullName", "username", "email", "about"];
    return res.status(OK).send(makeResponse("", await searchData(userModel, filter, fields)));
}



module.exports.downloadExcel = async (req, res) => {
    let fields = ["fullName", "username", "email", "about"];
    let value = await userModel.find({}).catch((e) => {console.log(e)});

    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)));
}



module.exports.changePassword = async (req, res) => {
    let email = req.user?.email || "";
    let oldPassword = req.body.oldPassword || "";
    let password = req.body.password || "";
    
    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!oldPassword) return res.status(INVALID).send(makeResponse(OLD_PASSWORD_EMPTY));
    if(!password) return res.status(INVALID).send(makeResponse(PASSWORD_EMPTY));

    let response = await changePassword(email, oldPassword, password);
    return res.status(response.code).send(response.data);
}



module.exports.addInventory = async (req, res) => {
    let inventoryID = req.body?.inventoryID;
    let userID = req.body?.userID;

    if(!inventoryID) return res.send(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!userID) return res.send(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));

    let response = await addInventory(userID, inventoryID);
    return res.status(response.code).send(response.data);
}



module.exports.uploadProfilePhoto = async (req, res) => {
    let response = checkFile(req.file);
    if(response.code===OK){
        let email = req.body?.email || "";
        let path = response.data || "";
        if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        if(!path) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        
        response = await uploadProfilePhoto(email, path);
        return res.status(respnse.code).send(response.data);
    }
    return res.status(response.code).send(makeResponse(response.data));
}



module.exports.uploadCoverPhoto = async (req, res) => {
    let response = checkFile(req.file);
    if(response.code===OK){
        let email = req.body?.email || "";
        let path = response.data || "";
        if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        if(!path) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        
        response = await uploadCoverPhoto(email, path);
        return res.status(response.code).send(response.data);
    }
    return res.status(response.code).send(makeResponse(response.data));
}