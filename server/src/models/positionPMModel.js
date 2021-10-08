const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const PositionPM = {
    getAll: getAll("chucvu", "MaChucVu", "TenChucVu", ["Mã Chức vụ", "Tên Chức vụ", "Số Đảng viên"]),
    findById: findById("chucvu","MaDangVien"),
    create: create("chucvu"),
    updateById: updateById("chucvu", "MaDangVien"),
    remove: remove("chucvu", "MaDangVien"),
    removeAll: removeAll("chucvu")
}

module.exports = PositionPM;