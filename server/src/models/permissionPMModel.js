const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const PermissionPM = {
    getAll: getAll("quyendangvien"),
    findById: findById("quyendangvien","MaDangVien"),
    create: create("quyendangvien"),
    // updateById: updateById("quyendangvien", "MaDangVien"),
    remove: remove("quyendangvien", "MaDangVien"),
    removeAll: removeAll("quyendangvien")
}

module.exports = PermissionPM;