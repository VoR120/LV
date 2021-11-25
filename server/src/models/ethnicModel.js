const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Ethnic = {
    getAll: getAll("dantoc","MaDanToc","TenDanToc", ["Mã dân tộc", "Tên dân tộc", "Số Đảng viên"]),
    findById: findById("dantoc","MaDanToc"),
    create: create("dantoc", "MaDanToc"),
    updateById: updateById("dantoc", "MaDanToc"),
    remove: remove("dantoc", "MaDanToc", "Dân tộc"),
    removeAll: removeAll("dantoc")
}

module.exports = Ethnic;