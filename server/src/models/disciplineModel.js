const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Discipline = {
    getAll: getAll("kyluat"),
    findById: findById("kyluat","MaKyLuat"),
    create: create("kyluat"),
    updateById: updateById("kyluat", "MaKyLuat"),
    remove: remove("kyluat", "MaKyLuat"),
    removeAll: removeAll("kyluat")
}

module.exports = Discipline;