const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const FLanguage = {
    getAll: (callback) => {
        sql.query(`SELECT ngoaingu.MaNgoaiNgu, ngoaingu.TenNgoaiNgu, count(ngoaingudangvien.MaNgoaiNgu) AS SoDangVien 
        FROM ngoaingu 
        LEFT JOIN ngoaingudangvien 
        INNER JOIN dangvien
        ON dangvien.MaSoDangVien = ngoaingudangvien.MaSoDangVien
        ON ngoaingudangvien.MaNgoaiNgu=ngoaingu.MaNgoaiNgu
        AND dangvien.DaXoa = 0
        GROUP BY ngoaingu.MaNgoaiNgu`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("All: ", res);
                callback(null, { data: res, columnName: ["Mã Ngoại Ngữ", "Tên Ngoại Ngữ", "Số Đảng viên"] });
            })
    },
    findById: findById("ngoaingu", "MaNgoaiNgu"),
    create: create("ngoaingu", "MaNgoaiNgu"),
    updateById: (id, newValue, callback) => {
        sql.query(`UPDATE ngoaingu SET ? WHERE MaNgoaiNgu = ${id}`, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            sql.query(`SELECT ngoaingu.MaNgoaiNgu, ngoaingu.TenNgoaiNgu, count(ngoaingudangvien.MaNgoaiNgu) AS SoDangVien 
                FROM ngoaingu 
                LEFT JOIN ngoaingudangvien 
                INNER JOIN dangvien
                ON dangvien.MaSoDangVien = ngoaingudangvien.MaSoDangVien
                ON ngoaingudangvien.MaNgoaiNgu=ngoaingu.MaNgoaiNgu
                AND dangvien.DaXoa = 0
                AND ngoaingudangvien.MaNgoaiNgu = ${id}
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
        sql.query(`SELECT MaSoDangVien FROM ngoaingudangvien WHERE MaNgoaiNgu = ${id}`, (err, result) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (result.length > 0) {
                callback({ type: 'foreign', message: `Ngoại ngữ này đang được sử dụng, không thể xóa!` }, null)
                return
            }
            const sqlQuery = typeof (id) === "number" ?
                `DELETE FROM ngoaingu WHERE MaNgoaiNgu = ${id}` :
                `DELETE FROM ngoaingu WHERE MaNgoaiNgu = "${id}"`;
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
                callback(null, res);
            }))
        })
    },
    removeAll: removeAll("ngoaingu"),
    getIdFromName: (name, callback) => {
        sql.query(
            `SELECT MaNgoaiNgu FROM ngoaingu WHERE TenNgoaiNgu = "${name}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("Id: ", res);
                callback(null, { data: res });
            })
    },
    getNameFromId: (id, callback) => {
        sql.query(
            `SELECT TenNgoaiNgu FROM ngoaingu WHERE MaNgoaiNgu = "${id}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("Id: ", res);
                callback(null, { data: res });
            })
    }
}

module.exports = FLanguage;