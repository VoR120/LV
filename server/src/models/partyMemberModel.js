const sql = require('../configs/db');
const { findById, create, updateById, removeAll, remove } = require('./utils');

const PartyMember = {
    getAll: (callback) => {
        sql.query(`SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri
        FROM dangvien
        INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
        INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
        INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
        INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
        INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }
            console.log("All: ", res);
            callback(null, { data: res });
        })
    },
    findById: (id, callback) => {
        sql.query(`SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri
        FROM dangvien
        INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
        INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
        INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
        INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
        INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri WHERE MaDangVien = ${id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(null, err);
                    return;
                }
                if (res.length) {
                    let result = [...res];
                    sql.query(`SELECT * FROM ngoaingudangvien WHERE MaDangVien = ${id}`,
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                callback(null, err);
                                return;
                            }
                            if (res.length) {
                                result[0].NgoaiNgu = res
                                console.log("Found: ", result);
                                callback(null, result);
                                return;
                            }
                            callback({ type: "not_found" }, null)
                        })
                    return;
                }
                callback({ type: "not_found" }, null)
            })
    },
    create: create("dangvien", "MaDangVien"),
    updateById: (id, newValue, callback) => {
        sql.query(`UPDATE dangvien SET ? WHERE MaDangVien = ${id}`, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            sql.query(`SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri
            FROM dangvien
            INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
            INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
            INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
            INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
            INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri WHERE MaDangVien = ${id}`,
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(null, err);
                        return;
                    }
                    if (res.length) {
                        console.log("Updated: ", res);
                        callback(null, res);
                        return;
                    }
                    callback({ type: "not_found" }, null)
                }
            )
        }))
    },
    remove: remove("dangvien", "MaDangVien"),
    removeAll: removeAll("dangvien")
}

module.exports = PartyMember;


