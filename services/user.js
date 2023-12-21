const UserModel = require("../models/User");
const {INVALID, NOT_FOUND, OK}=require("../constants/constants");
const { UNEXPECTED_ERROR, USER_ALREADY_EXIST, USER_ADDED, NO_DATA_FOUND, PASSWORD_CHANGED, PROFILE_PHOTO_UPLOADED, COVER_PHOTO_UPLOADED, USER_UPDATED, USER_DELETED, INVENTORY_ALREADY_EXISTS, INVENTORY_ADDED } = require("../constants/messages");
const { makeResponse, encryptData, checkEncryptedData } = require("./general");






exports.registerNewUser = async (userObject) => {
    
    let value=await UserModel.findOne({email: userObject.email}).catch((e) => {console.log(e)});
    if(value) return {code: INVALID, data: makeResponse(USER_ALREADY_EXIST)}
    else{
        let result = await new UserModel(userObject).save().catch((e) => {console.log(e)});
        if(!result){ return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)}}
    }
    return {code: OK, data: makeResponse(USER_ADDED)};

}



exports.update = async (id, object) => {
    let result = await UserModel.updateOne({_id: id}, object).catch((e) => {console.log(e)});
    if(result.modifiedCount) return {code: OK, data: makeResponse(USER_UPDATED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.deleteRecord = async (ids) => {
    let result = await UserModel.updateMany({_id: ids}, {deletedAt: Date.now()}).catch((e) => {console.log(e)});
    if(result.modifiedCount) return {code: OK, data: makeResponse(USER_DELETED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.show = async (id) => {
    let result = await UserModel.findOne({_id: id, deletedAt: null}).catch((e) => {console.log(e)});
    if(result) return {code: OK, data: makeResponse("", result)};
    return {code: NOT_FOUND, data: makeResponse(NO_DATA_FOUND)};
}



exports.changePassword = async (email, oldPassword, newPassword) => {
    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)});
    if(value){
        if(await checkEncryptedData(oldPassword, value.password)){
            let hashedpassword = await encryptData(newPassword);
            if(hashedpassword){
                value = await UserModel.updateOne({email: email}, {password: hashedpassword}).catch((e) => {console.log(e)});
                if(value.modifiedCount) return {code: OK, data: makeResponse(PASSWORD_CHANGED)};
            }
        }
        return {code: INVALID, data: makeResponse(INVALID_PASSWORD)};
    }
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



module.exports.addInventory = async (userID, inventoryID) => {
    let value = await UserModel.findOne({_id: userID}).catch((e)=>console.log(e))
    if(value){
        let inventories = value.inventories || [];
        let filteredInventories = inventories?.filter((id, index) => {
            return id===inventoryID;
        });
        if(filteredInventories.length>0){
            return {code: INVALID, data: makeResponse(INVENTORY_ALREADY_EXISTS)};
        }
        inventories.push(inventoryID);
        value = await UserModel.updateOne({_id: userID}, { inventories: inventories }).catch((e)=>console.log(e));
        if(value.modifiedCount) return {code: OK, data: makeResponse(INVENTORY_ADDED)}
    }
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.uploadProfilePhoto = async (email, path) => {
    let value = await UserModel.updateOne({email: email}, {profilePhoto: path}).catch((e) => {console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(PROFILE_PHOTO_UPLOADED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}



exports.uploadCoverPhoto = async (email, path) => {
    let value = await UserModel.updateOne({email: email}, {coverPhoto: path}).catch((e) => {console.log(e)});
    if(value.modifiedCount) return {code: OK, data: makeResponse(COVER_PHOTO_UPLOADED)};
    return {code: NOT_FOUND, data: makeResponse(UNEXPECTED_ERROR)};
}