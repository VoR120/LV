const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const PartyMember = {
    getAll: getAll("dangvien"),
    findById: findById("dangvien","MaDangVien"),
    create: create("dangvien"),
    updateById: updateById("dangvien", "MaDangVien"),
    remove: remove("dangvien", "MaDangVien"),
    removeAll: removeAll("dangvien")
}

module.exports = PartyMember;