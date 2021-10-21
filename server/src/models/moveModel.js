const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Move = {
    getAll: getAll("chuyensinhhoat"),
    findById: findById("chuyensinhhoat","MaDangVien"),
    create: create("chuyensinhhoat", "MaDangVien"),
    updateById: updateById("chuyensinhhoat", "MaDangVien"),
    remove: remove("chuyensinhhoat", "MaDangVien"),
    removeAll: removeAll("chuyensinhhoat")
}

module.exports = Move;