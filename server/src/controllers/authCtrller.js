const sql = require('../configs/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getDate, getGender } = require('../models/utils');
const axios = require('axios');

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
        const sqlPromise = sql.promise();
        sql.query(`SELECT * FROM dangvien WHERE Email = "${email}" AND DaXoa = 0`,
            async (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                if (result.length) {
                    let result1 = [...result]
                    const isMatch = await bcrypt.compareSync(password, result[0]["HashPassword"]);
                    if (isMatch) {
                        let lArr = [];
                        let lpArr = [];
                        const [resFlpm, f] = await sqlPromise.execute(`
                            SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
                            FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
                            WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
                            AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
                            AND ngoaingudangvien.MaSoDangVien = "${result[0].MaSoDangVien}"`);
                        resFlpm.forEach(el => {
                            lArr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo })
                            lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
                        });
                        let addressArr = {};
                        let addressFull = {};
                        const [resAddress, f1] = await sqlPromise.execute(`
                            SELECT diachi.*, loaidiachi.MaLoaiDiaChi 
                            FROM diachidangvien, diachi, loaidiachi 
                            WHERE diachidangvien.MaLoaiDiaChi = loaidiachi.MaLoaiDiaChi
                            AND diachidangvien.MaDiaChi = diachi.MaDiaChi
                            AND diachidangvien.MaSoDangVien = "${result[0].MaSoDangVien}"`)
                        await Promise.all(resAddress.map(async (el, index) => {
                            const resPro = await axios.get(`https://provinces.open-api.vn/api/p/${el.MaTinh}?depth=1`);
                            const resDis = await axios.get(`https://provinces.open-api.vn/api/d/${el.MaHuyen}?depth=1`);
                            const resWard = await axios.get(`https://provinces.open-api.vn/api/w/${el.MaXa}?depth=1`);
                            if (el.MaLoaiDiaChi == "1") {
                                addressArr.QueQuan = {
                                    provinceValue: el.MaTinh,
                                    districtValue: el.MaHuyen,
                                    wardValue: el.MaXa,
                                    detail: el.DiaChiCuThe
                                }
                                addressFull.QueQuan = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
                            }
                            if (el.MaLoaiDiaChi == "2") {
                                addressArr.DiaChiThuongTru = {
                                    provinceValue: el.MaTinh,
                                    districtValue: el.MaHuyen,
                                    wardValue: el.MaXa,
                                    detail: el.DiaChiCuThe
                                }
                                addressFull.DiaChiThuongTru = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
                            }
                            if (el.MaLoaiDiaChi == "3") {
                                addressArr.NoiOHienTai = {
                                    provinceValue: el.MaTinh,
                                    districtValue: el.MaHuyen,
                                    wardValue: el.MaXa,
                                    detail: el.DiaChiCuThe
                                }
                                addressFull.NoiOHienTai = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
                            }
                        }))
                        delete result[0].HashPassword;
                        result1[0].NgoaiNgu = lArr;
                        result1[0].NgoaiNguTrinhDo = lpArr.join(", ")
                        result1[0].DiaChi = addressArr;
                        result1[0].QueQuan = addressFull.QueQuan;
                        result1[0].DiaChiThuongTru = addressFull.DiaChiThuongTru;
                        result1[0].NoiOHienTai = addressFull.NoiOHienTai;
                        result1[0].TenGioiTinh = getGender(result[0].GioiTinh)
                        result1[0].NgaySinh = getDate(result[0].NgaySinh);
                        result1[0].NgayVaoDoan = getDate(result[0].NgayVaoDoan);
                        result1[0].NgayVaoDang = getDate(result[0].NgayVaoDang);
                        result1[0].NgayChinhThuc = getDate(result[0].NgayChinhThuc);
                        const token = jwt.sign({ id: result[0]["MaSoSinhVien"] }, process.env.TOKEN_SECRET)
                        res.cookie('token', token);
                        res.status(200).json({ msg: "Đã đăng nhập", info: result1[0], token: token })
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
        console.log(req.body);
        sql.query(`SELECT * FROM dangvien WHERE MaSoDangVien = "${MaSoDangVien}" AND DaXoa = 0`,
            async (err, result) => {
                if (err) {
                    res.status(500).json({ err })
                    return;
                }
                if (result.length) {
                    console.log(result);
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


