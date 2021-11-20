const { getAll, findById, create, updateById, removeAll, remove, zeroFill } = require('./utils');
const sql = require('../configs/db');

const Type = {
    getAll: getAll("hinhthuc"),
    findById: findById("hinhthuc", "MaHinhThuc"),
    create: (newValue, callback) => {
        sql.query(`SELECT MaHinhThuc FROM hinhthuc 
            WHERE TenHinhThuc = "${newValue.TenHinhThuc}"
            AND LoaiHinhThuc = "${newValue.LoaiHinhThuc}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                if (res.length) {
                    callback({ type: "duplicated" }, null)
                    return;
                }
                sql.query(`INSERT INTO hinhthuc SET ?`, newValue, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    console.log("Created: ", { MaHinhThuc: res.insertId, ...newValue });
                    callback(null, { MaHinhThuc: res.insertId, ...newValue });
                })
            }
        )
    },
    updateById: updateById("hinhthuc", "MaHinhThuc"),
    remove: remove("hinhthuc", "MaHinhThuc"),
    removeAll: removeAll("hinhthuc")
}

module.exports = Type;