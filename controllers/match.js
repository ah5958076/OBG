const { ALLOWED_EXTENSIONS } = require("../constants/constants");
const { EXTENSION_NOT_ALLOWED, VIDEO_NOT_UPLOADED } = require("../constants/messages");
const match = require("../services/match");
const {unlinkSync} = require("fs");


module.exports.store = async (req, res) => {
    if(req.file){
        if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file.originalname.split(".").pop().toLowerCase()))
            res.send(await match.store(req));
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
            res.send(await match.update(req));
        else{
            unlinkSync(req.file.path);
            res.send(EXTENSION_NOT_ALLOWED);
        }
    }else{
        res.send(VIDEO_NOT_UPLOADED);
    }
}
module.exports.delete = async (req, res) => {
    res.send(await match.delete(req.params.id));
}
module.exports.show = async (req, res) => {
    res.send(await match.show(req.params.id));
}
module.exports.list = async (req, res) => {
    res.send(await match.list());
}

module.exports.searchData = async (req, res) => {
    res.send(await match.searchData(req.body.search));
}