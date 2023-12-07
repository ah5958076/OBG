const jwt = require("jsonwebtoken");
const { registerNewUser } = require("../services/user");
const UserModel = require("./../models/User");
const GameModel = require("./../models/Game");
const { UNAUTHORIZED, OK, INVALID, NOT_FOUND } = require("../constants/constants");
const { makeResponse, encryptData, sendMail } = require("../services/general");
const { USER_NOT_FOUND, UNEXPECTED_ERROR, MAIL_SENT, CODE_NOT_MATCHED, CODE_MATCHED, CODE_EXPIRED, PASSWORD_CHANGED, AUTH_FAILED, LOGOUT_SUCCESS } = require("../constants/messages");



module.exports.verifyToken = async(req, res) => {
    if(req.auth?.auth===true)
        return res.status(OK).send(makeResponse("Authorized",{role: req.auth?.role}));
    return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
}

module.exports.login = async (req, res) => {
    // validation check ...
    if(!req.body?.email) {return res.status(INVALID).send(makeResponse("Email is empty"))}
    if(!req.body?.password) {return res.status(INVALID).send(makeResponse("Password is empty"))}

    let value = await UserModel.findOne({email: email}).catch((err) => {console.log(err)});
    if(value){
        let payload = {"email": email, "role": value?.role};
        let result = await bcrypt.compare(password, value.password).catch((e) => {console.log(e)});
        if(result){
            let value = await UserModel.updateOne({email: email}, {status: "Active"}).catch((e) => {console.log(e)});
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: parseInt(process.env.RESET_CODE_EXPIRATION_PERIOD)});
            if(value.modifiedCount && token){
                return res.status(OK).send(makeResponse("Login successfully", {role:payload.role, email:payload.email, token:token}));
            }
            return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
       }
    }
    return res.status(INVALID).send(makeResponse("Either Username or Password is incorrect"))
}

module.exports.SignupUser = async (req, res) => {
    if(!req.auth?.auth)
        return res.status(UNAUTHORIZED).send(makeResponse("Authentication failed"));

    if(!req.body?.username) return res.status(INVALID).send(makeResponse("Username is empty"));
    if(!req.body?.fullName) return res.status(INVALID).send(makeResponse("Full Name is empty"));
    if(!req.body?.password) return res.status(INVALID).send(makeResponse("Password is empty"));
    if(!req.body?.email) return res.status(INVALID).send(makeResponse("Email is empty"));

    let userObject = {
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,
        password: await encryptData(req.body.password),
        role: "User"
    }

    let response = await registerNewUser(userObject);
    return res.status(response.code).send(makeResponse(response.data));
}

module.exports.forgotPassword = async (req, res) => {
    let email = req.body?.email || "";
    if(!email) return res.status(INVALID).send(makeResponse("Email is empty"));

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
            if(value) return res.status(OK).send(makeResponse(MAIL_SENT));
            return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
        }
        return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    }
    return res.status(INVALID).send(makeResponse(USER_NOT_FOUND));
}

module.exports.verifyCode = async (req, res) => {
    let [email, code]=[req.body?.email, req.body?.reset_code];

    if(!email) return res.status(INVALID).send(makeResponse(UNEXPECTED_ERROR));
    if(!code) return res.status(INVALID).send(makeResponse("Code is Empty"));

    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)});
    if(value){
        if(parseInt(value.resetToken)===parseInt(code)){
            let expirationTime = new Date(value.resetTokenExpiration).getTime();
            let currentTime = Date.now();
            if((currentTime-expirationTime)<=(parseInt(process.env.RESET_CODE_EXPIRATION_PERIOD)*1000))
                return res.status(OK).send(makeResponse(CODE_MATCHED));
            return res.status(INVALID).send(makeResponse(CODE_EXPIRED));
        }
        return res.status(INVALID).send(makeResponse(CODE_NOT_MATCHED));
    }
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}

module.exports.changePassword = async (req, res) => {
    let [email, password] = [req.body?.email, req.body?.password]

    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!password) return res.status(INVALID).send(makeResponse("Password is Empty"));

    let value = await UserModel.findOne({email: email}).catch((e) => {console.log(e)})
    if(value){

        let hashedPassword = await encryptData(password);
        if(hashedPassword) {
            value = await UserModel.updateOne({email:email}, {password: hashedPassword}).catch((e) => console.log(e));
            if(value.modifiedCount) return res.status(OK).send(makeResponse(PASSWORD_CHANGED));
        }
    }
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR)); 
}

module.exports.logout = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));
    let email = req.body?.email;
    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));

    let value = await UserModel.updateOne({email: email}, {status: "Inactive"}).catch((e) => {console.log(e)});
    if(value.modifiedCount)
        return res.status(OK).send(makeResponse(LOGOUT_SUCCESS));
    return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
}



module.exports.getDashbaordData = async (req, res) => {
    if(!req.auth?.auth) return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED));

    let totalUsers = await UserModel.count({}).catch((e)=>{console.log(e)})
    let activeUsers = await UserModel.count({status:"Active", email: {$nin:req.user?.email}}).catch((e)=>{console.log(e)})
    let totalGames = await GameModel.count({}).catch((e)=>{console.log(e)})

    res.status(OK).send(makeResponse("", {auth: req.auth, totalUsers: totalUsers, activeUsers:activeUsers, totalGames: totalGames}));
}