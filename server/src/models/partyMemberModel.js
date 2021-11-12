const sql = require('../configs/db');
const { findById, create, updateById, removeAll, remove, getDate } = require('./utils');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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

const PartyMember = {
    getAll: (callback) => {
        sql.query(`SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri
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
                                sql.query(`SELECT * FROM quyendangvien WHERE `)
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
            symbols: true,
        })
        console.log(newPassword);
        newValue.HashPassword = await bcrypt.hash(newPassword, 10);
        sql.query(`INSERT INTO dangvien SET ?`, newValue, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            const mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vob1706895@student.ctu.edu.vn',
                    pass: 'aj7EAM38'
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
                dataStr = dataStr + ` AND dangvien.${el} = ${data[el]}`
            }
        })
        const query = `SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri
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
    }
};

module.exports = PartyMember;


