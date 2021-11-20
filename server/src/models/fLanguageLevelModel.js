const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const FLanguageLevel = {
    getAll: (callback) => {
        sql.query(
            `SELECT trinhdongoaingu.MaTrinhDo, trinhdongoaingu.TenTrinhDo, ngoaingu.TenNgoaiNgu
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
    updateById: updateById("trinhdongoaingu", "MaTrinhDo"),
    remove: remove("trinhdongoaingu", "MaTrinhDo"),
    removeAll: removeAll("trinhdongoaingu"),
}

module.exports = FLanguageLevel;