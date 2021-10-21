const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const IT = {
    getAll: getAll("tinhoc", "MaTinHoc", "TenTinHoc", ["Mã TDTH", "Tên TDTH", "Số Đảng viên"]),
    findById: findById("tinhoc","MaTinHoc"),
    create: create("tinhoc", "MaTinHoc"),
    updateById: updateById("tinhoc", "MaTinHoc"),
    remove: remove("tinhoc", "MaTinHoc"),
    removeAll: removeAll("tinhoc")
}

module.exports = IT;