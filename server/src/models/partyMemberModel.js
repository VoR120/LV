const sql = require('../configs/db');
const { findById, create, updateById, removeAll, remove, getDate } = require('./utils');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const query = {
    getDataWithName: (id) => `SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri, chucvu.TenChucVu
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

const PartyMember = {
    getAll: (callback) => {
        sql.query(`SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri, chucvu.TenChucVu
            FROM dangvien
            INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
            INNER JOIN chucvu ON dangvien.MaChucVu = chucvu.MaChucVu
            INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
            INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
            INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
            INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                let result = [...res]
                if (res.length) {
                    res.map((el, index) => {
                        delete result[index].HashPassword;
                        result[index].NgaySinh = getDate(result[index].NgaySinh);
                        result[index].NgayVaoDoan = getDate(result[index].NgayVaoDoan);
                        result[index].NgayVaoDang = getDate(result[index].NgayVaoDang);
                        result[index].NgayChinhThuc = getDate(result[index].NgayChinhThuc);
                    })
                }
                console.log("All: ", result);
                callback(null, { data: result });
            })
    },
    findById: (id, callback) => {
        sql.query(query.getDataWithName(id),
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                if (res.length) {
                    let result = [...res];
                    sql.query(query.getFLanguageWithName(id),
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                callback(err, null);
                                return;
                            }
                            if (res.length) {
                                delete result[0].HashPassword;
                                result[0].NgoaiNgu = res;
                                result[0].NgaySinh = getDate(result[0].NgaySinh);
                                result[0].NgayVaoDoan = getDate(result[0].NgayVaoDoan);
                                result[0].NgayVaoDang = getDate(result[0].NgayVaoDang);
                                result[0].NgayChinhThuc = getDate(result[0].NgayChinhThuc);
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
    create: async (newValue, callback) => {

        const newPassword = generator.generate({
            length: 8,
            numbers: true,
        })
        console.log(newPassword);
        newValue.HashPassword = await bcrypt.hash(newPassword, 10);
        sql.query(`INSERT INTO dangvien SET ?`, newValue, (err, res) => {
            if (err) {
                if (err.errno == 1062) {
                    if (err.message.includes("CMND")) {
                        callback({ type: "duplicated", value: "CMND" })
                        return;
                    }
                    if (err.message.includes("Email")) {
                        callback({ type: "duplicated", value: "Email" })
                        return;
                    }
                    if (err.message.includes("SoDienThoai")) {
                        callback({ type: "duplicated", value: "Số điện thoại" })
                        return;
                    }
                    callback({ type: "duplicated", value: "CMND" }, null)
                    return;
                }
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            const mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vob1706895@student.ctu.edu.vn',
                    pass: `${process.env.PASSWORD}`
                }
            })

            const mailOptions = {
                from: 'vob1706895@student.ctu.edu.vn',
                to: `${newValue.Email}`,
                subject: 'Cấp tài khoản bởi admin',
                text: `Mật khẩu đăng nhập: ${newPassword}`
            }

            mail.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            sql.query(query.getDataWithName(newValue.MaSoDangVien),
                async (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    if (res.length) {
                        let result = [...res]
                        delete result[0].HashPassword;
                        result[0].NgaySinh = getDate(result[0].NgaySinh);
                        result[0].NgayVaoDoan = getDate(result[0].NgayVaoDoan);
                        result[0].NgayVaoDang = getDate(result[0].NgayVaoDang);
                        result[0].NgayChinhThuc = getDate(result[0].NgayChinhThuc);
                        console.log("Created: ", result);
                        callback(null, { data: result });
                        return;
                    }
                    callback({ type: "not_found" }, null)
                }
            )
        })
    },
    updateById: (id, newValue, callback) => {
        sql.query(`UPDATE dangvien SET ? WHERE MaSoDangVien = "${id}"`, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            sql.query(query.getDataWithName(id),
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    if (res.length) {
                        let result = [...res];
                        sql.query(query.getFLanguageWithName(id),
                            (err, res) => {
                                if (err) {
                                    console.log("error: ", err);
                                    callback(err, null);
                                    return;
                                }
                                if (res.length) {
                                    delete result[0].HashPassword
                                    result[0].NgoaiNgu = res;
                                    result[0].NgaySinh = getDate(result[0].NgaySinh);
                                    result[0].NgayVaoDoan = getDate(result[0].NgayVaoDoan);
                                    result[0].NgayVaoDang = getDate(result[0].NgayVaoDang);
                                    result[0].NgayChinhThuc = getDate(result[0].NgayChinhThuc);
                                    console.log("Update: ", result);
                                    callback(null, result);
                                    return;
                                }
                                callback({ type: "not_found" }, null)
                            })
                        return;
                    }
                    callback({ type: "not_found" }, null)
                }
            )
        }))
    },
    remove: remove("dangvien", "MaSoDangVien"),
    removeAll: removeAll("dangvien"),

    filter: (data, callback) => {
        let dataStr = "";
        Object.keys(data).map(el => {
            if (el == "QQTinh") {
                dataStr = dataStr + ` INNER JOIN diachidangvien 
                    INNER JOIN diachi ON diachidangvien.MaDiaChi = diachi.MaDiaChi
                    AND diachidangvien.MaLoaiDiaChi = "0001"
                    AND diachi.MaTinh = "${data[el]}"
                    ON dangvien.MaSoDangVien = diachidangvien.MaSoDangVien`
            } else if (el == "MaLoai") {
                dataStr = dataStr + `INNER JOIN loaidangvien ON dangvien.MaSoDangVien = loaidangvien.MaSoDangVien
                 AND loaidangvien.${el} = ${data[el]}`
            } else if (el == "Tuoigt") {
                dataStr = dataStr + ` AND year(current_date()) - year(dangvien.NgaySinh) > ${data[el]}`
            } else if (el == "Tuoilt") {
                dataStr = dataStr + ` AND year(current_date()) - year(dangvien.NgaySinh) < ${data[el]}`
            } else if (el == "HoTen") {
                dataStr = dataStr + ` AND HoTen LIKE "%${data[el]}%"`
            } else {
                dataStr = dataStr + ` AND dangvien.${el} = "${data[el]}"`
            }
        })
        const query = `SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri, chucvu.TenChucVu
                FROM dangvien
                INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
                INNER JOIN chucvu ON dangvien.MaChucVu = chucvu.MaChucVu
                INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
                INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
                INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
                INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri
                ${dataStr}`
        sql.query(query,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                let result = [...res]
                if (res.length) {
                    res.map((el, index) => {
                        delete result[index].HashPassword
                        result[index].NgaySinh = getDate(result[index].NgaySinh);
                        result[index].NgayVaoDoan = getDate(result[index].NgayVaoDoan);
                        result[index].NgayVaoDang = getDate(result[index].NgayVaoDang);
                        result[index].NgayChinhThuc = getDate(result[index].NgayChinhThuc);
                    })
                }
                console.log("All: ", result);
                callback(null, { data: result });
                return;
            })
    },
};

module.exports = PartyMember;


// {
//     "HoTen":"Nguyễn Văn Vỏ",
//     "MaSoDangVien":"B1706895",
//     "GioiTinh":"m",
//     "CMND":"089099120154",
//     "NgaySinh":"1999-08-19",
//     "NoiSinh":"An Giang",
//     "QuocTich":"Việt Nam",
//     "SoDienThoai":"0981000000",
//     "Email":"vonguyen2.vn@gmail.com",
//     "NgheNghiep":"Sinh viên",
//     "TrinhDoHocVan":"12/12",
//     "NgayVaoDoan":"2015-12-12",
//     "NoiVaoDoan":"An Giang",
//     "NgayVaoDang":"2017-12-12",
//     "NoiVaoDangLanDau":"Cần Thơ",
//     "NgayChinhThuc":"2018-12-12",
//     "NoiVaoDangChinhThuc":"Cần Thơ",
//     "NguoiGioiThieu":"",
//     "MaChiBo":"0001",
//     "MaChinhTri":"0001",
//     "MaChucVu":"0001",
//     "MaDanToc":"0001",
//     "MaTinHoc":"0001",
//     "MaTonGiao":"0007",
//     "TrangThai": 1
// }