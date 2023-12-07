const { ALLOWED_EXTENSIONS, INVALID, OK, NOT_FOUND, PAGINATION_MAX_RECORD_SIZE, UNAUTHORIZED } = require("../constants/constants");
const userModel = require("../models/User");
const {unlinkSync} = require("fs");
const { EXTENSION_NOT_ALLOWED, AUTH_FAILED, USER_UPDATED, UNEXPECTED_ERROR, USER_DELETED, NO_DATA, PASSWORD_CHANGED, INVALID_PASSWORD } = require("../constants/messages");
const { makeResponse, encryptData, writeExcelFile, checkEncryptedData, listData, searchData } = require("../services/general");




module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    if(!req.body?.username) return res.status(INVALID).send(makeResponse("Username is empty"));
    if(!req.body?.fullName) return res.status(INVALID).send(makeResponse("Full Name is empty"));
    if(!req.body?.password) return res.status(INVALID).send(makeResponse("Password is empty"));
    if(!req.body?.email) return res.status(INVALID).send(makeResponse("Email is empty"));

    let userObject = {
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,
        about: req.body?.about || "",
        password: await encryptData(req.body?.password),
        role: req.body?.role || "User"
    }

    let response = await registerNewUser(userObject);
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let givenObject = {
        fullName: req.body?.fullName || "",
        username: req.body?.username || "",
        email: req.body?.email || "",
        about: req.body?.about || ""
    }

    if(!givenObject.fullName) return res.status(INVALID).send(makeResponse("Full name is empty"));
    if(!givenObject.username) return res.status(INVALID).send(makeResponse("Username is empty"));
    if(!givenObject.email) return res.status(INVALID).send(makeResponse("Email is empty"));
    if(!givenObject.about) return res.status(INVALID).send(makeResponse("About is empty"));
    
    let result = await userModel.updateOne({email: email}, givenObject).catch((e) => {console.log(e)});
    if(!result.modifiedCount) return res.status(OK).send(makeResponse(USER_UPDATED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let email = req.body?.email || "";
    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));

    let result = await userModel.updateOne({email: email}, {$set: {deletedAt: Date.now()}}).catch((e) => {console.log(e)});
    if(result.modifiedCount) return res.status(OK).send(makeResponse(USER_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED))

    let email = req.body?.email || "";
    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));

    let result = await userModel.findOne({email: email}).catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("", result));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED))

    let page_number = req.query?.pageNum || 1;
    return res.status(OK).send(makeResponse("", await listData(userModel, page_number)));
}





module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body.filter.toLowerCase() || "";
    let fields = ["fullName", "username", "email", "about"];
    return res.status(OK).send(makeResponse("", {searchedData: await searchData(userModel, filter, fields)}));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let value = await userModel.find({}).catch((e) => {console.log(e)});
    if(!value) return res.status(OK).send(makeResponse(NO_DATA));

    let response = await writeExcelFile(value, ["fullName", "username", "email", "about"]);
    if(response) return res.status(OK).send(makeResponse("File written successfully", response));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}





module.exports.changePassword = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let email = req.body.email || "";
    let oldPassword = req.body.oldPassword || "";
    let password = req.body.password || "";
    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!oldPassword) return res.status(INVALID).send(makeResponse("Old Password is empty"));
    if(!password) return res.status(INVALID).send(makeResponse("Password is empty"));

    let value = await userModel.findOne({email:data.email}).catch((e) => {console.log(e)});
    if(value){
        if(checkEncryptedData(oldPassword, value.password)){
            let hashedpassword = await encryptData(password);
            if(hashedpassword){
                value = await userModel.updateOne({email: email}, {password: hashedpassword}).catch((e) => {console.log(e)});
                if(value.modifiedCount) return res.status(OK).send(makeResponse(PASSWORD_CHANGED));
            }
        }
        return res.status(INVALID).send(makeResponse(INVALID_PASSWORD));
    }
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.uploadProfilePhoto = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file && req.file.originalname.split(".").pop().toLowerCase())){
        let email = req.body?.email || "";
        let path = req.file?.path || "";
        if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        if(!path) return res.status(INVALID).send(makeResponse("File not found"));
        
        let value = await userModel.updateOne({email: email}, {profilePhoto: path}).catch((e) => {console.log(e)});
        if(value.modifiedCount) return res.status(OK).send(makeResponse("Profile photo uploaded successfully"));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    unlinkSync(req.file.path);
    return res.status(INVALID).send(makeResponse(EXTENSION_NOT_ALLOWED));
}

module.exports.uploadCoverPhoto = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file && req.file.originalname.split(".").pop().toLowerCase())){
        let email = req.body?.email || "";
        let path = req.file?.path || "";
        if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        if(!path) return res.status(INVALID).send(makeResponse("File not found"));
        
        let value = await userModel.updateOne({email: email}, {coverPhoto: path}).catch((e) => {console.log(e)});
        if(value.modifiedCount) return res.status(OK).send(makeResponse("Cover photo uploaded successfully"));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    unlinkSync(req.file.path);
    return res.status(INVALID).send(makeResponse(EXTENSION_NOT_ALLOWED));
}