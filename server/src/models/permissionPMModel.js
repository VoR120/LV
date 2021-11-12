const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const PermissionPM = {
    getAll: getAll("quyendangvien"),
    findById: findById("quyendangvien","MaSoDangVien"),
    create: create("quyendangvien", "MaSoDangVien"),
    // updateById: updateById("quyendangvien", "MaSoDangVien"),
    remove: remove("quyendangvien", "MaSoDangVien"),
    removeAll: removeAll("quyendangvien")
}

module.exports = PermissionPM;