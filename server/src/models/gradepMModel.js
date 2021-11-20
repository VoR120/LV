const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const gradepM = {
    getAll: (callback) => {
        sql.query(`SELECT loaidangvien.MaSoDangVien,dangvien.HoTen, chibo.TenChiBo , loai.TenLoai, loai.Nam  
        FROM loaidangvien, loai, dangvien, chibo 
        WHERE loaidangvien.MaLoai = loai.MaLoai
        AND dangvien.MaChiBo = chibo.MaChiBo
        AND dangvien.MaSoDangVien = loaidangvien.MaSoDangVien`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("All: ", res);
                callback(null, { data: res });
            })
    },
    findById: (id, callback) => {
        sql.query(`SELECT HoTen FROM dangvien WHERE MaSoDangVien = "${id}"`,
            (err, res) => {
                if (!res.length) {
                    console.log("Error: MaSoDangVien not found");
                    callback({ type: "not_found" }, null);
                    return;
                } else {
                    sql.query(
                        `SELECT loaidangvien.MaSoDangVien,dangvien.HoTen, chibo.TenChiBo , loai.TenLoai, loai.Nam  
                            FROM loaidangvien, loai, dangvien, chibo 
                            WHERE loaidangvien.MaLoai = loai.MaLoai 
                            AND dangvien.MaChiBo = chibo.MaChiBo
                            AND dangvien.MaSoDangVien = loaidangvien.MaSoDangVien
                            AND  loaidangvien.MaSoDangVien = "${id}" `,
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                callback(err, null);
                                return;
                            }
                            console.log("Found By Id: ", res);
                            callback(null, { data: res });
                        })
                }
            })
    },
    findByYear: (year, callback) => {
        sql.query(`SELECT loaidangvien.MaSoDangVien,dangvien.HoTen, chibo.TenChiBo , loai.TenLoai, loai.Nam  
            FROM loaidangvien, loai, dangvien, chibo 
            WHERE loaidangvien.MaLoai = loai.MaLoai 
            AND dangvien.MaChiBo = chibo.MaChiBo
            AND dangvien.MaSoDangVien = loaidangvien.MaSoDangVien
            AND  loai.Nam = "${year}" `,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("Found By Year: ", res);
                callback(null, { data: res });
            })
    },
    getYear: (callback) => {
        sql.query(`SELECT DISTINCT Nam FROM loai`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("Year: ", res);
            callback(null, { data: res });
        })
    },
    create: (newValue, callback) => {
        sql.query(`SELECT * 
            FROM loai, loaidangvien 
            WHERE MaSoDangVien = "${newValue.MaSoDangVien}"
            AND Nam = "${newValue.Nam}"
            AND loai.MaLoai = loaidangvien.MaLoai`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                if (res.length > 0) {
                    sql.query(`UPDATE loaidangvien 
                        SET MaLoai = "${newValue.MaLoai}" 
                        WHERE MaSoDangVien = "${newValue.MaSoDangVien}"`,
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                callback(err, null);
                                return;
                            }
                            console.log("Updated: ", newValue);
                            callback(null, { data: newValue });
                        }
                    )
                } else {
                    sql.query(`INSERT INTO loaidangvien 
                        SET MaSoDangVien = "${newValue.MaSoDangVien}",
                        MaLoai = "${newValue.MaLoai}"
                     `, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            callback(err, null);
                            return;
                        }
                        console.log("Created: ", newValue);
                        callback(null, { data: newValue });
                    })
                }
            })
    },
    updateById: updateById("ngoaingudangvien", "MaSoDangVien"),
    remove: remove("ngoaingudangvien", "MaSoDangVien"),
    removeAll: removeAll("ngoaingudangvien")
}

module.exports = gradepM;