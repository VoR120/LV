const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Ethnic = {
    getAll: getAll("dantoc","MaDanToc","TenDanToc", ["Mã dân tộc", "Tên dân tộc", "Số Đảng viên"]),
    findById: findById("dantoc","MaDanToc"),
    create: create("dantoc"),
    updateById: updateById("dantoc", "MaDanToc"),
    remove: remove("dantoc", "MaDanToc"),
    removeAll: removeAll("dantoc")
}

module.exports = Ethnic;