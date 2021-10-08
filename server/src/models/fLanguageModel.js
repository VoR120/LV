const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const FLanguage = {
    getAll: (callback) => {
        sql.query(`SELECT ngoaingu.MaNgoaiNgu, ngoaingu.TenNgoaiNgu, count(ngoaingudangvien.MaNgoaiNgu) AS SoDangVien 
        FROM ngoaingu 
        LEFT JOIN ngoaingudangvien 
        INNER JOIN dangvien
        ON dangvien.MaDangVien = ngoaingudangvien.MaDangVien
        ON ngoaingudangvien.MaNgoaiNgu=ngoaingu.MaNgoaiNgu
        GROUP BY ngoaingu.MaNgoaiNgu`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(null, err);
                    return;
                }
                console.log("All: ", res);
                callback(null, { data: res, columnName: ["Mã Ngoại Ngữ", "Tên Ngoại Ngữ", "Số Đảng viên"] });
            })
    },
    findById: findById("ngoaingu", "MaNgoaiNgu"),
    create: create("ngoaingu"),
    updateById: updateById("ngoaingu", "MaNgoaiNgu"),
    remove: remove("ngoaingu", "MaNgoaiNgu"),
    removeAll: removeAll("ngoaingu"),
    getIdFromName: (name, callback) => {
        sql.query(
            `SELECT MaNgoaiNgu FROM ngoaingu WHERE TenNgoaiNgu = "${name}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(null, err);
                    return;
                }
                console.log("Id: ", res);
                callback(null, { data: res });
            })
    }
}

module.exports = FLanguage;