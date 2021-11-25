const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Politics = {
    getAll: getAll("chinhtri","MaChinhTri", "TenChinhTri", ["Mã TDCT", "Tên TDCT", "Số Đảng viên"]),
    findById: findById("chinhtri","MaChinhTri"),
    create: create("chinhtri", "MaChinhTri"),
    updateById: updateById("chinhtri", "MaChinhTri"),
    remove: remove("chinhtri", "MaChinhTri", "Trình độ"),
}

module.exports = Politics;