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
    create: create("trinhdongoaingu", "MaTrinhDo"),
    updateById: updateById("trinhdongoaingu", "MaTrinhDo"),
    remove: remove("trinhdongoaingu", "MaTrinhDo"),
    removeAll: removeAll("trinhdongoaingu"),
}

module.exports = FLanguageLevel;