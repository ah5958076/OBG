const team = require("../services/team");

module.exports.store = async (req, res) => {
    res.send(await team.store(req.body));
}

module.exports.update = async (req, res) => {
    res.send(await team.update(req.body));
}

module.exports.delete = async (req, res) => {
    res.send(await team.delete(req.params.id));
}

module.exports.show = async (req, res) => {
    res.send(await team.show(req.params.id));
}

module.exports.list = async (req, res) => {
    res.send(await team.list());
}


module.exports.search = async (req, res) => {
    res.send(await team.search(req.body.search));
}