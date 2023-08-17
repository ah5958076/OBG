const constantMsgs = require("../constants/messages");
const {MONTH_ARRAY,PAGINATION_MAX_RECORD_SIZE} = require("../constants/constants");
const GrandPrixModel = require("../models/GrandPrix");
const exceljs = require("exceljs");


module.exports.store = async (objToInsert) => {
    if(!(objToInsert.name && objToInsert.grandPrixOwner && objToInsert.totalTeams && objToInsert.ownerOccupation && objToInsert.ownerYearlyIncome && objToInsert.ownerAddress))
        return constantMsgs.FIELD_EMPTY;
    


    let value = await GrandPrixModel.findOne({name: objToInsert.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value)
        return constantMsgs.GRAND_PRIX_ALREADY_EXISTS;

    objToInsert.name=objToInsert.name.toLowerCase();
    value = await new GrandPrixModel(objToInsert).save().catch((e) => {
        console.log(e);
    });
    
    if(value)
        return constantMsgs.GRAND_PRIX_ADDED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.update = async (objToEdit) => {
    let name = objToEdit.name;
    delete objToEdit.name;
    let value = await GrandPrixModel.updateOne({name: name.toLowerCase()}, objToEdit).catch((e) => {
        console.log(e);
    });
    if(value.modifiedCount)
        return constantMsgs.GRAND_PRIX_UPDATED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.delete = async (name) => {
    if(!name)
        return constantMsgs.GRAND_PRIX_NOT_FOUND;
    

    let value = await GrandPrixModel.deleteOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value.deletedCount)
        return constantMsgs.GRAND_PRIX_DELETED;
    return constantMsgs.UNEXPECTED_ERROR;
}
module.exports.show = async (name) => {
    if(!name)
        return constantMsgs.GRAND_PRIX_NOT_FOUND;
    

    let value = await GrandPrixModel.findOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async (page_number=1) => {
    let value = await GrandPrixModel.find({}).catch((e) => {
        console.log(e);
    });
    
    let startingIndex=(PAGINATION_MAX_RECORD_SIZE*(page_number-1));   
    let data=[];
    if(startingIndex<value.length){
        for(let i=0; (i<startingIndex+PAGINATION_MAX_RECORD_SIZE && i<value.length); i++){
            data.push(value[i]);
        }
    }
    return data;
}

module.exports.downloadExcel = async (res) => {
    let workbook = new exceljs.Workbook();

    let val = await GrandPrixModel.find().catch((e) => {
        console.log(e);
    });
    if(!val)
        return constantMsgs.NO_DATA;

    let worksheet = workbook.addWorksheet("sheet 1");
    let row=1, col="A";
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+0)}:${row}`).value="Name"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+1)}:${row}`).value="Grand Prix League"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+2)}:${row}`).value="Type"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+3)}:${row}`).value="Year"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+4)}:${row}`).value="Total Teams"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+5)}:${row}`).value="Team Size"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+6)}:${row}`).value="Draft Date-Time"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+7)}:${row}`).value="Winner"

    val.forEach((elem, index) => {
        let givenDate = new Date(elem.draftDateTime);
        let dateTime=`${givenDate.getDate()} ${MONTH_ARRAY[givenDate.getMonth()]} ${givenDate.getFullYear()}, ${givenDate.getHours()}:${givenDate.getMinutes()}:${givenDate.getSeconds()}`;

        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+0)}:${row+index+1}`).value=elem.name;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+1)}:${row+index+1}`).value=elem.grandPrixLeague;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+2)}:${row+index+1}`).value=elem.type;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+3)}:${row+index+1}`).value=elem.year;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+4)}:${row+index+1}`).value=elem.totalTeams;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+5)}:${row+index+1}`).value=elem.teamSize;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+6)}:${row+index+1}`).value=dateTime;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+7)}:${row+index+1}`).value=elem.winner;
    });

    let name_of_file = "./uploads/"+Date.now()+".xlsx";
    await workbook.xlsx.writeFile(name_of_file).catch((e) => {
        console.log(e);
    });
    return name_of_file;
}

module.exports.searchData = async (searchText) => {
    let value = await GrandPrixModel.find().catch((e) => {
        console.log(e);
    });
    
    let data=[];

    value.forEach((elem) => {
        if(elem.name.includes(searchText) || elem.grandPrixOwner.toLowerCase().includes(searchText) || elem.ownerOccupation.toLowerCase().includes(searchText) || elem.ownerYearlyIncome.includes(searchText) || elem.ownerAddress.toLowerCase().includes(searchText)){
            data.push(elem);
        }
    });

    return data; 
}