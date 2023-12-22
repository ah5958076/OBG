const { OK, NOT_FOUND, INVALID } = require("../constants/constants");
const { UNEXPECTED_ERROR, LADDER_ADDED, LADDER_UPDATED, LADDER_DELETED } = require("../constants/messages");
const { checkFile, makeResponse, listData, searchData, writeExcelFile } = require("../services/general");
const LadderModel = require("../models/Ladder");
const {unlinkSync} = require("fs");
const { isObjectIdOrHexString } = require("mongoose");






module.exports.store = async (req, res) => {
    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            entryFee: req.body?.entryFee || "",
            prize: req.body?.prize || "",
            teamSize: req.body?.teamSize || "",
            totalTeams: req.body?.totalTeams || "",
            status: req.body?.status || "",
            startingDate: req.body?.startingDate || "",
            endingDate: req.body?.endingDate || "",
            picture: req.file.path
        }

        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is Empty"));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is Empty"));
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse("Entry Fee is Empty"));
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse("Prize is Empty"));
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team Size is Empty"));
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is Empty"));
        if(!givenObject.status) return res.status(INVALID).send(makeResponse("Status is Empty"));
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse("Starting Date is Empty"));
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse("Ending Date is Empty"));

        let value = await new LadderModel(givenObject).save().catch((e) => {console.log(e)});
        
        if(value) return res.status(OK).send(makeResponse(LADDER_ADDED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    let response = checkFile(req.file);
    if(response.code===OK){
        let id = req.body?.id || "";
        let givenObject = {
            name: req.body?.name || "",
            gameName: req.body?.gameName || "",
            entryFee: req.body?.entryFee || "",
            prize: req.body?.prize || "",
            teamSize: req.body?.teamSize || "",
            totalTeams: req.body?.totalTeams || "",
            status: req.body?.status || "",
            startingDate: req.body?.startingDate || "",
            endingDate: req.body?.endingDate || "",
            picture: req.file.path
        }

        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is Empty"));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game Name is Empty"));
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse("Entry Fee is Empty"));
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse("Prize is Empty"));
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team Size is Empty"));
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is Empty"));
        if(!givenObject.status) return res.status(INVALID).send(makeResponse("Status is Empty"));
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse("Starting Date is Empty"));
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse("Ending Date is Empty"));

        let value = await LadderModel.findOne({_id: id}).catch((e) => {console.log(e)});
        if(value && value.picture){
            try{
                unlinkSync(value.picture);
            }catch(e){}
        }
        value = await LadderModel.updateOne({_id: id}, givenObject).catch((e) => {console.log(e)});
        if(value.modifiedCount) return res.status(OK).send(makeResponse(LADDER_UPDATED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    res.status(response.code).send(makeResponse(response.data));
}

module.exports.delete = async (req, res) => {
    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));
    
    let value=await LadderModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value && value.picture){ 
        try{
            unlinkSync(value.picture) 
        }catch(e){}
    };
    
    value = await LadderModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(!value.deletedCount) return res.status(OK).send(makeResponse(LADDER_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse("Invalid ID"));

    let value = await LadderModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No data found"));
}

module.exports.list = async (req, res) => {
    let page_number = req.query?.pageNum || 1;
    res.status(OK).send(makeResponse("", await listData(LadderModel, page_number)));
}






module.exports.searchData = async (req, res) => {
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name", "gameName"];
    res.status(OK).send(makeResponse("", await searchData(LadderModel, filter, fields)));
}

module.exports.downloadExcel = async (req, res) => {
    let fields = ["name", "gameName", "entryFee", "prize", "teamSize", "totalTeams", "status", "startingDate", "endingDate"];
    let value = await LadderModel.find().catch((e)=>{console.log(e)});
    return res.status(OK).send(makeResponse("File Written successfully", await writeExcelFile(value, fields)));
}