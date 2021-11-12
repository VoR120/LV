const { getAll, findById, create, updateById, removeAll, remove, getDate } = require('./utils');
const sql = require('../configs/db');

const Move = {
    getAll: getAll("chuyensinhhoat"),
    findById: findById("chuyensinhhoat", "MaSoDangVien"),
    findByTypeId: (id, callback) => {
        const sqlQuery = `SELECT chuyensinhhoat.*, dangvien.HoTen, hinhthuc.TenHinhThuc
            FROM chuyensinhhoat, dangvien, hinhthuc
            WHERE chuyensinhhoat.MaHinhThuc = "${id}"
            AND chuyensinhhoat.MaHinhThuc = hinhthuc.MaHinhThuc
            AND chuyensinhhoat.MaSoDangVien = dangvien.MaSoDangVien
        `;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            let result = [...res]
            res.map((el, index) => {
                result[index].NgayChuyenDi = result[index].NgayChuyenDi && getDate(result[index].NgayChuyenDi);
                result[index].NgayChuyenDen = result[index].NgayChuyenDen && getDate(result[index].NgayChuyenDen);
            })
            console.log("Found: ", result);
            callback(null, result);
            return;
        })
    },
    findByType: (type, callback) => {
        const sqlQuery = `SELECT chuyensinhhoat.*, dangvien.HoTen , hinhthuc.TenHinhThuc
            FROM chuyensinhhoat, dangvien, hinhthuc
            WHERE chuyensinhhoat.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${type}"
            )
            AND chuyensinhhoat.MaHinhThuc = hinhthuc.MaHinhThuc
            AND chuyensinhhoat.MaSoDangVien = dangvien.MaSoDangVien`;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            let result = [...res]
            res.map((el, index) => {
                result[index].NgayChuyenDi = result[index].NgayChuyenDi && getDate(result[index].NgayChuyenDi);
                result[index].NgayChuyenDen = result[index].NgayChuyenDen && getDate(result[index].NgayChuyenDen);
            })
            console.log("Found: ", result);
            callback(null, result);
            return;
        })
    },
    create: (newValue, callback) => {
        sql.query(`INSERT INTO chuyensinhhoat SET ?`, newValue, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("Created: ", { newValue });
            callback(null, { newValue });
        })
    },
    updateById: updateById("chuyensinhhoat", "MaSoDangVien"),
    remove: remove("chuyensinhhoat", "MaSoDangVien"),
    removeAll: removeAll("chuyensinhhoat")
}

module.exports = Move;