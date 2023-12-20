const { registerNewUser } = require("../services/user");
const { makeResponse, encryptData, } = require("../services/general");
const { login, forgotPassword, verifyCode, changePassword, logout } = require("../services/authentication");
const UserModel = require("./../models/User");
const GameModel = require("./../models/Game");
const { OK, INVALID, NOT_FOUND } = require("../constants/constants");
const { UNEXPECTED_ERROR, EMAIL_EMPTY, PASSWORD_EMPTY, USERNAME_EMPTY, NAME_EMPTY, CODE_EMPTY } = require("../constants/messages");






module.exports.verifyToken = async(req, res) => {
    if(req?.user)
        return res.status(OK).send(makeResponse("Authorized",{user: req.user}));
}


module.exports.login = async (req, res) => {
    let email = req.body?.email || "";
    let password = req.body?.password || "";
    if(!email) {return res.status(INVALID).send(makeResponse(EMAIL_EMPTY))}
    if(!password) {return res.status(INVALID).send(makeResponse(PASSWORD_EMPTY))}

    let response = await login(email, password);
    return res.status(response.code).send(response.data);
}


module.exports.SignupUser = async (req, res) => {
    if(!req.body?.username) return res.status(INVALID).send(makeResponse(USERNAME_EMPTY));
    if(!req.body?.fullName) return res.status(INVALID).send(makeResponse(NAME_EMPTY));
    if(!req.body?.password) return res.status(INVALID).send(makeResponse(PASSWORD_EMPTY));
    if(!req.body?.email) return res.status(INVALID).send(makeResponse(EMAIL_EMPTY));

    let userObject = {
        username: req.body.username,
        fullName: req.body.fullName,
        email: req.body.email,
        password: await encryptData(req.body.password),
        role: "User"
    }

    let response = await registerNewUser(userObject);
    return res.status(response.code).send(response.data);
}


module.exports.forgotPassword = async (req, res) => {
    let email = req.body?.email || "";
    if(!email) return res.status(INVALID).send(makeResponse(EMAIL_EMPTY));

    let response = await forgotPassword(email);
    return res.status(response.code).send(response.data);
}


module.exports.verifyCode = async (req, res) => {
    let [email, code]=[req.body?.email, req.body?.reset_code];

    if(!code) return res.status(INVALID).send(makeResponse(CODE_EMPTY));
    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));

    let response = await verifyCode(email, code);
    return res.status(response.code).send(response.data);
}


module.exports.changePassword = async (req, res) => {
    let [email, password] = [req.body?.email, req.body?.password]

    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    if(!password) return res.status(INVALID).send(makeResponse(PASSWORD_EMPTY));

    let response = await changePassword(email, password);
    return res.status(response.code).send(response.data);
}


module.exports.logout = async (req, res) => {
    let email = req.user?.email || "";
    if(!email) return res.status(NOT_FOUND).send(makeResponse(UNEXPECTED_ERROR));
    
    let response = await logout(email);
    return res.status(response.code).send(response.data);
}







module.exports.getDashbaordData = async (req, res) => {

    let totalUsers = await UserModel.count({}).catch((e)=>{console.log(e)})
    let activeUsers = await UserModel.count({status:"Active", email: {$nin:req.user?.email}}).catch((e)=>{console.log(e)})
    let totalGames = await GameModel.count({}).catch((e)=>{console.log(e)})

    res.status(OK).send(makeResponse("", {totalUsers: totalUsers, activeUsers:activeUsers, totalGames: totalGames}));
}