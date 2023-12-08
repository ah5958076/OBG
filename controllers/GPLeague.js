const { UNAUTHORIZED, INVALID, OK, NOT_FOUND } = require("../constants/constants");
const { AUTH_FAILED, GPLEAGUE_ADDED, UNEXPECTED_ERROR, GPLEAGUE_UPDATED, GPLEAGUE_DELETED } = require("../constants/messages");
const {unlinkSync} = require("fs");
const GPLeagueModel = require("../models/GPLeague");
const { makeResponse, checkFile, listData, searchData, writeExcelFile } = require("../services/general");




module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            name: req.body.name,
            gameName: req.body.gameName,
            entryFee: req.body.entryFee,
            prize: req.body.prize,
            teamSize: req.body.teamSize,
            totalTeams: req.body.totalTeams,
            startingDate: req.body.startingDate,
            endingDate: req.body.endingDate,
            picture: response.data
        }

        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game name is empty"));
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse("Entry fee is empty"));
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse("Prize is empty"));
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team size is empty"));
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total teams is empty"));
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse("Starting date is empty"));
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse("Ending date is empty"));
        
        let value = await new GPLeagueModel(givenObject).save().catch((e) => {console.log(e)});
        
        if(value)
            return res.status(OK).send(makeResponse(GPLEAGUE_ADDED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject = {
            id: req.body.id,
            name: req.body.name,
            gameName: req.body.gameName,
            entryFee: req.body.entryFee,
            prize: req.body.prize,
            teamSize: req.body.teamSize,
            totalTeams: req.body.totalTeams,
            startingDate: req.body.startingDate,
            endingDate: req.body.endingDate,
            picture: response.data
        }

        if(!givenObject.id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse("Game name is empty"));
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse("Entry fee is empty"));
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse("Prize is empty"));
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse("Team size is empty"));
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total teams is empty"));
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse("Starting date is empty"));
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse("Ending date is empty"));
        
        let value=await GPLeagueModel.findOne({_id: givenObject.id}).catch((e) => {console.log(e)});
        if(value && value.picture){ unlinkSync(value.picture)}
    
        value = await GPLeagueModel.updateOne({_id:givenObject.id}, givenObject).catch((e) => {console.log(e)});
        if(value) return res.status(OK).send(makeResponse(GPLEAGUE_UPDATED));
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id;
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    
    let value=await GPLeagueModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value && value.picture){ unlinkSync(value.picture) }
    value = await GPLeagueModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(GPLEAGUE_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id;
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));    

    let value = await GPLeagueModel.findOne({_id: id}).catch((e) => {console.log(e)});
    return res.status(OK).send("", value);
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let page_number = req.query?.pageNum || 1;
    return res.status(OK).send(makeResponse("", listData(GPLeagueModel, page_number)));
}




module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body?.filter.toLowerCase() || "";
    let fields = ["name", "gameName"];

    res.status(OK).send(makeResponse("", searchData(GPLeagueModel, filter, fields)));
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let value = await GPLeagueModel.find({}).catch((e)=>{console.log(e)});
    let fields = ["name", "gameName", "entryFee", "prize", "teamSize","totalTeams", "startingDate", "endingDate"];

    let response = await writeExcelFile(value, fields);
    if(response && response.path) return res.status(OK).send(makeResponse("File written successfully", response));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}
