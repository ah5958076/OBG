const authentication = require("../services/authentication");
const user = require("../services/user");



module.exports.login = async (req, res) => {
    let [email, password] = [req.body.email, req.body.password];
    res.send(await authentication.login(email, password));
}

module.exports.SignupUser = async (req, res) => {
    res.send(await user.SignupUser(req.body));
}

module.exports.forgotPassword = async (req, res) => {
    res.send(await authentication.forgotPassword(req.body.email));
}

module.exports.verifyCode = async (req, res) => {
    let [email, code]=[req.body.email, req.body.reset_code];
    res.send(await authentication.verifyResetCode(email, code));
}

module.exports.logout = async (req, res) => {
    res.send(await authentication.logout(req.params.email))
}