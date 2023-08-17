const constantMsgs = require("../constants/messages");
const {MONTH_ARRAY,PAGINATION_MAX_RECORD_SIZE} = require("../constants/constants");
const FantasyLeagueModel = require("../models/FantasyLeague");
const exceljs = require("exceljs");


module.exports.store = async (objToInsert) => {
    let keys = Object.keys(objToInsert);
    if(keys.length<5)
        return constantMsgs.FIELD_EMPTY;


    let value = await FantasyLeagueModel.findOne({name: objToInsert.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value)
        return constantMsgs.FANTASY_LEAGUE_ALREADY_EXISTS;

    objToInsert.name=objToInsert.name.toLowerCase();
    value = await new FantasyLeagueModel(objToInsert).save().catch((e) => {
        console.log(e);
    });
    
    if(value)
        return constantMsgs.FANTASY_LEAGUE_ADDED;
    return constantMsgs.FANTASY_LEAGUE_NOT_ADDED;
}
module.exports.update = async (objToEdit) => {
    let keys=Object.keys(objToEdit);
    if(keys.length<5)
        return constantMsgs.FIELD_EMPTY;
    
    let name = objToEdit.name;
    delete objToEdit.name; 
    let value = await FantasyLeagueModel.updateOne({name: name.toLowerCase()}, objToEdit).catch((e) => {
        console.log(e);
    });
    if(value.modifiedCount)
        return constantMsgs.FANTASY_LEAGUE_UPDATED;
    return constantMsgs.FANTASY_LEAGUE_NOT_UPDATED;
}
module.exports.delete = async (name) => {
    if(!name)
        return constantMsgs.FANTASY_LEAGUE_NOT_FOUND;
    

    let value = await FantasyLeagueModel.deleteOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value.deletedCount)
        return constantMsgs.FANTASY_LEAGUE_DELETED;
    return constantMsgs.FANTASY_LEAGUE_NOT_FOUND;
}
module.exports.show = async (name) => {
    if(!name)
        return constantMsgs.FANTASY_LEAGUE_NOT_FOUND;
    

    let value = await FantasyLeagueModel.findOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async (page_number=1) => {
    let value = await FantasyLeagueModel.find({}).catch((e) => {
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

    let val = await FantasyLeagueModel.find().catch((e) => {
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
    let value = await FantasyLeagueModel.find().catch((e) => {
        console.log(e);
    });
    
    let data=[];

    value.forEach((elem) => {
        if(elem.name.includes(searchText) || elem.grandPrixLeague.includes(searchText) || elem.type.includes(searchText)){
            data.push(elem);
        }
    });

    return data; 
}