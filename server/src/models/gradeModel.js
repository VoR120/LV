const sql = require('../configs/db');
const { getAll, findById, updateById, removeAll, remove, zeroFill } = require('./utils');

const Grade = {
    getAll: (callback) => {
        sql.query(`SELECT * FROM loai`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }
            // console.log("All: ", res);
            let yearArray = [];

            // Lấy năm không trùng
            res.forEach(el => {
                yearArray.includes(el.Nam) || yearArray.push(el.Nam)
            });
            let yearWithQuan = [];
            let max = 0;

            // Đếm số lượng loại theo năm
            yearArray.forEach(year => {
                let q = 0;
                res.forEach(el => {
                    el.Nam == year && q++
                })
                yearWithQuan.push({ Nam: year, quantity: q })
            })

            // Lấy số lượng lớn nhất
            yearWithQuan.forEach(y => {
                max = y.quantity > max ? y.quantity : max;
            })
            let result = [];
            yearWithQuan.forEach(el => {
                let obj = {};
                let arr = [];
                obj.Nam = el.Nam
                res.forEach(r => {
                    if (r.Nam == el.Nam) {
                        arr.push({ MaLoai: r.MaLoai, TenLoai: r.TenLoai })
                    }
                })
                obj.Data = arr
                result.push(obj);
            })
            let columnName = ["Năm"];
            for (let i = 1; i <= max; i++) {
                columnName.push(`Loại ${i}`);
            }
            callback(null, { data: result, columnName });
        })
    },
    findOne: (id, callback) => {
        const sqlQuery = `SELECT * FROM danhgiadangvien WHERE MaLoai = ${id}`
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            callback(null, res);
            return
        })
    },
    findById: findById("loai", "MaLoai"),
    create: (newValue, callback) => {
        sql.query(`SELECT MaLoai FROM loai 
            WHERE TenLoai = "${newValue["TenLoai"]}" 
            AND Nam = "${newValue["Nam"]}" `,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(null, err);
                    return;
                }
                if (res.length) {
                    callback({ type: "duplicated" }, null)
                    return;
                }
                sql.query(`INSERT INTO loai SET ?`, newValue, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(null, err);
                        return;
                    }
                    console.log("Created: ", { MaHinhThuc: res.insertId, ...newValue });
                    callback(null, { MaHinhThuc: res.insertId, ...newValue });
                })
            })
    },
    updateById: (id, newValue, callback) => {
        const sqlQuery = `UPDATE loai SET ? WHERE MaLoai = ${id}`
        sql.query(sqlQuery, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }
            callback(null, { msg: "Thành công!" })
        }))
    },
    remove: (id, callback) => {
        const sqlQuerySelect = `SELECT MaSoDangVien FROM loaidangvien WHERE MaLoai = ${id}`
        sql.query(sqlQuerySelect, (err, result) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (result.length > 0) {
                callback({ type: 'foreign', message: `Có loại đang được sử dụng, không thể xóa!` }, null)
                return
            }
            const sqlQuery = `DELETE FROM loai WHERE MaLoai = ${id}`
            sql.query(sqlQuery, ((err, res) => {
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
    removeAll: removeAll("loai")
}

module.exports = Grade;