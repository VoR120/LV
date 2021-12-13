const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Discipline = {
    getAll: (callback) => {
        const sqlQuery = `SELECT kl.MaSoDangVien, dv.HoTen , dv.Email, dv.SoDienThoai, kl.TenKyLuat, kl.NgayKyLuat, kl.HinhThuc, 
            kl.MaKyLuat
            FROM kyluat kl, dangvien dv
            WHERE kl.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0
            ORDER BY NgayTao DESC`;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("All: ", res);
            callback(null, res);
            return;
        })
    },
    findById: findById("kyluat", "MaKyLuat"),
    create: create("kyluat", "MaKyLuat"),
    updateById: updateById("kyluat", "MaKyLuat"),
    remove: (id, callback) => {
        const sqlQuery = `DELETE FROM kyluat WHERE MaKyLuat = ${id}`
        sql.query(sqlQuery, id, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            console.log("Deleted: ", id);
            callback(null, { msg: "Đã xóa!" });
        }))
    },
    removeAll: removeAll("kyluat")
}

module.exports = Discipline;