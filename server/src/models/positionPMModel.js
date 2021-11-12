const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const PositionPM = {
    getAll: getAll("chucvu", "MaChucVu", "TenChucVu", ["Mã Chức vụ", "Tên Chức vụ", "Số Đảng viên"]),
    findById: findById("chucvu","MaSoDangVien"),
    create: create("chucvu", "MaSoDangVien"),
    updateById: updateById("chucvu", "MaSoDangVien"),
    remove: remove("chucvu", "MaSoDangVien"),
    removeAll: removeAll("chucvu")
}

module.exports = PositionPM;