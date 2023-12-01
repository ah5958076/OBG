const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports.authenticateUser = (req, res, next) => {
    let token = req.headers?.authorization;
    if(!token){
        req.auth=false;
        return next();
    }
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if(err) req.auth=false;
        else if(decode) req.auth=true;
        else req.auth=false;
    });
    next();
};