const { isObjectIdOrHexString } = require("mongoose");
const { INVALID, NOT_FOUND, OK } = require("../constants/constants");
const { TEAM_ADDED, UNEXPECTED_ERROR, TEAM_UPDATED, TEAM_MEMBERS_EXCEED, TEAM_DELETED } = require("../constants/messages");
const TeamModel = require("../models/Team");
const { searchData, listData } = require("../services/general");




module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let name = req.body?.name || "";
    let size = req.body?.size || "";
    if(!name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!size) return res.status(INVALID).send(makeResponse("Size is empty"));
    
    let value = await new TeamModel({name, size}).save().catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse(TEAM_ADDED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.body?.id || "";
    let name = req.body?.name || "";
    let size = req.body?.size || "";
    let member_id = req.body?.member_id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(NOT_FOUND).send(makeResponse("Invalid ID"));
    if(!name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!size) return res.status(INVALID).send(makeResponse("Size is empty"));
    if(!member_id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));

    let value= await TeamModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value){
        if(value.members.length < value.size){
            value.members.push(member_id);
            value = await TeamModel.updateOne({_id: id}, {size: size, members: value.members}).catch((e)=>{console.log(e)});
            if(value.modifiedCount) return res.status(OK).send(makeResponse(TEAM_UPDATED));
        }
        return res.status(INVALID).send(makeResponse(TEAM_MEMBERS_EXCEED));
    }
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let id = req.params?.id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(NOT_FOUND).send(makeResponse("Invalid ID"));
    
    let value = await TeamModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(TEAM_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(NOT_FOUND).send(makeResponse("Invalid ID"));

    let value = await TeamModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED))

    let page_number = req.query?.pageNum || 1;
    return res.status(OK).send(makeResponse("", await listData(TeamModel, page_number)));
}





module.exports.search = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name"];
    return res.status(OK).send(makeResponse("", {searchedData: await searchData(TeamModel, filter, fields)}));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let value = await TeamModel.find({}).catch((e) => {console.log(e)});
    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, ["name", "size"])));
}