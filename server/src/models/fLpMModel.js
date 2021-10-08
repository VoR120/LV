const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const fLpM = {
    getAll: getAll("ngoaingudangviendangvien"),
    findById: findById("ngoaingudangvien","MaDangVien"),
    create: create("ngoaingudangvien"),
    updateById: updateById("ngoaingudangvien", "MaDangVien"),
    remove: remove("ngoaingudangvien", "MaDangVien"),
    removeAll: removeAll("ngoaingudangvien")
}

module.exports = fLpM;