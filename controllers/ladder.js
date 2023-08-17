const { ALLOWED_EXTENSIONS } = require("../constants/constants");
const { EXTENSION_NOT_ALLOWED, IMAGE_NOT_UPLOADED } = require("../constants/messages");
const ladder = require("../services/ladder");
const {unlinkSync} = require("fs");


module.exports.store = async (req, res) => {
    if(req.file){
        if(ALLOWED_EXTENSIONS.toLowerCase().includes(req.file.originalname.split(".").pop().toLowerCase()))
            res.send(await ladder.store(req));
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
            res.send(await ladder.update(req));
        else{
            unlinkSync(req.file.path);
            res.send(EXTENSION_NOT_ALLOWED);
        }
    }else{
        res.send(IMAGE_NOT_UPLOADED);
    }
}
module.exports.delete = async (req, res) => {
    res.send(await ladder.delete(req.body?.name));
}
module.exports.show = async (req, res) => {
    res.send(await ladder.show(req.body?.name));
}
module.exports.list = async (req, res) => {
    let page_number = req.query.pageNum;
    if(!page_number)
        page_number=1;
    res.send(await ladder.list(page_number));
}

module.exports.downloadExcel = async (req, res) => {
    let file_name = await ladder.downloadExcel();
    res.download(file_name);
}


module.exports.searchData = async (req, res) => {
    res.send(await ladder.searchData(req.body.search));
}