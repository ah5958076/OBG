const constantMsgs = require("../constants/messages");
const TeamModel = require("../models/Team");


module.exports.store = async (data) => {
    if(!(data.name && data.size))
        return constantMsgs.FIELD_EMPTY;

    let value = await TeamModel.findOne({name: data.name}).catch((e) => {
        console.log(e);
    });
    if(value){
        return constantMsgs.TEAM_ALREADY_EXIST;
    }else{
        value = await new TeamModel({name: data.name, size: data.size}).save().catch((e) => {
            console.log(e);
        });
    }        
    if(value)
        return constantMsgs.TEAM_ADDED;   
    return constantMsgs.UNEXPECTED_ERROR;
}

module.exports.update = async (data) => {
    if(!(data.name && data.size))
        return constantMsgs.FIELD_EMPTY;

    let value= await TeamModel.findOne({name: data.name}).catch((e) => {
        console.log(e);
    });
    if(value){
        if(value.members.length < value.size){
            value.members.push(data.member_id);
            value = await TeamModel.updateOne({name: value.name}, {size: value.size, members: value.members}).catch((e) => {
                console.log(e);
            });
            if(value.modifiedCount)
                return constantMsgs.TEAM_UPDATED;
        }else{
            return constantMsgs.TEAM_MEMBERS_EXCEED;
        }
    }
    return constantMsgs.TEAM_NOT_FOUND;
}

module.exports.delete = async (id) => {
    if(!id)
        return constantMsgs.FIELD_EMPTY;

    let value = await TeamModel.deleteOne({_id: id}).catch((e) => {
        console.log(e);
    });
    if(value.deletedCount)
        return constantMsgs.TEAM_DELETED;
    return constantMsgs.UNEXPECTED_ERROR;
}

module.exports.show = async (id) => {
    if(!id)
        return constantMsgs.FIELD_EMPTY;

    let value = await TeamModel.findOne({_id: id}).catch((e) => {
        console.log(e);
    });
    return value;
}

module.exports.list = async () => {
    let value = await TeamModel.find().catch((e) => {
        console.log(e);
    });
    return value;
}


module.exports.search = async (search_txt) => {
    if(!search_txt)
        search_txt="";

    let value = await TeamModel.findMany().catch((e) => {
        console.log(e);
    });
    let data=[];
    value.forEach((elem) => {
        if(elem.name.tolowercase().includes(search_txt.tolowercase())){
            data.push(elem);
        }
    });
    return data;
}