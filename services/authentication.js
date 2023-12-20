const { checkEncryptedData, makeResponse, sendMail, encryptData } = require("./general");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { LOGIN_SUCCESS, UNEXPECTED_ERROR, USERNAME_OR_PASSWORD_INCORRECT, MAIL_SENT, USER_NOT_FOUND, CODE_MATCHED, CODE_EXPIRED, CODE_NOT_MATCHED, PASSWORD_CHANGED, LOGOUT_SUCCESS } = require("../constants/messages");
const { OK, INVALID, SERVER_ERROR, NOT_FOUND } = require("../constants/constants");





exports.login = async (email, password) => {

    let value = await UserModel.findOne({email: email}).catch((err) => {console.log(err)});
    if(value){
        let payload = {"email": email, "role": value?.role, "id": value?._id};
        if(await checkEncryptedData(password, value?.password)){
            let value = await UserModel.updateOne({email: email}, {status: "Active"}).catch((e) => {console.log(e)});
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: parseInt(process.env.RESET_CODE_EXPIRATION_PERIOD)});
            if(value.modifiedCount && token){
                return {code: OK, data: makeResponse(LOGIN_SUCCESS, {user: payload, token: token})};
            }
            return {code: SERVER_ERROR, data: makeResponse(UNEXPECTED_ERROR)};
        }
    }
    return {code: INVALID, data: makeResponse(USERNAME_OR_PASSWORD_INCORRECT)};
}


exports.forgotPassword = async (email) => {

    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)});
    if(value){
        let code = Math.round(Math.random()*10000);
        if(code.toString().length<4) {code*=10}

        let subject = "Verification Code from OBG";
        let body = `Your password reset code is: ${code}\n\nAbove given code expired after an Hour`;
        
        if(await sendMail(email, subject, body)){
            let codeData = {
                "resetToken": code, 
                "resetTokenExpiration": Date.now()
            }
            value = await UserModel.updateOne({email: email}, codeData).catch((e)=>console.log(e));
            if(value) return {code: OK, data: makeResponse(MAIL_SENT)};
            return {code: SERVER_ERROR, data: makeResponse(UNEXPECTED_ERROR)};
        }
        return {code: SERVER_ERROR, data: makeResponse(UNEXPECTED_ERROR)};
    }
    return {code: NOT_FOUND, data: makeResponse(USER_NOT_FOUND)};
}


exports.verifyCode = async (email, code) => {
    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)});
    if(value){
        if(parseInt(value.resetToken)===parseInt(code)){
            let expirationTime = new Date(value.resetTokenExpiration).getTime();
            let currentTime = Date.now();
            if((currentTime-expirationTime)<=(parseInt(process.env.RESET_CODE_EXPIRATION_PERIOD)*1000))
                return {code: OK, data: makeResponse(CODE_MATCHED)};
            return {code: NOT_FOUND, data: makeResponse(CODE_EXPIRED)};
        }
        return {code: INVALID, data: makeResponse(CODE_NOT_MATCHED)};
    }
    return {code: NOT_FOUND, data: makeResponse(USER_NOT_FOUND)};
}


exports.changePassword = async (email, password) => {
    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)})
    if(value){
        let hashedPassword = await encryptData(password);
        if(hashedPassword) {
            value = await UserModel.updateOne({email:email}, {password: hashedPassword}).catch((e) => console.log(e));
            if(value.modifiedCount) return {code: OK, data: makeResponse(PASSWORD_CHANGED)}
        }
    }
    return {code: NOT_FOUND, data: makeResponse(USER_NOT_FOUND)}
}


exports.logout = async (email) => {
    let value = await UserModel.updateOne({email: email}, {status: "Inactive"}).catch((e) => {console.log(e)});
    if(value.modifiedCount)
        return {code: OK, data: makeResponse(LOGOUT_SUCCESS)};
    return {code: NOT_FOUND, data: makeResponse(USER_NOT_FOUND)};
}