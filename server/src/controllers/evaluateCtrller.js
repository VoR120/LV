const e = require('express');
const sql = require('../configs/db');
const nodemailer = require('nodemailer');

exports.getByPartyMember = (req, res) => {
    try {
        const { Nam, MaSoDangVien, MaDVDG } = req.query;
        sql.query(`SELECT *
            FROM danhgiadangvien
            WHERE MaSoDangVien = "${MaSoDangVien}"
            AND Nam = ${Nam}
            AND MaDVDG = ${MaDVDG}
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
            WHERE dangvien.MaChiBo = chibo.MaChiBo AND chibo.MaChiBo = "${MaChiBo}"    
            AND dangvien.DaXoa = 0`
            : `SELECT dangvien.MaSoDangVien, dangvien.HoTen
            FROM dangvien, chibo 
            WHERE dangvien.MaChiBo = chibo.MaChiBo
            AND dangvien.DaXoa = 0`
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
                AND dangvien.DaXoa = 0
                ) AND dg.Nam = ${Nam}
                AND loai.MaLoai = dg.MaLoai
                AND dv.MaSoDangVien = dg.MaSoDangVien`
                    : `SELECT dg.MaSoDangVien, dv.HoTen, dg.MaLoai, loai.TenLoai, dg.MaDVDG
                FROM danhgiadangvien dg, dangvien dv, loai
                WHERE dg.MaSoDangVien IN (
                SELECT dangvien.MaSoDangVien FROM dangvien, chibo WHERE dangvien.MaChiBo = chibo.MaChiBo
                AND dangvien.DaXoa = 0
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
                AND dangvien.DaXoa = 0
                )
                AND cb.MaChiBo = dv.MaChiBo
                AND loai.MaLoai = dg.MaLoai
                AND dg.MaDVDG = 3
                AND dv.MaSoDangVien = dg.MaSoDangVien`
            : `SELECT dg.MaSoDangVien, dv.HoTen, dg.MaLoai, loai.TenLoai, dg.MaDVDG, cb.TenChiBo, dg.Nam
                FROM danhgiadangvien dg, dangvien dv, loai, chibo cb
                WHERE dg.MaSoDangVien IN (
                SELECT dangvien.MaSoDangVien FROM dangvien, chibo WHERE dangvien.MaChiBo = chibo.MaChiBo
                AND dangvien.DaXoa = 0
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
                res.status(200).json(result);
                return;
            }
        )
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.checkOpen = (req, res) => {
    try {
        const { MaDVDG } = req.query
        let query = MaDVDG
            ? `SELECT * FROM thoigiandanhgia WHERE TrangThai = 1 AND MaDVDG = ${MaDVDG}`
            : `SELECT * FROM thoigiandanhgia WHERE TrangThai = 1`
        sql.query(query,
            (err, result) => {
                if (err) {
                    res.status(500).json({ msg: err.message })
                    return;
                }
                res.status(200).json(result);
                return;
            }
        )
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.setTimeEvaluate = async (req, res) => {
    try {
        const { Nam, MaDVDG, ThoiGianBatDau, ThoiGianKetThuc, TrangThai } = req.body
        sql.query(`SELECT *
        FROM thoigiandanhgia
        WHERE Nam = ${Nam}
        AND MaDVDG = ${MaDVDG}`,
            async (err, result) => {
                if (err) {
                    res.status(500).json({ msg: err.message })
                    return;
                }

                let sqlPromise = sql.promise();
                const mail = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'vob1706895@student.ctu.edu.vn',
                        pass: `${process.env.PASSWORD}`
                    }
                })

                let mailOptions;

                // DVDG: 1 -> Quyen: 13 
                // DVDG: 2 -> Quyen: 14 
                // DVDG: 3 -> Quyen: 15 

                const [mailList, fML] = await sqlPromise.query(`
                SELECT DISTINCT (dangvien.HoTen), dangvien.MaSoDangVien
                    FROM quyenchucvu, quyendangvien, dangvien 
                    WHERE (quyenchucvu.MaQuyen = ${MaDVDG}
                    AND quyenchucvu.CoQuyen = 1
                    AND dangvien.MaChucVu = quyenchucvu.MaChucVu)
                    OR (quyendangvien.MaQuyen = ${MaDVDG}
                    AND quyendangvien.CoQuyen = 1
                    AND dangvien.MaSoDangVien = quyendangvien.MaSoDangVien)
            `)
                let subject;
                if (result.length) {

                    sql.query(`UPDATE thoigiandanhgia SET ThoiGianBatDau = "${ThoiGianBatDau}",
                    ThoiGianKetThuc = "${ThoiGianKetThuc}",
                    TrangThai = 1
                    WHERE Nam = ${Nam}
                    AND MaDVDG = ${MaDVDG}
                    `,
                        (err, result1) => {

                            if (MaDVDG == 13) {
                                subject = `Cập nhật thời gian đánh giá Đảng viên khoa CNTT&TT, Đại học Cần Thơ`
                            }
                            if (MaDVDG == 14) {
                                subject = `Cập nhật thời gian bộ môn đánh giá Đảng viên khoa CNTT&TT, Đại học Cần Thơ`
                            }
                            if (MaDVDG == 15) {
                                subject = `Cập nhật thời gian khoa đánh giá Đảng viên khoa CNTT&TT, Đại học Cần Thơ`
                            }

                            if (err) {
                                res.status(500).json({ msg: err.message })
                                return;
                            }
                            console.log("Updated!")

                            mailOptions = {
                                from: 'vob1706895@student.ctu.edu.vn',
                                to: mailList.map(el => el.Email),
                                subject: subject,
                                html: `
                                Thời gian mới: <b> ${(new Date(ThoiGianBatDau)).toLocaleDateString()} - ${(new Date(ThoiGianKetThuc)).toLocaleDateString()} </b>.<br/>
                                Truy cập vào ${process.env.URL}evaluate để xem chi tiết.<br/>
                                ...<br/>
                                Thân,<br/>
                                Nguyễn Văn Vỏ - B1706895
                                `,
                            }

                            mail.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                            res.status(201).json(req.body)
                            return;
                        })
                } else {
                    sql.query(`INSERT INTO thoigiandanhgia SET ?`, req.body,
                        (err, result2) => {

                            if (MaDVDG == 13) {
                                subject = `Mở thời gian đánh giá Đảng viên khoa CNTT&TT, Đại học Cần Thơ`
                            }
                            if (MaDVDG == 14) {
                                subject = `Mở thời gian bộ môn đánh giá Đảng viên khoa CNTT&TT, Đại học Cần Thơ`
                            }
                            if (MaDVDG == 15) {
                                subject = `Mở thời gian khoa đánh giá Đảng viên khoa CNTT&TT, Đại học Cần Thơ`
                            }

                            if (err) {
                                console.log(err);
                                res.status(500).json({ msg: err.message })
                                return;
                            }
                            console.log("Created!")
                            mailOptions = {
                                from: 'vob1706895@student.ctu.edu.vn',
                                to: mailList.map(el => el.Email),
                                subject: subject,
                                html: `
                                Thời gian: <b> ${(new Date(ThoiGianBatDau)).toLocaleDateString()} - ${(new Date(ThoiGianKetThuc)).toLocaleDateString()} </b>.<br/>
                                Truy cập vào ${process.env.URL}evaluate để để xem chi tiết.<br/>
                                ...<br/>
                                Thân,<br/>
                                Nguyễn Văn Vỏ - B1706895
                                `,
                            }

                            mail.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
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

exports.resetStatus = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const [all, fAll] = await sqlPromise.query(`SELECT MaDVDG, Nam FROM thoigiandanhgia`);
        if (all.length) {
            await Promise.all(all.map(async el => {
                await sqlPromise.query(`
                    UPDATE thoigiandanhgia SET TrangThai = 0 
                    WHERE MaDVDG = ${el.MaDVDG}
                    AND Nam = ${el.Nam}
                `)
            }))
            res.status(200).json({ msg: "Reset status success!" })
            return;
        }
        res.status(200).json({ msg: "Reset status successfully!" })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}