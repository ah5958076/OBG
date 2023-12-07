const UserModel = require("../models/User");
const constantMsgs=require("../constants/messages");
const {INVALID, NOT_FOUND, OK}=require("../constants/constants");


module.exports.registerNewUser = async (userObject) => {
    
    let value=await UserModel.findOne({email: userObject.email}).catch((e) => {console.log(e)});
    if(value) return {code: INVALID, data: constantMsgs.USER_ALREADY_EXIST}
    else{
        let result = await new UserModel(userObject).save().catch((e) => {console.log(e)});
        if(!result){ return {code: NOT_FOUND, data:constantMsgs.UNEXPECTED_ERROR}}
    }
    return {code: OK, data: constantMsgs.USER_ADDED};

}
