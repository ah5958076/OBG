const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports.authenticateUser = (req, res, next) => {
    let token = req.headers?.authorization;
    if(!token){
        req.auth={auth:false, role:null};
        return next();
    }
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if(err) req.auth={auth:false, role:null};
        else if(decode) {req.auth={auth:true, role:decode.role}; req.user=decode}
        else req.auth={auth:false, role:null};
    });
    next();
};