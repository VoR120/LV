const e = require('express');
const sql = require('../configs/db');

exports.getByPartyMember = (req, res) => {
    try {
        const { Nam, MaSoDangVien } = req.query;
        sql.query(`SELECT *
            FROM danhgiadangvien
            WHERE MaSoDangVien = "${MaSoDangVien}"
            AND Nam = ${Nam}
        `,
            (err, result) => {
                if (err) {
                    res.status(500).json({ msg: err.message })
                    return;
                }
                res.status(200).json(result)
            }
        )
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getBySubject = (req, res) => {
    try {
        const { Nam, MaChiBo } = req.query;
        const sqlQuery = MaChiBo
            ?
            `SELECT dangvien.MaSoDangVien, dangvien.HoTen
            FROM dangvien, chibo 
            WHERE dangvien.MaChiBo = chibo.MaChiBo AND chibo.MaChiBo = "${MaChiBo}"    `
            : `SELECT dangvien.MaSoDangVien, dangvien.HoTen
            FROM dangvien, chibo 
            WHERE dangvien.MaChiBo = chibo.MaChiBo`
        sql.query(sqlQuery
            , (err, result) => {
                if (err) {
                    res.status(500).json({ msg: err.message })
                    return;
                }
                const sqlQuery2 = MaChiBo
                    ? `SELECT dg.MaSoDangVien, dv.HoTen, dg.MaLoai, loai.TenLoai, dg.MaDVDG
                FROM danhgiadangvien dg, dangvien dv, loai
                WHERE dg.MaSoDangVien IN (
                SELECT dangvien.MaSoDangVien FROM dangvien, chibo WHERE dangvien.MaChiBo = chibo.MaChiBo
                AND chibo.MaChiBo = ${MaChiBo}
                ) AND dg.Nam = ${Nam}
                AND loai.MaLoai = dg.MaLoai
                AND dv.MaSoDangVien = dg.MaSoDangVien`
                    : `SELECT dg.MaSoDangVien, dv.HoTen, dg.MaLoai, loai.TenLoai, dg.MaDVDG
                FROM danhgiadangvien dg, dangvien dv, loai
                WHERE dg.MaSoDangVien IN (
                SELECT dangvien.MaSoDangVien FROM dangvien, chibo WHERE dangvien.MaChiBo = chibo.MaChiBo
                ) AND dg.Nam = ${Nam}
                AND loai.MaLoai = dg.MaLoai
                AND dv.MaSoDangVien = dg.MaSoDangVien`
                sql.query(sqlQuery2,
                    (err, result1) => {
                        if (err) {
                            res.status(500).json({ msg: err.message })
                            return;
                        }
                        const list = result.map(el => {
                            let newEl = { ...el }
                            newEl.DanhGiaCaNhan = "";
                            newEl.DanhGiaBoMon = "";
                            newEl.DanhGiaKhoa = "";
                            newEl.TenDanhGiaCaNhan = "";
                            newEl.TenDanhGiaBoMon = "";
                            newEl.TenDanhGiaKhoa = "";
                            newEl.HoTen = el.HoTen;
                            result1.map(r => {
                                if (r.MaSoDangVien == el.MaSoDangVien) {
                                    if (r.MaDVDG == 1 && r.MaLoai) {
                                        newEl.DanhGiaCaNhan = r.MaLoai
                                        newEl.TenDanhGiaCaNhan = r.TenLoai
                                    }
                                    if (r.MaDVDG == 2 && r.MaLoai) {
                                        newEl.DanhGiaBoMon = r.MaLoai
                                        newEl.TenDanhGiaBoMon = r.TenLoai
                                    }
                                    if (r.MaDVDG == 3 && r.MaLoai) {
                                        newEl.DanhGiaKhoa = r.MaLoai
                                        newEl.TenDanhGiaKhoa = r.TenLoai
                                    }
                                }
                            })
                            console.log(newEl);
                            return newEl;
                        })
                        res.status(200).json(list);
                    }
                )
            })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getEvaluated = (req, res) => {
    try {
        const { MaChiBo, Nam, MaSoDangVien } = req.query;
        console.log(MaChiBo, Nam)
        let sqlQuery = MaChiBo
            ? `SELECT dg.MaSoDangVien, dv.HoTen, dg.MaLoai, loai.TenLoai, dg.MaDVDG, cb.TenChiBo, dg.Nam
                FROM danhgiadangvien dg, dangvien dv, loai, chibo cb
                WHERE dg.MaSoDangVien IN (
                SELECT dangvien.MaSoDangVien FROM dangvien, chibo WHERE dangvien.MaChiBo = chibo.MaChiBo
                AND chibo.MaChiBo = ${MaChiBo}
                )
                AND cb.MaChiBo = dv.MaChiBo
                AND loai.MaLoai = dg.MaLoai
                AND dg.MaDVDG = 3
                AND dv.MaSoDangVien = dg.MaSoDangVien`
            : `SELECT dg.MaSoDangVien, dv.HoTen, dg.MaLoai, loai.TenLoai, dg.MaDVDG, cb.TenChiBo, dg.Nam
                FROM danhgiadangvien dg, dangvien dv, loai, chibo cb
                WHERE dg.MaSoDangVien IN (
                SELECT dangvien.MaSoDangVien FROM dangvien, chibo WHERE dangvien.MaChiBo = chibo.MaChiBo
                )
                AND cb.MaChiBo = dv.MaChiBo
                AND loai.MaLoai = dg.MaLoai
                AND dv.MaSoDangVien = dg.MaSoDangVien
                AND dg.MaDVDG = 3`
        sqlQuery = Nam ? sqlQuery + ` AND dg.Nam = ${Nam}` : sqlQuery
        sqlQuery = MaSoDangVien ? sqlQuery + ` AND dg.MaSoDangVien = "${MaSoDangVien}"` : sqlQuery
        if (MaSoDangVien) {
            sql.query(`SELECT MaSoDangVien FROM dangvien WHERE MaSoDangVien = "${MaSoDangVien}"`,
                (err, result) => {
                    if (err) {
                        res.status(500).json({ msg: err.message })
                        return;
                    }
                    if (result.length == 0) {
                        res.status(400).json({ msg: "Không tìm thấy Đảng viên!" })
                        return;
                    }
                    sql.query(sqlQuery,
                        (err, result) => {
                            if (err) {
                                res.status(500).json({ msg: err.message })
                                return;
                            } else
                                res.status(200).json(result);
                        })
                })
        } else {
            sql.query(sqlQuery,
                (err, result) => {
                    if (err) {
                        res.status(500).json({ msg: err.message })
                        return;
                    }
                    res.status(200).json(result);
                })
        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.createEvaluate = (req, res) => {
    try {
        const { Nam, MaSoDangVien, MaDVDG, MaLoai } = req.body
        sql.query(`SELECT *
        FROM danhgiadangvien
        WHERE MaSoDangVien = "${MaSoDangVien}"
        AND Nam = ${Nam}
        AND MaDVDG = ${MaDVDG}`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ msg: err.message })
                    return;
                }
                if (result.length) {
                    sql.query(`UPDATE danhgiadangvien SET MaLoai = ${MaLoai}
                    WHERE MaSoDangVien = "${MaSoDangVien}"
                    AND Nam = ${Nam}
                    AND MaDVDG = ${MaDVDG}
                    `,
                        (err, result1) => {
                            if (err) {
                                res.status(500).json({ msg: err.message })
                                return;
                            }
                            console.log("Updated!")
                            res.status(201).json(req.body)
                            return;
                        })
                } else {
                    console.log(req.body);
                    sql.query(`INSERT INTO danhgiadangvien SET ?`, req.body,
                        (err, result2) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ msg: err.message })
                                return;
                            }
                            console.log("Created!")
                            res.status(201).json(req.body)
                            return;
                        }
                    )
                }
            })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getTimeEvaluate = (req, res) => {
    try {
        const { Nam } = req.query;
        sql.query(`SELECT * FROM thoigiandanhgia WHERE Nam = ${Nam}`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ msg: err.message })
                    return;
                }
                const result1 = [...result];
                res.status(200).json(result1);
                return;
            }
        )
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.setTimeEvaluate = (req, res) => {
    try {
        const { Nam, MaDVDG, ThoiGianBatDau, ThoiGianKetThuc } = req.body
        sql.query(`SELECT *
        FROM thoigiandanhgia
        WHERE Nam = ${Nam}
        AND MaDVDG = ${MaDVDG}`,
            (err, result) => {
                if (err) {
                    res.status(500).json({ msg: err.message })
                    return;
                }
                if (result.length) {
                    sql.query(`UPDATE thoigiandanhgia SET ThoiGianBatDau = "${ThoiGianBatDau}",
                    ThoiGianKetThuc = "${ThoiGianKetThuc}"
                    WHERE Nam = ${Nam}
                    AND MaDVDG = ${MaDVDG}
                    `,
                        (err, result1) => {
                            if (err) {
                                res.status(500).json({ msg: err.message })
                                return;
                            }
                            console.log("Updated!")
                            res.status(201).json(req.body)
                            return;
                        })
                } else {
                    console.log(req.body);
                    sql.query(`INSERT INTO thoigiandanhgia SET ?`, req.body,
                        (err, result2) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ msg: err.message })
                                return;
                            }
                            console.log("Created!")
                            res.status(201).json(req.body)
                            return;
                        }
                    )
                }
            })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}