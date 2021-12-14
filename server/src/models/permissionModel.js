const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Permission = {
    getAll: (callback) => {
        sql.query(`SELECT * FROM quyen`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            // console.log("All: ", res);
            callback(null, { data: res });
        })
    },
    findById: findById("quyen", "MaQuyen"),
    create: create("quyen", "MaQuyen"),
    updateById: updateById("quyen", "MaQuyen"),
    remove: remove("quyen", "Maquyen"),
    removeAll: removeAll("quyen")
}

module.exports = Permission;