const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Religion = {
    getAll: getAll("tongiao", "MaTonGiao", "TenTonGiao", ["Mã tôn giáo", "Tên tôn giáo", "Số Đảng viên"]),
    findById: findById("tongiao", "MaTonGiao"),
    create: create("tongiao", "MaTonGiao"),
    updateById: updateById("tongiao", "MaTonGiao", "TenTonGiao"),
    remove: remove("tongiao", "MaTonGiao", "Tôn giáo"),
    removeAll: removeAll("tongiao")
}

module.exports = Religion;