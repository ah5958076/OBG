const constantMsgs = require("../constants/messages");
const {MONTH_ARRAY,PAGINATION_MAX_RECORD_SIZE} = require("../constants/constants");
const GrandPrixModel = require("../models/GrandPrix");
const exceljs = require("exceljs");


module.exports.store = async (objToInsert, auth) => {
    if(!objToInsert.name)
        return {auth: auth, isError: true, data: "Name is empty"};
    if(!objToInsert.grandPrixOwner)
        return {auth: auth, isError: true, data: "Grand Prix Owner is empty"};
    if(!objToInsert.totalTeams)
        return {auth: auth, isError: true, data: "Total Teams is empty"};
    if(!objToInsert.ownerOccupation)
        return {auth: auth, isError: true, data: "Owner Occupation is empty"};
    if(!objToInsert.ownerYearlyIncome)
        return {auth: auth, isError: true, data: "Owner Yearly Income is empty"};
    if(!objToInsert.ownerAddress)
        return {auth: auth, isError: true, data: "Owner Address is empty"};


    let value = await new GrandPrixModel(objToInsert).save().catch((e) => {console.log(e)});
    if(value)
        return {auth:auth, isError:false, data:constantMsgs.GRAND_PRIX_ADDED};
    return {auth:auth, isError:true, data:constantMsgs.UNEXPECTED_ERROR};
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

module.exports.list = async (auth, page_number=1) => {
    let value=null;
    let startingIndex=(PAGINATION_MAX_RECORD_SIZE*(page_number-1));
    let endingIndex= startingIndex+PAGINATION_MAX_RECORD_SIZE;

    if(page_number===-1){
        value = await GrandPrixModel.find({}).catch((e) => {console.log(e)});
        startingIndex=-1;
        endingIndex=-1;
    }else{
        value = await GrandPrixModel.find({}).skip(startingIndex).limit(PAGINATION_MAX_RECORD_SIZE).catch((e) => {console.log(e)});
    }
    let total=await GrandPrixModel.count({}).catch((e)=>{console.log(e)});
    if(endingIndex>total)
        endingIndex=total;
    
    return {auth: auth, data:value, start: startingIndex+1, end: endingIndex, total:total};
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

module.exports.updateStatus = async (body, auth) => {
    if(!(body.id && (body.isBlock!==true && body.isBlock!==false)))
        return {auth:auth, isError:true, data:constantMsgs.UNEXPECTED_ERROR}
    
    let value = await GrandPrixModel.updateOne({_id:body.id}, {isBlock: body.isBlocked}).catch((e)=>{console.log(e)});
    if(value.modifiedCount)
        return {auth:auth, isError:false, data:constantMsgs.GRAND_PRIX_UPDATED}
    return {auth:auth, isError:true, data:constantMsgs.UNEXPECTED_ERROR}
}