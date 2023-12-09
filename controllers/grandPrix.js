const { INVALID, OK, NOT_FOUND, UNAUTHORIZED } = require("../constants/constants");
const { GRAND_PRIX_ADDED, UNEXPECTED_ERROR, GRAND_PRIX_UPDATED, GRAND_PRIX_DELETED, AUTH_FAILED } = require("../constants/messages");
const { makeResponse, listData, searchData, writeExcelFile } = require("../services/general");
const GrandPrixModel = require("../models/GrandPrix");





module.exports.store = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let givenObject = {
        "name": req.body?.name || "",
        "grandPrixOwner": req.body?.grandPrixOwner || "",
        "totalTeams": req.body?.totalTeams || "",
        "ownerOccupation": req.body?.ownerOccupation || "",
        "ownerYearlyIncome": req.body?.ownerYearlyIncome || "",
        "ownerAddress": req.body?.ownerAddress || "",
    }

    if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!givenObject.grandPrixOwner) return res.status(INVALID).send(makeResponse("Grand Prix Owner is empty"));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is empty"));
    if(!givenObject.ownerOccupation) return res.status(INVALID).send(makeResponse("Owner Occupation is empty"));
    if(!givenObject.ownerYearlyIncome) return res.status(INVALID).send(makeResponse("Owner Yearly Income is empty"));
    if(!givenObject.ownerAddress) return res.status(INVALID).send(makeResponse("Owner Address is empty"));

    let value = await new GrandPrixModel(givenObject).save().catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse(GRAND_PRIX_ADDED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.update = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let givenObject = {
        "id": req.body?.id || "",
        "name": req.body?.name || "",
        "grandPrixOwner": req.body?.grandPrixOwner || "",
        "totalTeams": req.body?.totalTeams || "",
        "ownerOccupation": req.body?.ownerOccupation || "",
        "ownerYearlyIncome": req.body?.ownerYearlyIncome || "",
        "ownerAddress": req.body?.ownerAddress || "",
    }

    if(!givenObject.id) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!givenObject.name) return res.status(INVALID).send(makeResponse("Name is empty"));
    if(!givenObject.grandPrixOwner) return res.status(INVALID).send(makeResponse("Grand Prix Owner is empty"));
    if(!givenObject.totalTeams) return res.status(INVALID).send(makeResponse("Total Teams is empty"));
    if(!givenObject.ownerOccupation) return res.status(INVALID).send(makeResponse("Owner Occupation is empty"));
    if(!givenObject.ownerYearlyIncome) return res.status(INVALID).send(makeResponse("Owner Yearly Income is empty"));
    if(!givenObject.ownerAddress) return res.status(INVALID).send(makeResponse("Owner Address is empty"));

    let value = await GrandPrixModel.updateOne({_id: givenObject.id}, givenObject).catch((e) => {console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(GRAND_PRIX_UPDATED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.delete = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));

    let value = await GrandPrixModel.deleteOne({_id: id}).catch((e) => {console.log(e)});
    if(value.deletedCount) return res.status(OK).send(makeResponse(GRAND_PRIX_DELETED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.show = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.params?.id || "";
    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));

    let value = await GrandPrixModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return res.status(OK).send(makeResponse("", value));
    return res.status(NOT_FOUND).send(makeResponse("No Data found"));
}

module.exports.list = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let page_number = req.query.pageNum || 1;
    return res.status(OK).send(makeResponse("", await listData(GrandPrixModel, page_number)));
}





module.exports.searchData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let filter = req.body?.filter?.toLowerCase() || "";
    let fields = ["name","grandPrixOwner","ownerOccupation","ownerYearlyIncome","ownerAddress"];
    
    return res.status(OK).send(makeResponse("", await searchData(GrandPrixModel, filter, fields)))
}

module.exports.downloadExcel = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    
    let fields = ["name","grandPrixOwner","ownerOccupation","ownerYearlyIncome","ownerAddress"];
    let value = await GrandPrixModel.find().catch((e)=>{console.log(e)});

    return res.status(OK).send(makeResponse("File written successfully", await writeExcelFile(value, fields)))
}






module.exports.updateStatus = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let id = req.body?.id || "";
    let givenObject = {
        isBlock: req.body?.isBlocked || ""
    }

    if(!id) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if((givenObject.isBlock!==true && givenObject.isBlock!==false)) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));

    let value = await GrandPrixModel.updateOne({_id:id}, givenObject).catch((e)=>{console.log(e)});
    if(value.modifiedCount) return res.status(OK).send(makeResponse(GRAND_PRIX_UPDATED));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}