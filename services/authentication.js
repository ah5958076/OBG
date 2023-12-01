const UserModel = require("../models/User");
const mailer = require("nodemailer");
const bcrypt=require("bcrypt");
const constantMsgs = require("../constants/messages");
const jwt = require("jsonwebtoken");


module.exports.login = async (email, password) => {
    if(!email) {return {isError:true, data:"Email is Empty"}}
    if(!password) {return {isError:true, data:"Password is Empty"}}

    let value = await UserModel.findOne({email: email}).catch((err) => {console.log(err)});
    if(value){
        let payload = {"email": email, "role": value?.role};
        let result = await bcrypt.compare(password, value.password).catch((e) => {console.log(e)});
        if(result){
            let value = await UserModel.updateOne({email: email}, {status: "Active"}).catch((e) => {console.log(e)});
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: parseInt(process.env.RESET_CODE_EXPIRATION_PERIOD)});
            if(value.modifiedCount && token) return {isError: false, data: token};
            return {isError:true, data: constantMsgs.UNEXPECTED_ERROR}
       }
    }
    return {isError:true, data: "Either Username or Password is incorrect"}
}

module.exports.forgotPassword = async (email) => {
    if(!email)
        return {isError:true, data: "Email is empty"};

    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)});
    if(value){
        let username=process.env.AUTH_EMAIL;
        let password=process.env.AUTH_PASSWORD;
        const transporter = mailer.createTransport({
            service: "gmail",
            auth: {
                user: username,
                pass: password
            }
        });
        let code = Math.round(Math.random()*10000);
        if(code.toString().length<4) {code*=10}
        const config={
            from: username,
            to: email,
            subject: "Verification Code from OBG",
            text: `Your password reset code is: ${code}\n\nAbove given code expired after an Hour`
        }
        let status = await transporter.sendMail(config).catch((e) => {console.log(e)});
        if(status){
            let codeData = {
                "resetToken": code, 
                "resetTokenExpiration": Date.now()
            }
            let value = await UserModel.updateOne({email: email}, codeData).catch((e)=>console.log(e));
            if(value)
                return {isError:false, data: constantMsgs.MAIL_SENT};
            return {isError:true, data: constantMsgs.UNEXPECTED_ERROR};
        }
    }
    return {isError:true, data:constantMsgs.USER_NOT_FOUND};
}

module.exports.verifyResetCode = async (email, code) => {
    if(!code) return {isError:true, data: "Code is Empty"}
    if(!email) return {isError:true, data: constantMsgs.UNEXPECTED_ERROR};

    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)});
    if(value && parseInt(value.resetToken)===parseInt(code)){
        let expirationTime = new Date(value.resetTokenExpiration).getTime();
        let currentTime = Date.now();
        if((currentTime-expirationTime)<=(parseInt(process.env.RESET_CODE_EXPIRATION_PERIOD)*1000))
            return {isError: false, data: constantMsgs.CODE_MATCHED};
        else
            return {isError:true, data: constantMsgs.CODE_EXPIRED};
    }
    return {isError:true, data: constantMsgs.CODE_NOT_MATCHED};
}

module.exports.logout = async (email) => {
    if(!email) return {isError: true, data:constantMsgs.UNEXPECTED_ERROR}

    let value = await UserModel.updateOne({email: email}, {status: "Inactive"}).catch((e) => {console.log(e)});
    if(value.modifiedCount)
        return {isError:false, data:constantMsgs.LOGOUT_SUCCESS};
    return {isError: true, data:constantMsgs.UNEXPECTED_ERROR};
}

module.exports.changePassword = async (email, password) => {
    if(!email) return {isError:true, data: constantMsgs.UNEXPECTED_ERROR};
    if(!password) return {isError:true, data: "Password is Empty"};

    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)})
    if(value){
        let salt = await bcrypt.genSalt().catch((e) => {console.log(e)});
        if(salt){
            let hashedPassword = await bcrypt.hash(password, salt).catch((e) => {console.log(e)});
            if(hashedPassword) {
                let result = await UserModel.updateOne({email:value.email}, {password: hashedPassword}).catch((e) => console.log(e))
                if(result.modifiedCount) {return {isError:false, data:constantMsgs.PASSWORD_CHANGED}}
                else {return {isError:true, data:constantMsgs.PASSWORD_NOT_CHANGED}}
            } else {return {isError:true, data: constantMsgs.UNEXPECTED_ERROR}}
        } else {return {isError:true, data: constantMsgs.UNEXPECTED_ERROR}}
    }
    return {isError:true, data:constantMsgs.UNEXPECTED_ERROR}; 
}