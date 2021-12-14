const { findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Reward = {
    getAll: (callback) => {
        const sqlQuery = `SELECT kt.MaSoDangVien, dv.HoTen, dv.Email, dv.SoDienThoai, kt.TenKhenThuong, kt.NgayKhenThuong, kt.HinhThuc,
            kt.MaKhenThuong
            FROM khenthuong kt, dangvien dv
            WHERE kt.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0
            ORDER BY NgayTao DESC`;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            // console.log("All: ", res);
            callback(null, res);
            return;
        })
    },
    findById: findById("khenthuong", "MaKhenThuong"),
    create: async (newValue, callback) => {
        console.log(newValue);
        try {
            const { MaSoDangVienArr, TenKhenThuong, NgayKhenThuong, HinhThuc } = newValue
            const sqlPromise = sql.promise();
            await Promise.all(MaSoDangVienArr.map(async (el, index) => {
                const value = { MaSoDangVien: el.MaSoDangVien, TenKhenThuong, NgayKhenThuong, HinhThuc }
                await sqlPromise.query(`INSERT INTO khenthuong SET ?`, value)
            }))
            console.log("Created: ", newValue);
            callback(null, { msg: "Đã cập nhật!" });
        } catch (error) {
            callback(error, null);
        }
    },
    updateById: updateById("khenthuong", "MaKhenThuong"),
    remove: (id, callback) => {
        const sqlQuery = `DELETE FROM khenthuong WHERE MaKhenThuong = ${id}`
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
    removeAll: removeAll("khenthuong")
}

module.exports = Reward;