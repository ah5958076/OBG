const constantMsgs = require("../constants/messages");
const {PAGINATION_MAX_RECORD_SIZE} = require("../constants/constants");
const GameModel = require("../models/Game");
const {unlinkSync} = require("fs");


module.exports.store = async (req) => {
    let data = req.body;
    if(!(data.name && data.type && data.platform))
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.IMAGE_NOT_UPLOADED;

    let value = await GameModel.findOne({name: data.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value){
        unlinkSync(req.file.path);
        return constantMsgs.GAME_ALREADY_EXIST;
    }

    value = await new GameModel({name: data.name.toLowerCase(), type: data.type, platform: data.platform, picture: req.file.path}).save().catch((e) => {
        console.log(e);
    });
    
    if(value)
        return constantMsgs.GAME_ADDED;
    return constantMsgs.GAME_NOT_ADDED;
}
module.exports.update = async (req) => {
    let keys=Object.keys(req.body);
    if(keys.length<3)
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.IMAGE_NOT_UPLOADED;
    
    let objToEdit={
        type: req.body.type,
        platform: req.body.platform,
        picture: req.file.path
    }

    let value=await GameModel.findOne({name: req.body.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value){
        unlinkSync(value.picture);
    }
    value = await GameModel.updateOne({name: req.body.name.toLowerCase()}, objToEdit).catch((e) => {
        console.log(e);
    });
    if(value)
        return constantMsgs.GAME_UPDATED;
    return constantMsgs.GAME_NOT_ADDED;
}
module.exports.delete = async (name) => {
    if(!name)
        return constantMsgs.GAME_NOT_FOUND;
    

    let value=await GameModel.findOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value){
        unlinkSync(value.picture);
    }
    value = await GameModel.deleteOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value.deletedCount)
        return constantMsgs.GAME_DELETED;
    return constantMsgs.GAME_NOT_FOUND;
}
module.exports.show = async (name) => {
    if(!name)
        return constantMsgs.GAME_NOT_FOUND;
    

    let value = await GameModel.findOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async () => {
    let value = await GameModel.find({}).catch((e) => {
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

module.exports.searchData = async (searchText) => {
    let value = await GameModel.find().catch((e) => {
        console.log(e);        
    });
    
    let data=[];

    value.forEach((elem) => {
        if(elem.name.includes(searchText) || elem.type.includes(searchText) || elem.platform.includes(searchText)){
            data.push(elem);
        }
    });

    return data;
}