const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const FLanguageLevel = {
    getAll: (callback) => {
        sql.query(
            `SELECT trinhdongoaingu.MaTrinhDo, trinhdongoaingu.TenTrinhDo, ngoaingu.TenNgoaiNgu, ngoaingu.MaNgoaiNgu
            FROM ngoaingu, trinhdongoaingu 
            WHERE ngoaingu.MaNgoaiNgu = trinhdongoaingu.MaNgoaiNgu 
            AND ngoaingu.MaNgoaiNgu`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }

                console.log("All: ", res);
                callback(null, { data: res, columnName: ["Mã trình độ", "Tên trình độ", "Tên ngoại ngữ"] });
            })
    },
    findById: findById("trinhdongoaingu", "MaTrinhDo"),
    findByFlId: findById("trinhdongoaingu", "MaNgoaiNgu"),
    create: (newValue, callback) => {
        sql.query(`SELECT MaTrinhDo FROM trinhdongoaingu 
            WHERE MaNgoaiNgu = ${newValue.MaNgoaiNgu}
            AND TenTrinhDo = "${newValue.TenTrinhDo}"`,
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
                sql.query(`INSERT INTO trinhdongoaingu SET ?`, newValue, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    console.log("Created: ", { MaTrinhDo: res.insertId, ...newValue });
                    callback(null, { MaTrinhDo: res.insertId, ...newValue });
                })
            }
        )
    },
    updateById: (id, newValue, callback) => {
        const { TenTrinhDo, MaNgoaiNgu } = newValue;
        const newValue1 = { TenTrinhDo, MaNgoaiNgu };
        sql.query(`UPDATE trinhdongoaingu SET ? WHERE MaTrinhDo = ${id}`, newValue1, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            console.log("Updated: ", { MaTrinhDo: id, ...newValue1 });
            callback(null, { MaTrinhDo: id, ...newValue1 });
        }))
    },
    remove: (id, callback) => {
        sql.query(`SELECT MaSoDangVien FROM ngoaingudangvien WHERE MaTrinhDo = ${id}`, (err, result) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (result.length > 0) {
                callback({ type: 'foreign', message: `Trình độ này đang được sử dụng, không thể xóa!` }, null)
                return
            }
            sql.query(`DELETE FROM TrinhDoNgoaiNgu WHERE MaTrinhDo = ${id}`, (
                (err, res) => {
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
    removeAll: removeAll("trinhdongoaingu"),
}

module.exports = FLanguageLevel;