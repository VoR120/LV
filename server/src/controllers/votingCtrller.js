const sql = require('../configs/db');
const moment = require('moment');
const nodemailer = require('nodemailer');
const { CronJob } = require('cron');

exports.createPoll = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const {
            TenBieuQuyet, SoPhieuToiDa, ThoiGianBatDau, LoaiBieuQuyet,
            ThoiGianKetThuc, UngCuVien, NguoiThamGia, PhamVi, ThoiGianNhacNho, MucDich
        } = req.body
        const data = {
            TenBieuQuyet,
            SoPhieuToiDa: LoaiBieuQuyet == "Biểu quyết có số dư" ? SoPhieuToiDa : "0",
            ThoiGianBatDau, ThoiGianKetThuc,
            PhamVi, ThoiGianNhacNho,
            MucDich, LoaiBieuQuyet
        }
        const [result, f] = await sqlPromise.query(`INSERT INTO bieuquyet SET ?`, data);
        if (result) {
            const MaBieuQuyet = result.insertId;

            await Promise.all(UngCuVien.map(async el => {
                await sqlPromise.execute(`INSERT INTO ungcuvien 
                SET MaUngCuVien = "${el}",
                MaBieuQuyet = ${MaBieuQuyet}`)
            }))
            await Promise.all(NguoiThamGia.map(async el => {
                await sqlPromise.query(`INSERT INTO nguoithamgia 
                SET MaNguoiThamGia = "${el}",
                MaBieuQuyet = ${MaBieuQuyet}`)
            }))

            const [mailList, fML] = await sqlPromise.query(`
                SELECT Email FROM nguoithamgia, dangvien 
                WHERE nguoithamgia.MaNguoiThamGia = dangvien.MaSoDangVien
                AND nguoithamgia.MaBieuQuyet = ${MaBieuQuyet}
            `)

            console.log('Before job instantiation');
            let date = new Date(ThoiGianKetThuc);
            date.setMinutes(date.getMinutes() - ThoiGianNhacNho);
            if (date < new Date()) {
                res.status(400).json({ msg: "Thời gian nhắc nhở không hợp lệ!" })
                return;
            }
            const job = new CronJob(date, function () {
                const mail = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'vob1706895@student.ctu.edu.vn',
                        pass: `${process.env.PASSWORD}`
                    }
                })

                const mailOptions = {
                    from: 'vob1706895@student.ctu.edu.vn',
                    to: mailList.map(el => el.Email),
                    subject: `Nhắc nhở: Bạn có một cuộc biểu quyết Đảng viên khoa CNTT&TT, Đại học Cần Thơ`,
                    html: `
                Thời gian còn lại: ${ThoiGianNhacNho} phút. <br />
                Thời gian: <b> ${new Date(ThoiGianBatDau).toLocaleString("vi-VN")} - ${new Date(ThoiGianKetThuc).toLocaleString("vi-VN")} </b>.<br/>
                Truy cập vào ${process.env.URL}voting để xem chi tiết.<br/>
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
            });
            console.log('After job instantiation');
            job.start();

            res.status(201).json({ id: MaBieuQuyet, ...data })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.updatePoll = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const {
            TenBieuQuyet, SoPhieuToiDa, ThoiGianBatDau, LoaiBieuQuyet,
            ThoiGianKetThuc, UngCuVien, NguoiThamGia, PhamVi, ThoiGianNhacNho, MucDich
        } = req.body
        const { id } = req.params;
        const data = {
            TenBieuQuyet,
            SoPhieuToiDa: LoaiBieuQuyet == "Biểu quyết có số dư" ? SoPhieuToiDa : "0",
            ThoiGianBatDau, ThoiGianKetThuc,
            PhamVi, ThoiGianNhacNho,
            MucDich, LoaiBieuQuyet
        }
        const [result, f] = await sqlPromise.query(`
        UPDATE bieuquyet SET ?
        WHERE MaBieuQuyet = ${id}
        `, data);
        await sqlPromise.query(`DELETE FROM ungcuvien WHERE MaBieuQuyet = ${id}`)
        await Promise.all(UngCuVien.map(async el => {
            await sqlPromise.query(`INSERT INTO ungcuvien 
                SET MaUngCuVien = "${el}",
                MaBieuQuyet = ${id}`)
        }))
        await sqlPromise.query(`DELETE FROM nguoithamgia WHERE MaBieuQuyet = ${id}`)
        await Promise.all(NguoiThamGia.map(async el => {
            await sqlPromise.query(`INSERT INTO nguoithamgia 
                SET MaNguoiThamGia = "${el}",
                MaBieuQuyet = ${id}`)
        }))

        console.log('Before job instantiation');
        let date = new Date(ThoiGianKetThuc);
        date.setMinutes(date.getMinutes() - ThoiGianNhacNho);
        if (date < new Date()) {
            res.status(400).json({ msg: "Thời gian nhắc nhở không hợp lệ!" })
            return;
        }
        const job = new CronJob(date, function () {
            const mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vob1706895@student.ctu.edu.vn',
                    pass: `${process.env.PASSWORD}`
                }
            })

            const mailOptions = {
                from: 'vob1706895@student.ctu.edu.vn',
                to: "vonguyen2.vn@gmail.com",
                subject: `Nhắc nhở: Bạn có một cuộc biểu quyết Đảng viên khoa CNTT&TT, Đại học Cần Thơ`,
                html: `
                Thời gian còn lại: ${ThoiGianNhacNho} phút. <br />
                Thời gian: <b> ${new Date(ThoiGianBatDau).toLocaleString("vi-VN")} - ${new Date(ThoiGianKetThuc).toLocaleString("vi-VN")} </b>.<br/>
                Truy cập vào ${process.env.URL}voting để xem chi tiết.<br/>
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
        });
        console.log('After job instantiation');
        job.start();

        res.status(200).json({ id: id, ...data })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.updateSaveResult = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const { id } = req.params;
        const [result, f] = await sqlPromise.query(`
        UPDATE bieuquyet SET LuuKetQua = 1
        WHERE MaBieuQuyet = ${id}
        `)
        if (result.affectedRows > 0) {
            res.status(200).json({ msg: "Đã cập nhật" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllPoll = async (req, res) => {
    try {
        const { MaSoDangVien } = req.query;
        let query = MaSoDangVien
            ? `SELECT bieuquyet.* 
                FROM bieuquyet, nguoithamgia 
                WHERE TrangThai = 1
                AND bieuquyet.MaBieuQuyet = nguoithamgia.MaBieuQuyet
                AND nguoithamgia.MaNguoiThamGia = "${MaSoDangVien}"
                ORDER BY MaBieuQuyet DESC`
            : `SELECT * FROM bieuquyet WHERE TrangThai = 1 ORDER BY MaBieuQuyet DESC`
        const sqlPromise = sql.promise();
        const [result, f] = await sqlPromise.query(query);
        console.log(result);
        if (result) {
            const newResult = [...result];
            await Promise.all(result.map(async (el, index) => {
                const [result1, f1] = await sqlPromise.query(
                    `SELECT ungcuvien.MaUngCuVien, dangvien.HoTen 
                    FROM ungcuvien, dangvien 
                    WHERE MaBieuQuyet = ${el.MaBieuQuyet}
                    AND ungcuvien.MaUngCuVien = dangvien.MaSoDangVien
                    `)
                newResult[index].UngCuVien = result1;
            }))
            await Promise.all(result.map(async (el, index) => {
                const [result2, f2] = await sqlPromise.query(
                    `SELECT nguoithamgia.MaNguoiThamGia, dangvien.HoTen
                    FROM nguoithamgia, dangvien
                    WHERE MaBieuQuyet = ${el.MaBieuQuyet}
                    AND nguoithamgia.MaNguoiThamGia = dangvien.MaSoDangVien
                    `)
                newResult[index].NguoiThamGia = result2;
            }))
            res.status(200).json(newResult);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getPoll = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const { id } = req.params
        const [result, f] = await sqlPromise.query(`SELECT * FROM bieuquyet WHERE TrangThai = 1 AND MaBieuQuyet = ${id}`);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.getPollByTime = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const { TuNgay, DenNgay } = req.body
        const [result, f] = await sqlPromise.query(`
        SELECT * FROM bieuquyet 
        WHERE TrangThai = 1 
        AND ThoiGianBatDau > "${TuNgay}"
        AND ThoiGianKetThuc < "${DenNgay}"
        `);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.createVoting = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const { MaBieuQuyet, MaNguoiThamGia, UngCuVien } = req.body
        let datetime = moment().format('YYYY-MM-DD,HH:mm:ss.000');

        const [resultAddVoting, fRAV] = await sqlPromise.query(`
            INSERT INTO phieu SET MaBieuQuyet = ${MaBieuQuyet},
            MaNguoiThamGia = "${MaNguoiThamGia}",
            ThoiGianBoPhieu = "${datetime}"            
            `)
        if (resultAddVoting) {
            const result = await Promise.all(Object.keys(UngCuVien).map(async (el, index) => {
                const [result1, f1] = await sqlPromise.query(`
                    INSERT INTO chitietphieu SET MaPhieu = ${resultAddVoting.insertId},
                    MaUngCuVien = "${el}",
                    DongY = ${UngCuVien[el]}
                `)
                return result1;
            }))
            if (result) {
                res.status(201).json({ msg: "Đã biểu quyết!" })
                return;
            }
        }
        if (result.length > 0) {
            res.status(201).json({ msg: "Đã biểu quyết!" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.checkIsVoted = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const { MaBieuQuyet, MaNguoiThamGia } = req.body
        console.log(req.params);
        const [result, f] = await sqlPromise.query(`
            SELECT * FROM phieu 
            WHERE MaBieuQuyet = ${MaBieuQuyet}
            AND MaNguoiThamGia = "${MaNguoiThamGia}" 
        `);
        if (result.length) {
            const [resultDetail, fRD] = await sqlPromise.query(`
                SELECT * FROM chitietphieu WHERE MaPhieu = ${result[0].MaPhieu}
            `)
            const resultObj = {};
            if (resultDetail.length) {
                resultDetail.map(el => {
                    resultObj[el.MaUngCuVien] = el.DongY
                })
            }
            res.status(200).json({ isVoted: true, MaBieuQuyet, MaNguoiThamGia, Phieu: resultObj });
            return;
        }
        res.status(200).json({ isVoted: false })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.getResult = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlPromise = sql.promise();
        const [statistic, f] = await sqlPromise.query(`
        SELECT DISTINCT MaSoDangVien, HoTen, ifnull(chitietphieu1.SoPhieu, 0) AS SoPhieu
        FROM chitietphieu
        INNER JOIN dangvien
        ON dangvien.MaSoDangVien = chitietphieu.MaUngCuVien
        INNER JOIN phieu
        ON phieu.MaBieuQuyet = ${id}
        AND phieu.MaPhieu = chitietphieu.MaPhieu
        LEFT JOIN
        (
        SELECT chitietphieu.*,  COUNT(*) AS SoPhieu 
        FROM chitietphieu, phieu
        WHERE DongY = 1
        AND phieu.MaPhieu = chitietphieu.MaPhieu
        AND phieu.MaBieuQuyet = ${id}
        GROUP BY MaUngCuVien
        ) AS chitietphieu1
        ON chitietphieu1.MaUngCuVien = chitietphieu.MaUngCuVien
        ORDER BY SoPhieu DESC
        `)
        const [quantity, f1] = await sqlPromise.query(`
            SELECT COUNT(MaNguoiThamGia) AS SoLuong FROM nguoithamgia WHERE MaBieuQuyet = ${id}
        `)
        const [quantityTPI, f2] = await sqlPromise.query(`
            SELECT COUNT(DISTINCT MaNguoiThamGia) AS SoLuongBieuQuyet 
            FROM phieu WHERE MaBieuQuyet = ${id}
        `)
        let result = await Promise.all([statistic, quantity, quantityTPI]);
        let newResult = {
            Data: result[0],
            SoLuong: result[1][0].SoLuong,
            SoLuongBieuQuyet: result[2][0].SoLuongBieuQuyet
        }
        res.status(200).json(newResult);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.removePoll = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlPromise = sql.promise();
        const [result, f] = await sqlPromise.query(`
            UPDATE bieuquyet SET TrangThai = 0 WHERE MaBieuQuyet = ${id}
        `)
        if (result) {
            res.status(200).json({ msg: "Đã xóa!" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.getVotes = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlPromise = sql.promise();
        const [voteList, fVL] = await sqlPromise.query(`
            SELECT MaPhieu FROM phieu WHERE MaBieuQuyet = ${id}
        `)
        console.log(voteList);
        let result = [];
        await Promise.all(voteList.map(async el => {
            const [voteItem, vI] = await sqlPromise.query(`
                SELECT * FROM chitietphieu WHERE MaPhieu = ${el.MaPhieu}
            `)
            let item = {}
            voteItem.map(el => {
                item[el.MaUngCuVien] = el.DongY
            })
            result.push(item)
        }))
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.getNoVoting = async (req, res) => {
    try {
        const { id } = req.params;
        const sqlPromise = sql.promise()
        const [listNoVoting, fLNV] = await sqlPromise.query(`
            SELECT MaNguoiThamGia, dangvien.HoTen, dangvien.Email, dangvien.SoDienThoai
            FROM nguoithamgia, dangvien
            WHERE MaBieuQuyet = ${id}
            AND MaNguoiThamGia = dangvien.MaSoDangVien
            AND MaNguoiThamGia NOT IN 
            (SELECT MaNguoiThamGia FROM phieu WHERE MaBieuQuyet = ${id})
        `)
        if (listNoVoting) {
            res.status(200).json(listNoVoting);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.mailing = async (req, res) => {
    try {
        const { MaBieuQuyet } = req.query;
        const sqlPromise = sql.promise();
        const [updateStatus, fUS] = await sqlPromise.query(`
            UPDATE bieuquyet SET KichHoat = 1 WHERE MaBieuQuyet = ${MaBieuQuyet}
        `)
        if (updateStatus.affectedRows > 0) {
            const [mailList, fML] = await sqlPromise.query(`
                SELECT Email FROM nguoithamgia, dangvien 
                WHERE nguoithamgia.MaNguoiThamGia = dangvien.MaSoDangVien
                AND nguoithamgia.MaBieuQuyet = ${MaBieuQuyet}
            `)

            const [poll, fP] = await sqlPromise.query(`
                SELECT * FROM bieuquyet WHERE MaBieuQuyet = ${MaBieuQuyet}
            `)

            const mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vob1706895@student.ctu.edu.vn',
                    pass: `${process.env.PASSWORD}`
                }
            })

            const mailOptions = {
                from: 'vob1706895@student.ctu.edu.vn',
                to: mailList.map(el => el.Email),
                subject: `Bạn có một cuộc biểu quyết Đảng viên khoa CNTT&TT, Đại học Cần Thơ`,
                html: `
                Thời gian: <b> ${(new Date(poll[0].ThoiGianBatDau)).toLocaleString()} - ${(new Date(poll[0].ThoiGianKetThuc)).toLocaleString()} </b>.<br/>
                Truy cập vào ${process.env.URL}voting để xem chi tiết.<br/>
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

            res.status(200).json({ msg: "Đã gửi!" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}