const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const PartyCell = {
    getAll: getAll("chibo", "MaChiBo", "TenChiBo", ["Mã Chi bộ", "Tên chi bộ", "Số Đảng viên"]),
    findById: findById("chibo","MaChiBo"),
    create: create("chibo", "MaChiBo"),
    updateById: updateById("chibo", "MaChiBo"),
    remove: remove("chibo", "MaChiBo"),
    removeAll: removeAll("chibo")
}

module.exports = PartyCell;