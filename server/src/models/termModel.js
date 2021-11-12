const { getAll, findById, create, updateById, removeAll, remove, zeroFill } = require('./utils');
const sql = require('../configs/db');

const Term = {
    getAll: (callback) => {
        sql.query(`SELECT * FROM nhiemky`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("All: ", res);
            callback(null, { data: res, columnName: ["Mã nhiệm kỳ", "Năm bắt đầu", "Năm kết thúc"] });
        })
    },
    findById: findById("nhiemky", "MaNhiemKy"),
    create: (newValue, callback) => {
        sql.query(`SELECT * FROM nhiemky WHERE NamBatDau = "${newValue.NamBatDau}" AND NamKetThuc = "${newValue.NamKetThuc}"`,
            (err, res) => {
                if (res.length > 0) {
                    console.log("Duplicated!");
                    callback({ message: "Duplicated" }, null);
                    return;
                }
                sql.query(`INSERT INTO nhiemky SET ?`, newValue, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    } else {
                        console.log("Created: ", { MaNhiemKy: zeroFill(res.insertId), ...newValue });
                        callback(null, { MaNhiemKy: zeroFill(res.insertId), ...newValue });
                    }
                })
            }
        )
    },
    updateById: updateById("nhiemky", "MaNhiemKy"),
    remove: remove("nhiemky", "MaNhiemKy"),
    removeAll: removeAll("nhiemky")
}

module.exports = Term;