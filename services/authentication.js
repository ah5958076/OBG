const UserModel = require("../models/User");
const mailer = require("nodemailer");
const bcrypt=require("bcrypt");
const constantMsgs = require("../constants/messages");
const { UNEXPECTED_ERROR } = require("../constants/constants");
require("dotenv").config();



module.exports.login = async (email, password) => {
    console.log(email)
    console.log(password)
    if(email===null || password===null)
        return constantMsgs.FIELD_EMPTY;


    let value = await UserModel.findOne({email: email}).catch((err) => {
        console.log(err);
    });
    if(value){
        let result = await bcrypt.compare(password, value.password).catch((e) => {
            console.log(e);
        });
        if(result){
            let value = await UserModel.updateOne({email: email}, {status: "Active"}).catch((e) => {
                console.log(e);
            });
            if(value.modifiedCount)
               return constantMsgs.LOGIN_SUCCESS;
            return constantMsgs.UNEXPECTED_ERROR;
       }
        return constantMsgs.INVALID_PASSWORD;
    }
    return constantMsgs.USER_NOT_FOUND;
}

module.exports.forgotPassword = async (email) => {
    if(!email)
        return constantMsgs.FIELD_EMPTY;


    let value = await UserModel.findOne({email: email}).catch((e) => {
        console.log(e);
    });
    if(value){
        let username=process.env.AUTH_EMAIL;
        let password=process.env.AUTH_PASSWORD;
        const transporter = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: username,
                pass: password
            }
        });
        let code = Math.floor(Math.random()*9999);
        const config={
            from: username,
            to: email,
            subject: "Verification Code from OBG",
            text: `Your password reset code is: ${code}\n\nAbove given code expired after an Hour`
        }
        let status = await transporter.sendMail(config).catch((e) => {
            console.log(e);
        });
        if(status){
            let value = await UserModel.updateOne({email: email}, {$set: {resetToken: code, resetTokenExpiration: Date.now()}}).catch((e) => {
                console.log(e);
            });
            if(value)
                return constantMsgs.MAIL_SENT;
            return constantMsgs.UNEXPECTED_ERROR;
        }
    }
    return constantMsgs.USER_NOT_FOUND;
}

module.exports.verifyResetCode = async (email, code) => {
    if(!email || !code)
        return constantMsgs.FIELD_EMPTY;


    let value = await UserModel.findOne({email: email}).catch((e) => {
        console.log(e);
    });
    if(value && value.resetToken===code){
        let expirationTime = new Date(value.resetTokenExpiration).getTime();
        let currentTime = Date.now()
        if((currentTime-expirationTime)<=(process.env.RESET_CODE_EXPIRATION_PERIOD*60*1000))
            return constantMsgs.CODE_MATCHED;
        else
            return constantMsgs.CODE_EXPIRED;
    }
    if(!value)
        return constantMsgs.USER_NOT_FOUND;
    return constantMsgs.CODE_NOT_MATCHED;
}

module.exports.logout = async (email) => {
    if(!email)
        return constantMsgs.FIELD_EMPTY;

    let value = await UserModel.updateOne({email: email}, {status: "Inactive"}).catch((e) => {
        console.log(e);
    });
    if(value.modifiedCount)
        return constantMsgs.LOGOUT_SUCCESS;
    return UNEXPECTED_ERROR;
}