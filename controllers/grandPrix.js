const { INVALID, OK, NOT_FOUND } = require("../constants/constants");
const {  UNEXPECTED_ERROR, NAME_EMPTY, GRAND_PRIX_OWNER_EMPTY, TOTAL_TEAMS_EMPTY, OWNER_OCCUPATION_EMPTY, OWNER_YEARLY_INCOME_EMPTY, OWNER_ADDRESS_EMPTY } = require("../constants/messages");
const { makeResponse, listData, searchData, writeExcelFile } = require("../services/general");
const { store, update, deleteRecord, show, updateStatus } = require("../services/grandPrix");
const GrandPrixModel = require("../models/GrandPrix");





module.exports.store = async (req, res) => {
    let givenObject = {
        "name": req.body?.name || "",
        "grandPrixOwner": req.body?.grandPrixOwner || "",
        "totalTeams": req.body?.totalTeams || "",
        "ownerOccupation": req.body?.ownerOccupation || "",
        "ownerYearlyIncome": req.body?.ownerYearlyIncome || "",
        "ownerAddress": req.body?.ownerAddress || "",
    }

    if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
    if(!givenObject.grandPrixOwner) return res.status(INVALID).send(makeResponse(GRAND_PRIX_OWNER_EMPTY));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY));
    if(!givenObject.ownerOccupation) return res.status(INVALID).send(makeResponse(OWNER_OCCUPATION_EMPTY));
    if(!givenObject.ownerYearlyIncome) return res.status(INVALID).send(makeResponse(OWNER_YEARLY_INCOME_EMPTY));
    if(!givenObject.ownerAddress) return res.status(INVALID).send(makeResponse(OWNER_ADDRESS_EMPTY));

    let response = await store(givenObject);
    return res.status(response.code).send(response.data);
}



module.exports.update = async (req, res) => {
    let id = req.body?.id || "";
    let givenObject = {
        "name": req.body?.name || "",
        "grandPrixOwner": req.body?.grandPrixOwner || "",
        "totalTeams": req.body?.totalTeams || "",
        "ownerOccupation": req.body?.ownerOccupation || "",
        "ownerYearlyIncome": req.body?.ownerYearlyIncome || "",
        "ownerAddress": req.body?.ownerAddress || "",
    }

    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!givenObject.name) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
    if(!givenObject.grandPrixOwner) return res.status(INVALID).send(makeResponse(GRAND_PRIX_OWNER_EMPTY));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse(TOTAL_TEAMS_EMPTY));
    if(!givenObject.ownerOccupation) return res.status(INVALID).send(makeResponse(OWNER_OCCUPATION_EMPTY));
    if(!givenObject.ownerYearlyIncome) return res.status(INVALID).send(makeResponse(OWNER_YEARLY_INCOME_EMPTY));
    if(!givenObject.ownerAddress) return res.status(INVALID).send(makeResponse(OWNER_ADDRESS_EMPTY));

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

    let response = await show(id);
    return res.status(response.code).send(response.data);
}



module.exports.list = async (req, res) => {
    let page_number = req.query.pageNum || 1;
    return res.status(OK).send(makeResponse("", await listData(GrandPrixModel, page_number)));
}



module.exports.searchData = async (req, res) => {
    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name","grandPrixOwner","ownerOccupation","ownerYearlyIncome","ownerAddress"];
    
    return res.status(OK).send(makeResponse("", await searchData(GrandPrixModel, filter, fields)))
}



module.exports.downloadExcel = async (req, res) => {
    let fields = ["name","grandPrixOwner","ownerOccupation","ownerYearlyIncome","ownerAddress"];
    let value = await GrandPrixModel.find().catch((e)=>{console.log(e)});

    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)))
}






module.exports.updateStatus = async (req, res) => {
    let id = req.body?.id || "";
    let givenObject = {
        isBlock: req.body?.isBlocked
    }

    if(!id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if((givenObject.isBlock!==true && givenObject.isBlock!==false)) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));

    let response = await updateStatus(id, givenObject);
    return res.status(response.code).send(response.data);
}