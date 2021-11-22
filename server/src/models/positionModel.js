const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Position = {
    getAll: getAll("chucvu","MaChucVu", "TenChucVu", ["Mã Chức vụ", "Tên Chức vụ", "Số Đảng viên"]),
    findById: findById("chucvu", "MaChucVu"),
    create: create("chucvu", "MaChucVu"),
    updateById: updateById("chucvu", "MaChucVu"),
    remove: remove("chucvu", "MaChucVu"),
    removeAll: removeAll("chucvu")
}

module.exports = Position;