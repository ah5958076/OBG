const { INVALID, OK, NOT_FOUND } = require("../constants/constants");
const { UNEXPECTED_ERROR, NAME_EMPTY, GAME_NAME_EMPTY, ENTRY_FEE_EMPTY, PRIZE_EMPTY, TEAM_SIZE_EMPTY, TOTAL_TEAMS_EMPTY, STARTING_DATE_EMPTY, INVALID_ID, CATAGORY_EMPTY } = require("../constants/messages");
const { checkFile, makeResponse, writeExcelFile, listDataWithPopulate, searchDataWithPopulate, computeDate } = require("../services/general");
const TournamentModel = require("../models/Tournament");
const { isObjectIdOrHexString } = require("mongoose");
const { store, update, deleteRecord, show } = require("../services/tournament");





module.exports.store = async (req, res) => {
    let response = checkFile(req.file);
    if(response.code===OK){
        let givenObject={
            name: req.body?.name || "",
            catagory: req.body?.catagory || "",
            gameName: req.body?.gameName || "",
            entryFee: req.body?.entryFee || "",
            prize: req.body?.prize || "",
            teamSize: req.body?.teamSize || "",
            totalTeams: req.body?.totalTeams || "",
            startingDate: req.body?.startingDate || "",
            picture: response.data
        }

        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY))
        if(!givenObject.catagory) return res.status(INVALID).send(makeResponse(CATAGORY_EMPTY))
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse(GAME_NAME_EMPTY))
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse(ENTRY_FEE_EMPTY))
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse(PRIZE_EMPTY))
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse(TEAM_SIZE_EMPTY))
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY))
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse(STARTING_DATE_EMPTY))

        response = await store(givenObject);
        return res.status(response.code).send(response.data);
    }
    return res.status(response.code).send(makeResponse(response.data));
}



module.exports.update = async (req, res) => {
    let id = req.body?.id;
    let oldPicture = req.body?.oldPicture;

    let response = checkFile(req.file);
    if(response.code===OK || (oldPicture && !req.file)){
        let givenObject={
            name: req.body?.name || "",
            catagory: req.body?.catagory || "",
            gameName: req.body?.gameName || "",
            entryFee: req.body?.entryFee || "",
            prize: req.body?.prize || "",
            teamSize: req.body?.teamSize || "",
            totalTeams: req.body?.totalTeams || "",
            startingDate: req.body?.startingDate || "",
            picture: response.data
        }

        if(!req.file)   
            delete givenObject.picture;

        if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
        if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY))
        if(!givenObject.catagory) return res.status(INVALID).send(makeResponse(CATAGORY_EMPTY))
        if(!givenObject.gameName) return res.status(INVALID).send(makeResponse(GAME_NAME_EMPTY))
        if(!givenObject.entryFee) return res.status(INVALID).send(makeResponse(ENTRY_FEE_EMPTY))
        if(!givenObject.prize) return res.status(INVALID).send(makeResponse(PRIZE_EMPTY))
        if(!givenObject.teamSize) return res.status(INVALID).send(makeResponse(TEAM_SIZE_EMPTY))
        if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY))
        if(!givenObject.startingDate) return res.status(INVALID).send(makeResponse(STARTING_DATE_EMPTY))

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
    let id = req.params?.id || ""
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));    
    if(!isObjectIdOrHexString(id)) return res.status(INVALID).send(makeResponse(INVALID_ID));

    let response = await show(id);
    return res.status(response.code).send(response.data);
}



module.exports.list = async (req, res) => {
    let page_number = req.query?.pageNum || 1;
    let catagory = req.query?.catagory || {};
    if(catagory==="All")
        catagory=null;
    let population_fields = ['gameName'];
    res.status(OK).send(makeResponse("", await listDataWithPopulate(TournamentModel, page_number, population_fields, catagory?{catagory}:null)));
}



module.exports.searchData = async (req, res) => {
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name", "catagory", "gameName->name,"];
    let population_fields = ['gameName'];
    res.status(OK).send(makeResponse("", await searchDataWithPopulate(TournamentModel, filter, fields, population_fields)));
}



module.exports.downloadExcel = async (req, res) => {
    let fields = ["name", "type", "gameName", "entryFee", "prize", "teamSize", "totalTeams", "startingDate"];
    let value = await TournamentModel.find({}).populate(['gameName']).catch((e) => {console.log(e)});

    let data = [];
    value.forEach((elem) => {
        let datum = {
            "name": elem.name,
            "catagory": elem.catagory,
            "gameName": elem.gameName?.name,
            "entryFee": elem.entryFee,
            "prize": elem.prize,
            "teamSize": elem.teamSize,
            "totalTeams": elem.totalTeams,
            "startingDate": computeDate(elem.startingDate)
        }
        data.push(datum);
    })

    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(data, fields)));
}