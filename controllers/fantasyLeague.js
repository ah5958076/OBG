const fantasyLeague = require("../services/fantasyLeague");


module.exports.store = async (req, res) => {
    res.send(await fantasyLeague.store(req.body));
}
module.exports.update = async (req, res) => {
    res.send(await fantasyLeague.update(req.body));
}
module.exports.delete = async (req, res) => {
    res.send(await fantasyLeague.delete(req.body?.name));
}
module.exports.show = async (req, res) => {
    res.send(await fantasyLeague.show(req.body?.name));
}
module.exports.list = async (req, res) => {
    let page_number = req.query.pageNum;
    if(!page_number)
        page_number=1;
    res.send(await fantasyLeague.list(page_number));
}

module.exports.downloadExcel = async (req, res) => {
    let file_name = await fantasyLeague.downloadExcel();
    res.download(file_name);
}

module.exports.searchData = async (req, res) => {
    res.send(await fantasyLeague.searchData(req.body.search));
}