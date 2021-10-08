const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');

const Permission = {
    getAll: getAll("quyen"),
    findById: findById("quyen","MaQuyen"),
    create: create("quyen"),
    updateById: updateById("quyen", "MaQuyen"),
    remove: remove("quyen", "Maquyen"),
    removeAll: removeAll("quyen")
}

module.exports = Permission;