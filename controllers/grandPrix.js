const grandPrix = require("../services/grandPrix");


module.exports.store = async (req, res) => {
    res.send(await grandPrix.store(req.body));
}
module.exports.update = async (req, res) => {
    res.send(await grandPrix.update(req.body));
}
module.exports.delete = async (req, res) => {
    res.send(await grandPrix.delete(req.body?.name));
}
module.exports.show = async (req, res) => {
    res.send(await grandPrix.show(req.body?.name));
}
module.exports.list = async (req, res) => {
    let page_number = req.query.pageNum;
    if(!page_number)
        page_number=1;
    res.send(await grandPrix.list(page_number));
}

module.exports.downloadExcel = async (req, res) => {
    let file_name = await grandPrix.downloadExcel();
    res.download(file_name);
}

module.exports.searchData = async (req, res) => {
    res.send(await grandPrix.searchData(req.body.search));
}