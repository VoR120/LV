const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');
const e = require('express');

const Move = {
    getAll: (data, callback) => {
        const { MaChiBo } = data;
        const sqlPromise = sql.promise();
        const sqlQuery = MaChiBo
            ? `SELECT 
        csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, ht.LoaiHinhThuc,
        ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, 
        csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
        FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
        WHERE csh.MaHinhThuc = ht.MaHinhThuc
        AND csh.MaSoDangVien = dv.MaSoDangVien
        AND dv.MaChiBo = ${MaChiBo}
        AND dv.DaXoa = 0
        `
            :
            `SELECT 
        csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, ht.LoaiHinhThuc,
        ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, 
        csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
        FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
        WHERE csh.MaHinhThuc = ht.MaHinhThuc
        AND csh.MaSoDangVien = dv.MaSoDangVien
        AND dv.DaXoa = 0
        `
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
            // console.log("Found: ", result);
            callback(null, result);
            return;
        })
    },
    findById: findById("chuyensinhhoat", "MaSoDangVien"),
    findByTypeId: (data, callback) => {
        const { MaChiBo, MaHinhThuc } = data
        const sqlPromise = sql.promise();
        const sqlQuery = MaChiBo ?
            `SELECT 
        csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, ht.LoaiHinhThuc,
        ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, 
        csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
        FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
        WHERE csh.MaHinhThuc = "${MaHinhThuc}"
        AND csh.MaHinhThuc = ht.MaHinhThuc
        AND csh.MaSoDangVien = dv.MaSoDangVien
        AND dv.MaChiBo = ${MaChiBo}
        AND dv.DaXoa = 0
        `
            :
            `SELECT 
        csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat, ht.LoaiHinhThuc,
        ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, 
        csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
        FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
        WHERE csh.MaHinhThuc = "${MaHinhThuc}"
        AND csh.MaHinhThuc = ht.MaHinhThuc
        AND csh.MaSoDangVien = dv.MaSoDangVien
        AND dv.DaXoa = 0
        `
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
            // console.log("Found: ", result);
            callback(null, result);
            return;
        })
    },
    findByPMId: (data, callback) => {
        const { MaSoDangVien, MaChiBo } = data;
        const sqlPromise = sql.promise();
        let sqlQuery = MaChiBo ?
            `SELECT HoTen FROM dangvien WHERE MaSoDangVien = "${MaSoDangVien}" AND DaXoa = 0 AND MaChiBo = ${MaChiBo}`
            :
            `SELECT HoTen FROM dangvien WHERE MaSoDangVien = "${MaSoDangVien}" AND DaXoa = 0`
        sql.query(sqlQuery,
            (err, res) => {
                if (!res.length) {
                    console.log("Error: MaSoDangVien not found");
                    callback({ type: "not_found" }, null);
                    return;
                } else {
                    sql.query(`SELECT 
                    csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
                    ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo , 
                    csh.ChuyenDenDangBo, csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
                    FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
                    WHERE csh.MaHinhThuc = ht.MaHinhThuc
                    AND csh.MaSoDangVien = dv.MaSoDangVien
                    AND csh.MaSoDangVien = "${MaSoDangVien}"
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

                            // console.log("Found By Id: ", result);
                            callback(null, result);
                        }
                    )
                }
            }
        )
    },
    findByType: (data, callback) => {
        console.log(data);
        let { LoaiHinhThuc, MaChiBo } = data
        if (LoaiHinhThuc == "Di") LoaiHinhThuc = "Chuyển sinh hoạt đi"
        if (LoaiHinhThuc == "Den") LoaiHinhThuc = "Chuyển sinh hoạt đến"
        if (LoaiHinhThuc == "NoiBo") LoaiHinhThuc = "Chuyển sinh hoạt nội bộ"
        let sqlQuery = `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
            ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo AS TenChiBoTu,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo AS TenChiBoDen, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${LoaiHinhThuc}"
            )
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`;
        if (LoaiHinhThuc == "Chuyển sinh hoạt đi") {
            sqlQuery = MaChiBo
                ?
                `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
            ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, cb.TenChiBo AS TenChiBoTu,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo AS TenChiBoDen, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
            ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${LoaiHinhThuc}"
            )
            AND csh.ChuyenTuChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.MaChiBo = ${MaChiBo}
            AND dv.DaXoa = 0`
                :
                `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
            ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, cb.TenChiBo AS TenChiBoTu,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo AS TenChiBoDen, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu,
            ht.TenHinhThuc
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${LoaiHinhThuc}"
            )
            AND csh.ChuyenTuChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`
        }
        if (LoaiHinhThuc == "Chuyển sinh hoạt đến") {
            sqlQuery = MaChiBo
                ? `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
            ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo AS TenChiBoTu, cb.TenChiBo AS TenChiBoDen,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${LoaiHinhThuc}"
            )
            AND csh.ChuyenDenChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.MaChiBo = ${MaChiBo}
            AND dv.DaXoa = 0`
                :
                `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
            ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo AS TenChiBoTu, cb.TenChiBo AS TenChiBoDen,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
            FROM chuyensinhhoat csh, dangvien dv, hinhthuc ht, chibo cb
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "${LoaiHinhThuc}"
            )
            AND csh.ChuyenDenChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.DaXoa = 0`
        }
        if (LoaiHinhThuc == "Chuyển sinh hoạt nội bộ") {
            sqlQuery = MaChiBo
                ? `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
            ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, cb.TenChiBo AS TenChiBoTu, chiboden.TenChiBoDen,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
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
                AND dv.MaChiBo = ${MaChiBo}
                AND dv.DaXoa = 0
			) AS chiboden
            WHERE csh.MaHinhThuc IN (
            SELECT MaHinhThuc FROM hinhthuc WHERE LoaiHinhThuc = "Chuyển sinh hoạt nội bộ"
            )
            AND csh.ChuyenTuChiBo = cb.MaChiBo
            AND csh.MaHinhThuc = ht.MaHinhThuc
            AND csh.MaSoDangVien = dv.MaSoDangVien
            AND dv.MaChiBo = ${MaChiBo}
            AND dv.DaXoa = 0`
                :
                `SELECT 
            csh.MaSoDangVien, dv.HoTen,  csh.MaChuyenSinhHoat,ht.LoaiHinhThuc,
            ht.TenHinhThuc, csh.ChuyenTuDangBo, csh.ChuyenTuChiBo, cb.TenChiBo AS TenChiBoTu, chiboden.TenChiBoDen,
            csh.ChuyenDenDangBo,csh.ChuyenDenChiBo, csh.NgayChuyenDi, csh.NgayChuyenDen, csh.MaHinhThuc, csh.GhiChu
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
            // console.log("Found: ", res);
            callback(null, res);
            return;
        })
    },
    create: async (newValue, callback) => {
        try {
            const { MaSoDangVienArr, MaHinhThuc, NgayChuyenDi, NgayChuyenDen, ChuyenTuChiBo,
                ChuyenTuDangBo, ChuyenDenDangBo, ChuyenDenChiBo, GhiChu,
            } = newValue
            const sqlPromise = sql.promise();
            if (MaHinhThuc == "3" || MaHinhThuc == "4") {
                await Promise.all(MaSoDangVienArr.map(async (el, index) => {
                    const value = {
                        MaSoDangVien: el.MaSoDangVien, MaHinhThuc, NgayChuyenDen,
                        ChuyenTuDangBo, ChuyenTuChiBo, ChuyenDenDangBo, ChuyenDenChiBo, GhiChu,
                    }
                    await sqlPromise.query(`INSERT INTO chuyensinhhoat SET ?`, value)
                }))
            } else
                await Promise.all(MaSoDangVienArr.map(async (el, index) => {
                    const value = {
                        MaSoDangVien: el.MaSoDangVien, MaHinhThuc, NgayChuyenDi,
                        ChuyenTuDangBo, ChuyenTuChiBo: el.MaChiBo, ChuyenDenDangBo, ChuyenDenChiBo, GhiChu,
                    }
                    await sqlPromise.query(`INSERT INTO chuyensinhhoat SET ?`, value)
                }))
            console.log("Created: ", newValue);
            callback(null, { msg: "Đã cập nhật!" });
        } catch (error) {
            callback(error, null);
        }
    },
    updateById: (id, newValue, callback) => {
        const sqlQuery = `UPDATE chuyensinhhoat SET ? WHERE MaChuyenSinhHoat = ${id}`
        sql.query(sqlQuery, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            console.log("Updated: ", id);
            callback(null, newValue);
        }))
    },
    remove: (id, callback) => {
        const sqlQuery = `DELETE FROM chuyensinhhoat WHERE MaChuyenSinhHoat = ${id}`
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
            callback(null, { msg: "Đã xóa!" });
        }))
    },
    removeAll: removeAll("chuyensinhhoat")
}

module.exports = Move;