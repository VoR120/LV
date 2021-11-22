const { findById, create, updateById, removeAll, remove, getDate } = require('./utils');
const sql = require('../configs/db');

const Reward = {
    getAll: (callback) => {
        const sqlQuery = `SELECT kt.MaSoDangVien, dv.HoTen, kt.TenKhenThuong, kt.NgayKhenThuong, ht.TenHinhThuc,
            kt.MaKhenThuong, kt.MaHinhThuc
            FROM khenthuong kt, dangvien dv, hinhthuc ht
            WHERE kt.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "Khen thưởng"
            )
            AND kt.MaHinhThuc = ht.MaHinhThuc
            AND kt.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            let result = [...res]
            res.map((el, index) => {
                result[index].NgayKhenThuong = result[index].NgayKhenThuong && getDate(result[index].NgayKhenThuong);
            })
            console.log("All: ", result);
            callback(null, result);
            return;
        })
    },
    findById: findById("khenthuong", "MaKhenThuong"),
    findByTypeId: (id, callback) => {
        const sqlQuery = `SELECT khenthuong.*, dangvien.HoTen, hinhthuc.TenHinhThuc
            FROM khenthuong, dangvien, hinhthuc
            WHERE khenthuong.MaHinhThuc = "${id}"
            AND khenthuong.MaHinhThuc = hinhthuc.MaHinhThuc
            AND khenthuong.MaSoDangVien = dangvien.MaSoDangVien
            AND dangvien.DaXoa = 0
        `;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            let result = [...res]
            res.map((el, index) => {
                result[index].NgayKhenthuong = result[index].NgayKhenthuong && getDate(result[index].NgayKhenthuong);
            })
            console.log("Found: ", result);
            callback(null, result);
            return;
        })
    },
    create: create("khenthuong", "MaKhenThuong"),
    updateById: updateById("khenthuong", "MaKhenThuong"),
    remove: remove("khenthuong", "MaKhenThuong"),
    removeAll: removeAll("khenthuong")
}

module.exports = Reward;