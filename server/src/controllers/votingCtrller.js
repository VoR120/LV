const sql = require('../configs/db');

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
                SET MaSoDangVien = "${el}",
                MaBieuQuyet = ${MaBieuQuyet}`)
            }))
            await Promise.all(NguoiThamGia.map(async el => {
                await sqlPromise.query(`INSERT INTO nguoithamgia 
                SET MaSoDangVien = "${el}",
                MaBieuQuyet = ${MaBieuQuyet}`)
            }))
            res.status(201).json({ id: MaBieuQuyet, ...data })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

exports.getAllVoting = async (req, res) => {
    try {
        const sqlPromise = sql.promise();
        const [result, f] = await sqlPromise.query(`SELECT * FROM bieuquyet`);
        if (result) {
            const newResult = [...result];
            await Promise.all(result.map(async (el, index) => {
                const [result1, f] = await sqlPromise.query(
                    `SELECT ungcuvien.MaUngCuVien, ungcuvien.MaSoDangVien, dangvien.HoTen 
                    FROM ungcuvien, dangvien 
                    WHERE MaBieuQuyet = ${el.MaBieuQuyet}
                    AND ungcuvien.MaSoDangVien = dangvien.MaSoDangVien
                    `)
                newResult[index].UngCuVien = result1;
            }))
            await Promise.all(result.map(async (el, index) => {
                const [result2, f] = await sqlPromise.query(
                    `SELECT nguoithamgia.MaNguoiThamGia, nguoithamgia.MaSoDangVien, dangvien.HoTen
                    FROM nguoithamgia, dangvien
                    WHERE MaBieuQuyet = ${el.MaBieuQuyet}
                    AND nguoithamgia.MaSoDangVien = dangvien.MaSoDangVien
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
        const [result, f] = await sqlPromise.query(`SELECT * FROM bieuquyet WHERE MaBieuQuyet = ${id}`);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}