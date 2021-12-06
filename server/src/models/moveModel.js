const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');
const e = require('express');

const Move = {
    getAll: (callback) => {
        const sqlPromise = sql.promise();
        const sqlQuery = `SELECT 
        csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, 
        csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
        ht.TenHinhThuc
        FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
        WHERE csh.MaHinhThuc = ht.MaHinhThuc
        AND csh.MaSoDangVien = dv.MaSoDangVien
        AND dv.DaXoa = 0
        `;
        sql.query(sqlQuery, async (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            const result = [...res];
            await Promise.all(res.map(async (el, index) => {
                if (el.MaHinhThuc == 1 || el.MaHinhThuc == 2) {
                    const [result1, f] = await sqlPromise.query(`
                    SELECT chibo.TenChiBo FROM chibo, chuyensinhhoat 
                    WHERE chibo.MaChiBo = ${el.ChuyenTuChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                                    `)
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    result[index].TenChiBoTu = result1[0].TenChiBo
                    result[index].TenChiBoDen = result[index].ChuyenDenChiBo

                }
                if (el.MaHinhThuc == 3 || el.MaHinhThuc == 4) {
                    const [result2, f] = await sqlPromise.query(`
                    SELECT chibo.TenChiBo FROM chibo, chuyensinhhoat 
                    WHERE chibo.MaChiBo = ${el.ChuyenDenChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                                    `)
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    result[index].TenChiBoDen = result2[0].TenChiBo
                    result[index].TenChiBoTu = result[index].ChuyenTuChiBo
                }
                if (el.MaHinhThuc == 13) {
                    const [result2, f] = await sqlPromise.query(`
                    SELECT chibo.TenChiBo as TenChiBoDen, chibotu.TenChiBoTu FROM chibo, chuyensinhhoat,
                    (SELECT chibo.TenChiBo as TenChiBoTu FROM chibo, chuyensinhhoat
                    WHERE chibo.MaChiBo = ${el.ChuyenTuChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                    ) as chibotu
                    WHERE MaChiBo = ${el.ChuyenDenChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                                    `)
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    result[index].TenChiBoDen = result2[0].TenChiBoDen
                    result[index].TenChiBoTu = result2[0].TenChiBoTu
                }
            }))
            console.log("Found: ", result);
            callback(null, result);
            return;
        })
    },
    findById: findById("chuyensinhhoat", "MaSoDangVien"),
    findByTypeId: (id, callback) => {
        const sqlPromise = sql.promise();
        const sqlQuery = `SELECT 
        csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, 
        csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
        ht.TenHinhThuc
        FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
        WHERE csh.MaHinhThuc = "${id}"
        AND csh.MaHinhThuc = ht.MaHinhThuc
        AND csh.MaSoDangVien = dv.MaSoDangVien
        AND dv.DaXoa = 0
        `;
        sql.query(sqlQuery, async (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            const result = [...res];
            await Promise.all(res.map(async (el, index) => {
                if (el.MaHinhThuc == 1 || el.MaHinhThuc == 2) {
                    const [result1, f] = await sqlPromise.query(`
                    SELECT chibo.TenChiBo FROM chibo, chuyensinhhoat 
                    WHERE chibo.MaChiBo = ${el.ChuyenTuChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                `)
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    result[index].TenChiBoTu = result1[0].TenChiBo
                    result[index].TenChiBoDen = result[index].ChuyenDenChiBo

                }
                if (el.MaHinhThuc == 3 || el.MaHinhThuc == 4) {
                    const [result2, f] = await sqlPromise.query(`
                    SELECT chibo.TenChiBo FROM chibo, chuyensinhhoat 
                    WHERE chibo.MaChiBo = ${el.ChuyenDenChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                `)
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    result[index].TenChiBoDen = result2[0].TenChiBo
                    result[index].TenChiBoTu = result[index].ChuyenTuChiBo
                }
                if (el.MaHinhThuc == 13) {
                    const [result2, f] = await sqlPromise.query(`
                    SELECT chibo.TenChiBo as TenChiBoDen, chibotu.TenChiBoTu FROM chibo, chuyensinhhoat,
                    (SELECT chibo.TenChiBo as TenChiBoTu FROM chibo, chuyensinhhoat
                    WHERE chibo.MaChiBo = ${el.ChuyenTuChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                    ) as chibotu
                    WHERE MaChiBo = ${el.ChuyenDenChiBo}
                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                    `)
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    result[index].TenChiBoDen = result2[0].TenChiBoDen
                    result[index].TenChiBoTu = result2[0].TenChiBoTu
                }
            }))
            console.log("Found: ", result);
            callback(null, result);
            return;
        })
    },
    findByPMId: (id, callback) => {
        const sqlPromise = sql.promise();
        sql.query(`SELECT HoTen FROM dangvien WHERE MaSoDangVien = "${id}" AND DaXoa = 0`,
            (err, res) => {
                if (!res.length) {
                    console.log("Error: MaSoDangVien not found");
                    callback({ type: "not_found" }, null);
                    return;
                } else {
                    sql.query(`SELECT 
                    csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo , 
                    csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
                    ht.TenHinhThuc
                    FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
                    WHERE csh.MaHinhThuc = ht.MaHinhThuc
                    AND csh.MaSoDangVien = dv.MaSoDangVien
                    AND csh.MaSoDangVien = "${id}"
                    AND dv.DaXoa = 0`,
                        async (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                callback(err, null);
                                return;
                            }
                            const result = [...res];
                            await Promise.all(res.map(async (el, index) => {
                                console.log(el);
                                if (el.MaHinhThuc == 1 || el.MaHinhThuc == 2) {
                                    const [result1, f] = await sqlPromise.query(`
                                        SELECT chibo.TenChiBo FROM chibo, chuyensinhhoat 
                                        WHERE chibo.MaChiBo = ${el.ChuyenTuChiBo}
                                        AND chibo.MaChiBo = chuyensinhhoat.ChuyenTuChiBo
                                        AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                                    `)
                                    if (err) {
                                        console.log("error: ", err);
                                        callback(err, null);
                                        return;
                                    }
                                    result[index].TenChiBoTu = result1[0].TenChiBo
                                    result[index].TenChiBoDen = result[index].ChuyenDenChiBo
                                }
                                if (el.MaHinhThuc == 3 || el.MaHinhThuc == 4) {
                                    const [result2, f] = await sqlPromise.query(`
                                    SELECT chibo.TenChiBo FROM chibo, chuyensinhhoat
                                    WHERE chibo.MaChiBo = ${el.ChuyenDenChiBo}
                                    AND chibo.MaChiBo = chuyensinhhoat.ChuyenDenChiBo
                                    AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                                    `)
                                    if (err) {
                                        console.log("error: ", err);
                                        callback(err, null);
                                        return;
                                    }
                                    result[index].TenChiBoDen = result2[0].TenChiBo
                                    result[index].TenChiBoTu = result[index].ChuyenTuChiBo
                                }
                                if (el.MaHinhThuc == 13) {
                                    const [result2, f] = await sqlPromise.query(`
                                        SELECT chibo.TenChiBo as TenChiBoDen, chibotu.TenChiBoTu FROM chibo, chuyensinhhoat,
                                        (SELECT chibo.TenChiBo as TenChiBoTu FROM chibo, chuyensinhhoat
                                        WHERE chibo.MaChiBo = ${el.ChuyenTuChiBo}
                                        AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                                        ) as chibotu
                                        WHERE MaChiBo = ${el.ChuyenDenChiBo}
                                        AND chuyensinhhoat.MaChuyenSinhHoat = ${el.MaChuyenSinhHoat}
                                    `)
                                    console.log(result2)
                                    if (err) {
                                        console.log("error: ", err);
                                        callback(err, null);
                                        return;
                                    }
                                    result[index].TenChiBoDen = result2[0].TenChiBoDen
                                    result[index].TenChiBoTu = result2[0].TenChiBoTu
                                }
                            }))

                            console.log("Found By Id: ", result);
                            callback(null, result);
                        }
                    )
                }
            }
        )
    },
    findByType: (type, callback) => {
        let sqlQuery = `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo AS TenChiBoTu,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo AS TenChiBoDen, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
            ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${type}"
            )
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`;
        if (type == "Chuyển sinh hoạt đi") {
            sqlQuery = `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, cb.TenChiBo AS TenChiBoTu,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo AS TenChiBoDen, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
            ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${type}"
            )
            AND csh.ChuyenTuChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`;
        }
        if (type == "Chuyển sinh hoạt đến") {
            sqlQuery = `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo AS TenChiBoTu, cb.TenChiBo AS TenChiBoDen,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
            ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${type}"
            )
            AND csh.ChuyenDenChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`;
        }
        if (type == "Chuyển sinh hoạt nội bộ") {
            sqlQuery = `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, cb.TenChiBo AS TenChiBoTu, chiboden.TenChiBoDen,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
            ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb,
            (SELECT 
                cb.TenChiBo AS TenChiBoDen
                FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb
                WHERE csh.MaHinhThuc IN (
                SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "Chuyển sinh hoạt nội bộ"
                )
                AND csh.ChuyenDenChiBo = cb.MaChiBo
                AND csh.MaHinhThuc = ht.MaHinhThuc
                AND csh.MaSoDangVien = dv.MaSoDangVien
                AND dv.DaXoa = 0
			) AS chiboden
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "Chuyển sinh hoạt nội bộ"
            )
            AND csh.ChuyenTuChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`
        }
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("Found: ", res);
            callback(null, res);
            return;
        })
    },
    create: (newValue, callback) => {
        sql.query(`INSERT INTO chuyensinhhoat SET ?`, newValue, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("Created: ", { MaChuyenSinhHoat: res.insertId, ...newValue });
            callback(null, { MaChuyenSinhHoat: res.insertId, ...newValue });
        })
    },
    updateById: updateById("chuyensinhhoat", "MaChuyenSinhHoat"),
    remove: remove("chuyensinhhoat", "MaSoDangVien"),
    removeAll: removeAll("chuyensinhhoat")
}

module.exports = Move;