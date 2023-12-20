const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const { UNAUTHORIZED } = require("../constants/constants");
const { makeResponse } = require("../services/general");
const { AUTH_FAILED } = require("../constants/messages");


module.exports.authenticateUser = async (req, res, next) => {
    let token = req.headers?.authorization;
    token = token.split(" ")[1];
    if(!token)
        return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED))
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if(decode) {
            let response = await UserModel.findOne({email: decode.email}).catch((e)=>{console.log(e)})
            if(response && response?.status==="Active"){
                req.user=decode;
                return next();
            }
        }
        return res.status(UNAUTHORIZED).send(makeResponse(AUTH_FAILED))
    });
};