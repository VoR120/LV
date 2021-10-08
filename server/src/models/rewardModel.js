const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Reward = {
    getAll: getAll("khenthuong"),
    findById: findById("khenthuong","MaKhenThuong"),
    create: create("khenthuong"),
    updateById: updateById("khenthuong", "MaKhenThuong"),
    remove: remove("khenthuong", "MaKhenThuong"),
    removeAll: removeAll("khenthuong")
}

module.exports = Reward;