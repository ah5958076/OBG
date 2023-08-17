const { ALLOWED_EXTENSIONS } = require("../constants/constants");
const { EXTENSION_NOT_ALLOWED, IMAGE_NOT_UPLOADED } = require("../constants/messages");
const inventory = require("../services/inventory");
const {unlinkSync}=require("fs");


module.exports.store = async (req, res) => {
    if(req.file){
        if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file.originalname.split(".").pop().toLowerCase()))
            res.send(await inventory.store(req));
        else{
            unlinkSync(req.file.path);
            res.send(EXTENSION_NOT_ALLOWED);
        }
    }else{
        res.send(IMAGE_NOT_UPLOADED);
    }
}
module.exports.update = async (req, res) => {
    if(req.file){
        if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file.originalname.split(".").pop().toLowerCase()))
            res.send(await inventory.update(req));
        else{
            unlinkSync(req.file.path);
            res.send(EXTENSION_NOT_ALLOWED);
        }
    }else{
        res.send(IMAGE_NOT_UPLOADED);
    }
}
module.exports.delete = async (req, res) => {
    res.send(await inventory.delete(req.body?.name));
}
module.exports.show = async (req, res) => {
    res.send(await inventory.show(req.body?.name));
}
module.exports.list = async (req, res) => {
    res.send(await inventory.list());
}

module.exports.searchData = async (req, res) => {
    res.send(await inventory.searchData(req.body.search));
}