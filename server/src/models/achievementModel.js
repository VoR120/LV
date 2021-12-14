const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Achievement = {
    getAll: (callback) => {
        sql.query(`SELECT thanhtich.MaThanhTich, thanhtich.TenThanhTich, count(thanhtichdangvien.MaThanhTich) AS SoDangVien 
        FROM thanhtich 
        LEFT JOIN thanhtichdangvien
        INNER JOIN dangvien
        ON dangvien.MaSoDangVien = thanhtichdangvien.MaSoDangVien
        ON thanhtichdangvien.MaThanhTich=thanhtich.MaThanhTich
        AND dangvien.DaXoa = 0
        GROUP BY thanhtich.MaThanhTich
        `,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                // console.log("All: ", res);
                callback(null, { data: res, columnName: ["Mã thành tích", "Tên thành tích", "Số Đảng viên"] });
            })
    },
    findById: findById("thanhtich", "MaThanhTich"),
    create: create("thanhtich", "MaThanhTich"),
    updateById: (id, newValue, callback) => {
        sql.query(`UPDATE thanhtich SET ? WHERE MaThanhTich = ${id}`, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }
            sql.query(`SELECT thanhtich.MaThanhTich, thanhtich.TenThanhTich, count(thanhtichdangvien.MaThanhTich) AS SoDangVien 
                FROM thanhtich 
                LEFT JOIN thanhtichdangvien
                INNER JOIN dangvien
                ON dangvien.MaSoDangVien = thanhtichdangvien.MaSoDangVien
                ON thanhtichdangvien.MaThanhTich=thanhtich.MaThanhTich
                AND dangvien.DaXoa = 0
                AND thanhtichdangvien.MaThanhTich = ${id}
            `, (err, res1) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("Updated: ", res1[0]);
                callback(null, res1[0]);
            })
        }))
    },
    remove: (id, callback) => {
        sql.query(`SELECT MaSoDangVien FROM thanhtichdangvien WHERE MaThanhTich = ${id}`, (err, result) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (result.length > 0) {
                callback({ type: 'foreign', message: `Thành tích này đang được sử dụng, không thể xóa!` }, null)
                return
            }
            sql.query(`DELETE FROM thanhtich WHERE MaThanhTich = ${id}`, ((err, res) => {
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
                callback(null, res);
            }))
        })
    },
    removeAll: removeAll("thanhtich")
}

module.exports = Achievement;