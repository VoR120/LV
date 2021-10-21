const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Type = {
    getAll: getAll("hinhthuc"),
    findById: findById("hinhthuc","MaHinhThuc"),
    create: create("hinhthuc", "MaHinhThuc"),
    updateById: updateById("hinhthuc", "MaHinhThuc"),
    remove: remove("hinhthuc", "MaHinhThuc"),
    removeAll: removeAll("hinhthuc")
}

module.exports = Type;