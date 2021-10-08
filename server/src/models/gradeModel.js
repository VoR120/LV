const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Grade = {
    getAll: getAll("loai"),
    findById: findById("loai","MaLoai"),
    create: create("loai"),
    updateById: updateById("loai", "MaLoai"),
    remove: remove("loai", "MaLoai"),
    removeAll: removeAll("loai")
}

module.exports = Grade;