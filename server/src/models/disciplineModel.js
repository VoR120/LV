const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Discipline = {
    getAll: (callback) => {
        const sqlQuery = `SELECT kyluat.*, dangvien.HoTen , hinhthuc.TenHinhThuc
            FROM kyluat, dangvien, hinhthuc
            WHERE kyluat.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "Kỷ luật"
            )
            AND kyluat.MaHinhThuc = hinhthuc.MaHinhThuc
            AND kyluat.MaSoDangVien = dangvien.MaSoDangVien
            AND dangvien.DaXoa = 0`;
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
    findByTypeId: (id, callback) => {
        const sqlQuery = `SELECT kyluat.*, dangvien.HoTen, hinhthuc.TenHinhThuc
            FROM kyluat, dangvien, hinhthuc
            WHERE kyluat.MaHinhThuc = "${id}"
            AND kyluat.MaHinhThuc = hinhthuc.MaHinhThuc
            AND kyluat.MaSoDangVien = dangvien.MaSoDangVien
            AND dangvien.DaXoa = 0
        `;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("Found: ", res);
            callback(null, res);
            return;
        })
    },
    create: create("kyluat", "MaKyLuat"),
    updateById: updateById("kyluat", "MaKyLuat"),
    remove: remove("kyluat", "MaKyLuat"),
    removeAll: removeAll("kyluat")
}

module.exports = Discipline;