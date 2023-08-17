const { ALLOWED_EXTENSIONS } = require("../constants/constants");
const userServices = require("../services/user");
const {unlinkSync} = require("fs");
const { EXTENSION_NOT_ALLOWED } = require("../constants/messages");


module.exports.store = async (req, res) => {
    res.send(await userServices.store(req.body));
}
module.exports.update = async (req, res) => {
    let email = req.body.email;
    delete req.body.email;
    res.send(await userServices.update(email, req.body));
}
module.exports.delete = async (req, res) => {
    res.send(await userServices.delete(req.body.email));
}
module.exports.show = async (req, res) => {
    res.send(await userServices.show(req.body.email));
}
module.exports.list = async (req, res) => {
    let page_number = req.query.pageNum;
    if(!page_number)
        page_number=1;
    res.send(await userServices.list(page_number));
}

module.exports.downloadExcel = async (req, res) => {
    let file_name = await userServices.downloadExcel();
    res.download(file_name);
}



module.exports.changePassword = async (req, res) => {
    res.send(await userServices.changePassword(req.body));
}
module.exports.searchData = async (req, res) => {
    res.send(await userServices.searchData(req.body.search));
}
module.exports.uploadProfilePhoto = async (req, res) => {
    if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file && req.file.originalname.split(".").pop().toLowerCase())){
        res.send(await userServices.uploadProfilePhoto(req.body.email, req.file.path));
    }else{
        unlinkSync(req.file.path);
        res.send(EXTENSION_NOT_ALLOWED);
    }
}
module.exports.uploadCoverPhoto = async (req, res) => {
    if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file && req.file.originalname.split(".").pop().toLowerCase())){
        res.send(await userServices.uploadCoverPhoto(req.body.email, req.file.path));
    }else{
        unlinkSync(req.file.path);
        res.send(EXTENSION_NOT_ALLOWED);
    }
}