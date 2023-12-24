const { OK, NOT_FOUND } = require("../constants/constants");
const { INVENTORY_ADDED, UNEXPECTED_ERROR, INVENTORY_UPDATED, INVENTORY_DELETED, NO_DATA_FOUND } = require("../constants/messages");
const InventoryModel = require("../models/Inventory");
const { makeResponse } = require("./general");




exports.store = async (object) => {
    let value = await new InventoryModel(object).save().catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse(INVENTORY_ADDED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.update = async (id, object) => {
    if(object.picture){
        let value=await InventoryModel.findOne({_id: id}).catch((e) => {console.log(e)});
        if(value && value.picture){ 
            try{
                unlinkSync(value.picture)
            }catch(e){} 
        }
    }

    value = await InventoryModel.updateOne({_id: id}, object).catch((e) => {console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(INVENTORY_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {
    let value=await InventoryModel.find({_id: ids}).catch((e) => {console.log(e)});
    value.forEach((elem) => {
        if(elem && elem.picture){ 
            try{
                unlinkSync(elem.picture) 
            }catch(e){}
        }
    });
    
    value = await InventoryModel.deleteMany({_id: ids}).catch((e) => {console.log(e)});
    if(value.deletedCount) return {code: OK, data: makeResponse(INVENTORY_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let value = await InventoryModel.findOne({_id: id}).catch((e) => {console.log(e)});
    if(value) return {code: OK, data: makeResponse("", value)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}