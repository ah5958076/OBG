const constantMsgs = require("../constants/messages");
const {MONTH_ARRAY,PAGINATION_MAX_RECORD_SIZE} = require("../constants/constants");
const GPLeagueModel = require("../models/GPLeague");
const {unlinkSync}=require("fs");
const exceljs = require("exceljs");


module.exports.store = async (req) => {
    let data = req.body;
    let keys = Object.keys(data);
    if(keys.length<8)
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.IMAGE_NOT_UPLOADED;

    let value = await GPLeagueModel.findOne({name: data.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value){
        unlinkSync(req.file.path)
        return constantMsgs.GPLEAGUE_ALREADY_EXISTS;
    }

    
    let objToInsert={
        name: data.name.toLowerCase(),
        gameName: data.gameName,
        entryFee: data.entryFee,
        prize: data.prize,
        teamSize: data.teamSize,
        totalTeams: data.totalTeams,
        startingDate: data.startingDate,
        endingDate: data.endingDate,
        picture: req.file.path
    }

    value = await new GPLeagueModel(objToInsert).save().catch((e) => {
        console.log(e);
    });
    
    if(value)
        return constantMsgs.GPLEAGUE_ADDED;
    return constantMsgs.GPLEAGUE_NOT_ADDED;
}
module.exports.update = async (req) => {
    let data = req.body;
    let keys=Object.keys(req.body);
    if(keys.length<8)
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.IMAGE_NOT_UPLOADED;
    
    let objToEdit={
        gameName: data.gameName,
        entryFee: data.entryFee,
        prize: data.prize,
        teamSize: data.teamSize,
        totalTeams: data.totalTeams,
        startingDate: data.startingDate,
        endingDate: data.endingDate,
        picture: req.file.path
    }

    let value=await GPLeagueModel.findOne({name: req.body.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value){
        unlinkSync(value.picture);
    }

    value = await GPLeagueModel.updateOne({name: req.body.name.toLowerCase()}, objToEdit).catch((e) => {
        console.log(e);
    });
    if(value)
        return constantMsgs.GPLEAGUE_UPDATED;
    return constantMsgs.GPLEAGUE_NOT_UPDATED;
}
module.exports.delete = async (name) => {
    if(!name)
        return constantMsgs.GPLEAGUE_NOT_FOUND;
    
    let value=await GPLeagueModel.findOne({name: req.body.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value){
        unlinkSync(value.picture);
    }
    value = await GPLeagueModel.deleteOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value.deletedCount)
        return constantMsgs.GPLEAGUE_DELETED;
    return constantMsgs.GPLEAGUE_NOT_FOUND;
}
module.exports.show = async (name) => {
    if(!name)
        return constantMsgs.GPLEAGUE_NOT_FOUND;
    

    let value = await GPLeagueModel.findOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async (page_number=1) => {
    let value = await GPLeagueModel.find({}).catch((e) => {
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

    let val = await GPLeagueModel.find().catch((e) => {
        console.log(e);
    });
    if(!val)
        return constantMsgs.NO_DATA;

    let worksheet = workbook.addWorksheet("sheet 1");
    let row=1, col="A";
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+0)}:${row}`).value="Name"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+1)}:${row}`).value="Game Name"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+2)}:${row}`).value="Entry Fee"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+3)}:${row}`).value="Prize"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+4)}:${row}`).value="Team Size"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+5)}:${row}`).value="Total Teams"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+6)}:${row}`).value="Starding Date"
    worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+7)}:${row}`).value="Ending Date"

    val.forEach((elem, index) => {
        let givenDate = new Date(elem.startingDate);
        let startingDateTime=`${givenDate.getDate()} ${MONTH_ARRAY[givenDate.getMonth()]} ${givenDate.getFullYear()}, ${givenDate.getHours()}:${givenDate.getMinutes()}:${givenDate.getSeconds()}`;

        givenDate = new Date(elem.endingDate);
        let endingDateTime=`${givenDate.getDate()} ${MONTH_ARRAY[givenDate.getMonth()]} ${givenDate.getFullYear()}, ${givenDate.getHours()}:${givenDate.getMinutes()}:${givenDate.getSeconds()}`;

        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+0)}:${row+index+1}`).value=elem.name;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+1)}:${row+index+1}`).value=elem.gameName
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+2)}:${row+index+1}`).value=elem.entryFee;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+3)}:${row+index+1}`).value=elem.prize;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+4)}:${row+index+1}`).value=elem.teamSize;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+5)}:${row+index+1}`).value=elem.totalTeams;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+6)}:${row+index+1}`).value=startingDateTime;
        worksheet.getCell(`${String.fromCharCode(col.charCodeAt(0)+7)}:${row+index+1}`).value=endingDateTime;
    });

    let name_of_file = "./uploads/"+Date.now()+".xlsx";
    let value = await workbook.xlsx.writeFile(name_of_file).catch((e) => {
        console.log(e);
    });
    return name_of_file;
}


module.exports.searchData = async (searchText) => {
    let value = await GPLeagueModel.find().catch((e) => {
        console.log(e);
    });
    
    let data=[];

    value.forEach((elem) => {
        if(elem.name.includes(searchText) || elem.gameName.includes(searchText)){
            data.push(elem);
        }
    });

    return data; 
}