const constantMsgs = require("../constants/messages");
const InventoryModel = require("../models/Inventory");
const {unlinkSync} = require("fs");


module.exports.store = async (req) => {
    let data = req.body;
    if(!data.name)
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.IMAGE_NOT_UPLOADED;

    let value = await InventoryModel.findOne({name: data.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value){
        unlinkSync(req.file.path);
        return constantMsgs.INVENTORY_ALREADY_EXISTS;
    }

    value = await new InventoryModel({name: data.name.toLowerCase(), picture: req.file.path}).save().catch((e) => {
        console.log(e);
    });
    
    if(value)
        return constantMsgs.INVENTORY_ADDED;
    return constantMsgs.INVENTORY_NOT_ADDED;
}
module.exports.update = async (req) => {
    if(!req.body.name)
        return constantMsgs.FIELD_EMPTY;
    if(!req.file)
        return constantMsgs.IMAGE_NOT_UPLOADED;
    

    let value=await InventoryModel.findOne({name: req.body.name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value){
        unlinkSync(value.picture);
    }
    value = await InventoryModel.updateOne({name: req.body.name.toLowerCase()}, {picture: req.file.path}).catch((e) => {
        console.log(e);
    });

    if(value.modifiedCount)
        return constantMsgs.INVENTORY_UPDATED;
    return constantMsgs.INVENTORY_NOT_UPDATED;
}
module.exports.delete = async (name) => {
    if(!name)
        return constantMsgs.INVENTORY_NOT_FOUND;
    

    let value=await InventoryModel.findOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    if(value){
        unlinkSync(value.picture);
    }
    value = await InventoryModel.deleteOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });

    if(value.deletedCount)
        return constantMsgs.INVENTORY_DELETED;
    return constantMsgs.INVENTORY_NOT_DELETED;
}
module.exports.show = async (name) => {
    if(!name)
        return constantMsgs.INVENTORY_NOT_FOUND;
    

    let value = await InventoryModel.findOne({name: name.toLowerCase()}).catch((e) => {
        console.log(e);
    });
    return value;
}
module.exports.list = async () => {
    let value = await InventoryModel.find({}).catch((e) => {
        console.log(e);
    });
    return value;
}

module.exports.searchData = async (searchText) => {
    let value = await InventoryModel.find().catch((e) => {
        console.log(e);
    });
    
    let data=[];

    value.forEach((elem) => {
        if(elem.name.includes(searchText)){
            data.push(elem);
        }
    });

    return data; 
}