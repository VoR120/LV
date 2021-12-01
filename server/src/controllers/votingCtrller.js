const sql = require('../configs/db');
const moment = require('moment');

exports.createPoll = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const {
            TenBieuQuyet, NoiDung, SoPhieuToiDa, ThoiGianBatDau,
            ThoiGianKetThuc, UngCuVien, NguoiThamGia
        } = req.body
        const data = { TenBieuQuyet, NoiDung, SoPhieuToiDa, ThoiGianBatDau, ThoiGianKetThuc }
        console.log(data);
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
            TenBieuQuyet, NoiDung, SoPhieuToiDa, ThoiGianBatDau,
            ThoiGianKetThuc, UngCuVien, NguoiThamGia
        } = req.body
        const { id } = req.params;
        const data = { TenBieuQuyet, NoiDung, SoPhieuToiDa, ThoiGianBatDau, ThoiGianKetThuc }
        console.log(data);
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
        res.status(200).json({ id: id, ...data })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.getAllVoting = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const [result, f] = await sqlPromise.query(`SELECT * FROM bieuquyet WHERE TrangThai = 1 ORDER BY MaBieuQuyet DESC`);
        if (result) {
            const newResult = [...result];
            await Promise.all(result.map(async (el, index) => {
                const [result1, f] = await sqlPromise.query(
                    `SELECT ungcuvien.MaUngCuVien, dangvien.HoTen 
                    FROM ungcuvien, dangvien 
                    WHERE MaBieuQuyet = ${el.MaBieuQuyet}
                    AND ungcuvien.MaUngCuVien = dangvien.MaSoDangVien
                    `)
                newResult[index].UngCuVien = result1;
            }))
            await Promise.all(result.map(async (el, index) => {
                const [result2, f] = await sqlPromise.query(
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
        res.status(500).json({ msg: error.message })
    }
}

exports.getVoting = async (req, res) => {
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

exports.createVoting = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const { MaBieuQuyet, MaNguoiThamGia, UngCuVien } = req.body
        let datetime = moment().format('YYYY-MM-DD,HH:mm:ss.000');
        const result = await Promise.all(UngCuVien.map(async (el, index) => {
            const [result1, f] = await sqlPromise.query(
                `INSERT INTO phieu SET MaBieuQuyet = ${MaBieuQuyet},
                 MaNguoiThamGia = "${MaNguoiThamGia}",
                 MaUngCuVien = "${el}",
                 ThoiGianBoPhieu = "${datetime}"
                `
            )
            return result1
        }))
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
            res.status(200).json({ isVoted: true });
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
            SELECT MaUngCuVien,dangvien.HoTen, COUNT(MaNguoiThamGia) 
            AS SoPhieu 
            FROM phieu, dangvien
            WHERE phieu.MaUngCuVien = dangvien.MaSoDangVien
            AND phieu.MaBieuQuyet = ${id}
            GROUP BY MaUngCuVien;
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
        if(result) {
            res.status(200).json({ msg: "Đã xóa!" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}