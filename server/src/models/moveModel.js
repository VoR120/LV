const { getAll, findById, create, updateById, removeAll, remove, getDate } = require('./utils');
const sql = require('../configs/db');

const Move = {
    getAll: getAll("chuyensinhhoat"),
    findById: findById("chuyensinhhoat", "MaSoDangVien"),
    findByTypeId: (id, callback) => {
        const sqlQuery = `SELECT 
        csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTu, 
        csh.ChuyenDen, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
        ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
            WHERE csh.MaHinhThuc = "${id}"
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
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
        const sqlQuery = `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTu, 
            csh.ChuyenDen, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
            ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${type}"
            )
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien`;
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
            console.log("Created: ", { MaChuyenSinhHoat: res.insertId, ...newValue });
            callback(null, { MaChuyenSinhHoat: res.insertId, ...newValue });
        })
    },
    updateById: updateById("chuyensinhhoat", "MaChuyenSinhHoat"),
    remove: remove("chuyensinhhoat", "MaSoDangVien"),
    removeAll: removeAll("chuyensinhhoat")
}

module.exports = Move;