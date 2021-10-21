const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Term = {
    getAll: getAll("nhiemky"),
    findById: findById("nhiemky","MaNhiemKy"),
    create: create("nhiemky", "MaNhiemKy"),
    updateById: updateById("nhiemky", "MaNhiemKy"),
    remove: remove("nhiemky", "MaNhiemKy"),
    removeAll: removeAll("nhiemky")
}

module.exports = Term;