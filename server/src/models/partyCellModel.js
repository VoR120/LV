const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const PartyCell = {
    getAll: getAll("chibo"),
    findById: findById("chibo","MaChiBo"),
    create: create("chibo"),
    updateById: updateById("chibo", "MaChiBo"),
    remove: remove("chibo", "MaChiBo"),
    removeAll: removeAll("chibo")
}

module.exports = PartyCell;