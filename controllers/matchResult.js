const matchResult = require("../services/matchResult");


module.exports.store = async (req, res) => {
    res.send(await matchResult.store(req));
}
module.exports.update = async (req, res) => {
    res.send(await matchResult.update(req));
}
module.exports.delete = async (req, res) => {
    res.send(await matchResult.delete(req.params.id));
}
module.exports.show = async (req, res) => {
    res.send(await matchResult.show(req.params.id));
}
module.exports.list = async (req, res) => {
    let page_number = req.query.pageNum;
    if(!page_number)
        page_number=1;
    res.send(await matchResult.list(page_number));
}

module.exports.searchData = async (req, res) => {
    res.send(await matchResult.searchData(req.body.search));
}