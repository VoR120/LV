const sql = require('../configs/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDate } = require('../models/utils');

const query = {
    getDataWithName: (id) => `SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri
        FROM dangvien
        INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
        INNER JOIN chucvu ON dangvien.MaChucVu = chucvu.MaChucVu
        INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
        INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
        INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
        INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri WHERE MaSoDangVien = "${id}"`,
    getFLanguageWithName: (id) => `SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
        FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
        WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
        AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
        AND ngoaingudangvien.MaSoDangVien = "${id}"`
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        sql.query(`SELECT * FROM dangvien WHERE Email = "${email}"`,
            async (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                if (result.length) {
                    const isMatch = await bcrypt.compareSync(password, result[0]["HashPassword"]);
                    if (isMatch) {
                        let resultFinal = [...result];
                        sql.query(query.getFLanguageWithName(result[0]["MaSoDangVien"]),
                            (err, resl) => {
                                if (err) {
                                    res.status(500).json({ err })
                                }
                                if (resl.length) {
                                    resultFinal[0].NgoaiNgu = resl;
                                    resultFinal[0].NgaySinh = getDate(resultFinal[0].NgaySinh);
                                    resultFinal[0].NgayVaoDoan = getDate(resultFinal[0].NgayVaoDoan);
                                    resultFinal[0].NgayVaoDang = getDate(resultFinal[0].NgayVaoDang);
                                    resultFinal[0].NgayChinhThuc = getDate(resultFinal[0].NgayChinhThuc);
                                    const token = jwt.sign({ id: result[0]["MaSoSinhVien"] }, process.env.TOKEN_SECRET)
                                    res.cookie('token', token);
                                    res.status(200).json({ msg: "Đã đăng nhập", info: resultFinal[0], token: token })
                                    return;
                                }
                            })
                    } else
                        res.status(400).json({ msg: "Mật khẩu không chính xác!", type: "password" })
                } else
                    res.status(400).json({ msg: "Tài khoản không tồn tại!", type: "email" })
            }
        )
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.removeItem('token');
        return res.status(200).json({ msg: "Đã đăng xuất!" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { password, newPassword, MaSoDangVien } = req.body
        sql.query(`SELECT * FROM dangvien WHERE MaSoDangVien = "${MaSoDangVien}"`,
            async (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                if (result.length) {
                    const isMatch = await bcrypt.compareSync(password, result[0]["HashPassword"]);
                    if (isMatch) {
                        if (password == newPassword) {
                            res.status(400).json({
                                msg: "Mật khẩu mới không được trùng với mật khẩu cũ!",
                                type: "newPassword"
                            })
                        }
                        else {
                            const passHash = await bcrypt.hash(newPassword, 10);
                            sql.query(`UPDATE dangvien SET HashPassword = "${passHash}" WHERE MaSoDangVien = "${MaSoDangVien}"`,
                                (err, result1) => {
                                    if (err) {
                                        res.status(500).json({ err })
                                        return;
                                    }
                                    res.status(200).json({ msg: "Đổi mật khẩu thành công!" })
                                })
                        }
                    } else
                        res.status(400).json({ msg: "Mật khẩu không chính xác!", type: "password" })
                }
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}


