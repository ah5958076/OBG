const { ALLOWED_EXTENSIONS } = require("../constants/constants");
const { EXTENSION_NOT_ALLOWED, VIDEO_NOT_UPLOADED } = require("../constants/messages");
const tournamentResult = require("../services/tournamentResult");
const {unlinkSync} = require("fs");


module.exports.store = async (req, res) => {
    if(req.file){
        if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file.originalname.split(".").pop().toLowerCase()))
            res.send(await tournamentResult.store(req));
        else{
            unlinkSync(req.file.path);
            res.send(EXTENSION_NOT_ALLOWED);
        }
    }else{
        res.send(VIDEO_NOT_UPLOADED);
    }
}
module.exports.update = async (req, res) => {
    if(req.file){
        if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file.originalname.split(".").pop().toLowerCase()))
            res.send(await tournamentResult.update(req));
        else{
            unlinkSync(req.file.path);
            res.send(EXTENSION_NOT_ALLOWED);
        }
    }else{
        res.send(VIDEO_NOT_UPLOADED);
    }
}
module.exports.delete = async (req, res) => {
    res.send(await tournamentResult.delete(req.params.id));
}
module.exports.show = async (req, res) => {
    res.send(await tournamentResult.show(req.params.id));
}
module.exports.list = async (req, res) => {
    let page_number = req.query.pageNum;
    if(!page_number)
        page_number=1;
    res.send(await tournamentResult.list(page_number));
}

module.exports.searchData = async (req, res) => {
    res.send(await tournamentResult.searchData(req.body.search));
}