const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const fLpM = {
    getAll: (callback) => {
        sql.query(`SELECT *.ngoaingudangvien, ngoaingu.TenNgoaiNgu, trinhdo.TenTrinhDo
        FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
        WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
        AND ngoaingudangvien.MaTrinhDo = trinhdo.MaTrinhDo
        `,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                // console.log("All: ", res);
                callback(null, { data: res });
            })
    },
    findById: (id, callback) => {
        sql.query(`SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
        FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
        WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
        AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
        AND ngoaingudangvien.MaSoDangVien = "${id}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                // console.log("All: ", res);
                callback(null, { data: res });
            })
    },
    create: (newValue, callback) => {
        sql.query(`INSERT INTO ngoaingudangvien SET ?`, newValue, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            sql.query(`SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
                FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
                WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
                AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
                AND ngoaingudangvien.MaSoDangVien = "${newValue.MaSoDangVien}"
                AND ngoaingudangvien.MaNgoaiNgu = "${newValue.MaNgoaiNgu}"
                `,
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    console.log("Created: ", res);
                    callback(null, { data: res });
                })
        })
    },
    updateById: updateById("ngoaingudangvien", "MaSoDangVien"),
    remove: (id, callback) => {
        sql.query(`DELETE FROM ngoaingudangvien WHERE MaSoDangVien = "${id}"`, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            console.log("Deleted: ", id);
            callback(null, res);
        }))
    },
    removeAll: removeAll("ngoaingudangvien")
}

module.exports = fLpM;