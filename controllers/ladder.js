const { OK, NOT_FOUND, INVALID } = require("../constants/constants");
const { UNEXPECTED_ERROR, NAME_EMPTY, GAME_NAME_EMPTY, ENTRY_FEE_EMPTY, TEAM_SIZE_EMPTY, TOTAL_TEAMS_EMPTY, STATUS_EMPTY, STARTING_DATE_EMPTY, ENDING_DATE_EMPTY, PRIZE_EMPTY, INVALID_ID } = require("../constants/messages");
const { checkFile, makeResponse, writeExcelFile, listDataWithPopulate, searchDataWithPopulate, computeDate } = require("../services/general");
const LadderModel = require("../models/Ladder");
const { isObjectIdOrHexString } = require("mongoose");
const { store,update,deleteRecord,show } = require("../services/ladders");






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
            picture: response.data
        }

        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse(GAME_NAME_EMPTY));
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse(ENTRY_FEE_EMPTY));
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse(PRIZE_EMPTY));
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse(TEAM_SIZE_EMPTY));
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY));
        if(!givenObject.status) return res.status(INVALID).send(makeResponse(STATUS_EMPTY));
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse(STARTING_DATE_EMPTY));
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse(ENDING_DATE_EMPTY));

        response = await store(givenObject);
        return res.status(response.code).send(response.data);
    }
    res.status(response.code).send(makeResponse(response.data));
}



module.exports.update = async (req, res) => {
    let id = req.body?.id;
    let oldPicture = req.body?.oldPicture;
    let response = checkFile(req.file);
    if(response.code===OK || (oldPicture && !req.file)){
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
            picture: response.data
        }

        if(!req.file)
            delete givenObject.picture;

        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse(GAME_NAME_EMPTY));
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse(ENTRY_FEE_EMPTY));
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse(PRIZE_EMPTY));
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse(TEAM_SIZE_EMPTY));
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY));
        if(!givenObject.status) return res.status(INVALID).send(makeResponse(STATUS_EMPTY));
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse(STARTING_DATE_EMPTY));
        if(!givenObject.endingDate) return res.status(INVALID).send(makeResponse(ENDING_DATE_EMPTY));

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
    let population_fields = ['gameName'];
    res.status(OK).send(makeResponse("", await listDataWithPopulate(LadderModel, page_number, population_fields)));
}



module.exports.searchData = async (req, res) => {
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name", "gameName->name,"];
    let population_fields = ['gameName'];

    res.status(OK).send(makeResponse("", await searchDataWithPopulate(LadderModel, filter, fields, population_fields)));
}



module.exports.downloadExcel = async (req, res) => {
    let fields = ["name", "gameName", "entryFee", "prize", "teamSize", "totalTeams", "status", "startingDate", "endingDate"];
    let value = await LadderModel.find().populate(['gameName']).catch((e)=>{console.log(e)});

    let data = [];
    value.forEach((elem) => {
        let datum = {
            "name": elem?.name,
            "gameName": elem?.gameName?.name,
            "entryFee": elem?.entryFee,
            "prize": elem?.prize,
            "teamSize": elem?.teamSize,
            "totalTeams": elem?.totalTeams,
            "status": elem?.status,
            "startingDate": computeDate(elem?.startingDate),
            "endingDate": computeDate(elem?.endingDate),
        };
        data.push(datum);
    });

    return res.status(OK).send(makeResponse("File Written successfully", await writeExcelFile(data, fields)));
}