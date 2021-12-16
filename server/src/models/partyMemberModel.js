const sql = require('../configs/db');
const { findById, create, updateById, removeAll, remove, getGender } = require('./utils');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const axios = require('axios');

const query = {
    getDataWithName: (id) => `SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri, chucvu.TenChucVu
        FROM dangvien
        INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
        INNER JOIN chucvu ON dangvien.MaChucVu = chucvu.MaChucVu
        INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
        INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
        INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
        INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri 
        WHERE MaSoDangVien = "${id}"
        AND DaXoa = 0`,
    getFLanguageWithName: (id) => `SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
        FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
        WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
        AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
        AND ngoaingudangvien.MaSoDangVien = "${id}"`
}

const PartyMember = {
    getAll: async (callback) => {
        try {
            const sqlPromise = sql.promise();
            const [res, f] = await sqlPromise.query(`
                    SELECT dangvien.*, chibo.TenChiBo, dantoc.TenDanToc, tongiao.TenTonGiao, tinhoc.TenTinHoc,  chinhtri.TenChinhTri, chucvu.TenChucVu
                    FROM dangvien
                    INNER JOIN chibo ON dangvien.MaChiBo = chibo.MaChiBo
                    INNER JOIN chucvu ON dangvien.MaChucVu = chucvu.MaChucVu
                    INNER JOIN dantoc ON dangvien.MaDanToc = dantoc.MaDanToc
                    INNER JOIN tongiao ON dangvien.MaTonGiao = tongiao.MaTonGiao
                    INNER JOIN tinhoc ON dangvien.MaTinHoc = tinhoc.MaTinHoc
                    INNER JOIN chinhtri ON dangvien.MaChinhTri = chinhtri.MaChinhTri
                    AND DaXoa = 0`)
            let result = [...res]
            if (res.length > 0) {
                await Promise.all(res.map(async (data, index) => {
                    let lArr = [];
                    let lpArr = [];
                    const [resFlpm, f] = await sqlPromise.query(`
                    SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
                    FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
                    WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
                    AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
                    AND ngoaingudangvien.MaSoDangVien = "${data.MaSoDangVien}"`);
                    resFlpm.forEach(el => {
                        lArr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo })
                        lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
                    });
                    let addressArr = {};
                    let addressFull = {};
                    const [resAddress, f1] = await sqlPromise.query(`
                    SELECT diachi.*, loaidiachi.MaLoaiDiaChi 
                    FROM diachidangvien, diachi, loaidiachi 
                    WHERE diachidangvien.MaLoaiDiaChi = loaidiachi.MaLoaiDiaChi
                    AND diachidangvien.MaDiaChi = diachi.MaDiaChi
                    AND diachidangvien.MaSoDangVien = "${data.MaSoDangVien}"`)
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

                    const [resPermission, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyendangvien 
                        WHERE quyendangvien.MaSoDangVien = "${data.MaSoDangVien}"
                    `)

                    let resultPermission = {};
                    if (resPermission.length > 0) {
                        resPermission.map(e => {
                            resultPermission[e.MaQuyen] = e.CoQuyen
                        })
                    } else {
                        const [resPermissionPS, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyenchucvu 
                        WHERE quyenchucvu.MaChucVu = ${data.MaChucVu}
                        `)
                        if (resPermissionPS.length > 0) {
                            resPermissionPS.map(e => {
                                resultPermission[e.MaQuyen] = e.CoQuyen
                            })
                        }
                    }

                    delete result[index].HashPassword;
                    result[index].Quyen = resultPermission
                    result[index].NgoaiNgu = lArr;
                    result[index].NgoaiNguTrinhDo = lpArr.join(", ")
                    result[index].DiaChi = addressArr;
                    result[index].QueQuan = addressFull.QueQuan;
                    result[index].DiaChiThuongTru = addressFull.DiaChiThuongTru;
                    result[index].NoiOHienTai = addressFull.NoiOHienTai;
                    result[index].TenGioiTinh = getGender(res[index].GioiTinh)
                }))
                callback(null, result);
            }
        } catch (error) {
            callback(error, null)
        }
    },
    findById: async (id, callback) => {
        try {
            const sqlPromise = sql.promise();
            const [res, f] = await sqlPromise.query(query.getDataWithName(id))
            let result = [...res]
            if (res.length > 0) {
                let lArr = [];
                let lpArr = [];
                const [resFlpm, f] = await sqlPromise.query(`
                    SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
                    FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
                    WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
                    AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
                    AND ngoaingudangvien.MaSoDangVien = "${res[0].MaSoDangVien}"`);
                resFlpm.forEach(el => {
                    lArr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo })
                    lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
                });
                let addressArr = {};
                let addressFull = {};
                const [resAddress, f1] = await sqlPromise.query(`
                    SELECT diachi.*, loaidiachi.MaLoaiDiaChi 
                    FROM diachidangvien, diachi, loaidiachi 
                    WHERE diachidangvien.MaLoaiDiaChi = loaidiachi.MaLoaiDiaChi
                    AND diachidangvien.MaDiaChi = diachi.MaDiaChi
                    AND diachidangvien.MaSoDangVien = "${res[0].MaSoDangVien}"`)
                if (resAddress) {
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
                }

                const [resPermission, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyendangvien 
                        WHERE quyendangvien.MaSoDangVien = "${res[0].MaSoDangVien}"
                    `)

                let resultPermission = {};
                if (resPermission.length > 0) {
                    resPermission.map(e => {
                        resultPermission[e.MaQuyen] = e.CoQuyen
                    })
                } else {
                    const [resPermissionPS, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyenchucvu 
                        WHERE quyenchucvu.MaChucVu = ${res[0].MaChucVu}
                        `)
                    if (resPermissionPS.length > 0) {
                        resPermissionPS.map(e => {
                            resultPermission[e.MaQuyen] = e.CoQuyen
                        })
                    }
                }

                delete result[0].HashPassword;
                result[0].Quyen = resultPermission;
                result[0].NgoaiNgu = lArr;
                result[0].NgoaiNguTrinhDo = lpArr.join(", ")
                result[0].DiaChi = addressArr;
                result[0].QueQuan = addressFull.QueQuan;
                result[0].DiaChiThuongTru = addressFull.DiaChiThuongTru;
                result[0].NoiOHienTai = addressFull.NoiOHienTai;
                result[0].TenGioiTinh = getGender(result[0].GioiTinh)
                callback(null, result);
            }
        } catch (error) {
            callback(error, null)
        }
    },
    create: async (newValue, callback) => {

        const sqlPromise = sql.promise();
        const newPassword = generator.generate({
            length: 8,
            numbers: true,
        })
        console.log(newPassword);
        newValue.HashPassword = await bcrypt.hash(newPassword, 10);
        sql.query(`INSERT INTO dangvien SET ?`, newValue, (err, res) => {
            if (err) {
                if (err.errno == 1062) {
                    if (err.message.includes("PRIMARY")) {
                        callback({ type: "duplicated", value: "Mã Số Đảng viên", field: "MaSoDangVien" })
                        return;
                    }
                    if (err.message.includes("CMND")) {
                        callback({ type: "duplicated", value: "CMND", field: "CMND" })
                        return;
                    }
                    if (err.message.includes("Email")) {
                        callback({ type: "duplicated", value: "Email", field: "Email" })
                        return;
                    }
                    if (err.message.includes("SoDienThoai")) {
                        callback({ type: "duplicated", value: "Số điện thoại", field: "SoDienThoai" })
                        return;
                    }
                    if (err.message.includes("SoThe")) {
                        callback({ type: "duplicated", value: "Số thẻ", field: "SoThe" })
                        return;
                    }
                    callback(err, null)
                    return;
                }
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            // const mail = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: 'vob1706895@student.ctu.edu.vn',
            //         pass: `${process.env.PASSWORD}`
            //     }
            // })

            // const mailOptions = {
            //     from: 'vob1706895@student.ctu.edu.vn',
            //     to: `${newValue.Email}`,
            //     subject: `Cấp tài khoản truy cập vào website ${process.env.URL}`,
            //     text: `Mật khẩu đăng nhập: ${newPassword}`
            // }

            // mail.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log('Email sent: ' + info.response);
            //     }
            // });

            sql.query(query.getDataWithName(newValue.MaSoDangVien),
                async (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    if (res.length) {

                        let resultPermission = {};

                        const [resPermissionPS, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyenchucvu 
                        WHERE quyenchucvu.MaChucVu = ${newValue.MaChucVu}
                        `)
                        if (resPermissionPS.length > 0) {
                            resPermissionPS.map(e => {
                                resultPermission[e.MaQuyen] = e.CoQuyen
                            })
                        }


                        delete res[0].HashPassword;
                        res[0].Quyen = resultPermission;
                        console.log("Created: ", res);
                        callback(null, { data: res });
                        return;
                    }
                    callback({ type: "not_found" }, null)
                }
            )
        })
    },
    updateById: async (id, newValue, callback) => {
        try {
            const sqlPromise = sql.promise()
            const [checkEmail, fCE] = await sqlPromise.query(`
                SELECT MaSoDangVien 
                FROM dangvien 
                WHERE MaSoDangVien != "${newValue.MaSoDangVien}" 
                AND Email = "${newValue.Email}"
            `)
            if (checkEmail.length) {
                callback({ type: "duplicated", value: "Email", field: "Email" }, null)
                return;
            }
            const [checkPhone, fCP] = await sqlPromise.query(`
                SELECT MaSoDangVien 
                FROM dangvien 
                WHERE MaSoDangVien != "${newValue.MaSoDangVien}" 
                AND SoDienThoai = "${newValue.SoDienThoai}"
            `)
            if (checkPhone.length) {
                callback({ type: "duplicated", value: "Số điện thoại", field: "SoDienThoai" }, null)
                return;
            }
            const [checkCMND, fCCMND] = await sqlPromise.query(`
                SELECT MaSoDangVien 
                FROM dangvien 
                WHERE MaSoDangVien != "${newValue.MaSoDangVien}" 
                AND CMND = "${newValue.CMND}"
            `)
            if (checkCMND.length) {
                callback({ type: "duplicated", value: "CMND", field: "CMND" }, null)
                return;
            }

            const [checkSoThe, fCSoThe] = await sqlPromise.query(`
                SELECT MaSoDangVien 
                FROM dangvien 
                WHERE MaSoDangVien != "${newValue.MaSoDangVien}" 
                AND SoThe = "${newValue.SoThe}"
            `)
            if (checkSoThe.length) {
                callback({ type: "duplicated", value: "SoThe", field: "SoThe" }, null)
                return;
            }
            sql.query(`UPDATE dangvien SET ? WHERE MaSoDangVien = "${id}"`, newValue, (async (err, resUp) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }

                if (resUp.affectedRows == 0) {
                    callback({ type: "not_found" }, null);
                    return;
                }

                const [res, f] = await sqlPromise.query(query.getDataWithName(id))
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                const result = [...res]
                if (res.length > 0) {
                    let lArr = [];
                    let lpArr = [];
                    const [resFlpm, f] = await sqlPromise.query(`
                        SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
                        FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
                        WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
                        AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
                        AND ngoaingudangvien.MaSoDangVien = "${res[0].MaSoDangVien}"`);
                    resFlpm.forEach(el => {
                        lArr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo })
                        lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
                    });
                    let addressArr = {};
                    let addressFull = {};
                    const [resAddress, f1] = await sqlPromise.query(`
                    SELECT diachi.*, loaidiachi.MaLoaiDiaChi 
                    FROM diachidangvien, diachi, loaidiachi 
                    WHERE diachidangvien.MaLoaiDiaChi = loaidiachi.MaLoaiDiaChi
                    AND diachidangvien.MaDiaChi = diachi.MaDiaChi
                    AND diachidangvien.MaSoDangVien = "${res[0].MaSoDangVien}"`)
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

                    const [resPermission, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyendangvien 
                        WHERE quyendangvien.MaSoDangVien = "${res[0].MaSoDangVien}"
                    `)

                    let resultPermission = {};
                    if (resPermission.length > 0) {
                        resPermission.map(e => {
                            resultPermission[e.MaQuyen] = e.CoQuyen
                        })
                    } else {
                        const [resPermissionPS, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyenchucvu 
                        WHERE quyenchucvu.MaChucVu = ${res[0].MaChucVu}
                        `)
                        if (resPermissionPS.length > 0) {
                            resPermissionPS.map(e => {
                                resultPermission[e.MaQuyen] = e.CoQuyen
                            })
                        }
                    }

                    delete result[0].HashPassword;
                    result[0].Quyen = resultPermission;
                    result[0].NgoaiNgu = lArr;
                    result[0].NgoaiNguTrinhDo = lpArr.join(", ")
                    result[0].DiaChi = addressArr;
                    result[0].QueQuan = addressFull.QueQuan;
                    result[0].DiaChiThuongTru = addressFull.DiaChiThuongTru;
                    result[0].NoiOHienTai = addressFull.NoiOHienTai;
                    result[0].TenGioiTinh = getGender(result[0].GioiTinh)
                    callback(null, result);
                    return;
                }
                callback({ type: "not_found" }, null)
            }))
        } catch (error) {
            callback(err, null);
        }

    },
    remove: (id, callback) => {
        sql.query(`UPDATE dangvien SET DaXoa = 1 WHERE MaSoDangVien = "${id}"`, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }
            callback(null, res)
        }))
    },
    removeAll: removeAll("dangvien"),

    filter: async (data, callback) => {
        try {
            console.log(data)
            let dataStr = "";
            Object.keys(data).map(el => {
                if (el == "QQTinh") {
                    dataStr = dataStr + ` INNER JOIN diachidangvien 
                    INNER JOIN diachi ON diachidangvien.MaDiaChi = diachi.MaDiaChi
                    AND diachidangvien.MaLoaiDiaChi = "0001"
                    AND diachi.MaTinh = "${data[el]}"
                    ON dangvien.MaSoDangVien = diachidangvien.MaSoDangVien`
                } else if (el == "MaLoai") {
                    dataStr = dataStr + ` INNER JOIN danhgiadangvien 
                    ON danhgiadangvien.MaSoDangVien = dangvien.MaSoDangVien
                    AND danhgiadangvien.${el} = ${data[el]}
                    AND danhgiadangvien.MaDVDG = 3`
                } else if (el == "KhongDuBi") {
                    dataStr = dataStr + ` AND dangvien.MaChucVu != 4`
                } else if (el == "Tuoigt") {
                    dataStr = dataStr + ` AND year(current_date()) - year(dangvien.NgaySinh) >= ${data[el]}`
                } else if (el == "Tuoilt") {
                    dataStr = dataStr + ` AND year(current_date()) - year(dangvien.NgaySinh) <= ${data[el]}`
                } else if (el == "HoTen") {
                    dataStr = dataStr + ` AND HoTen LIKE "%${data[el]}%"`
                } else if (el == "MaThanhTich") {
                    dataStr = dataStr + ` INNER JOIN thanhtichdangvien ON dangvien.MaSoDangVien = thanhtichdangvien.MaSoDangVien
                    AND thanhtichdangvien.${el} = ${data[el]}`
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
                AND dangvien.DaXoa = 0
                ${dataStr}`;
            const sqlPromise = sql.promise();
            const [res, f] = await sqlPromise.query(query)
            let result = [...res]
            if (res.length > 0) {
                await Promise.all(res.map(async (data, index) => {
                    let lArr = [];
                    let lpArr = [];
                    const [resFlpm, f] = await sqlPromise.query(`
                    SELECT ngoaingudangvien.*, ngoaingu.TenNgoaiNgu, trinhdongoaingu.TenTrinhDo
                    FROM ngoaingudangvien, ngoaingu, trinhdongoaingu
                    WHERE ngoaingudangvien.MaNgoaiNgu = ngoaingu.MaNgoaiNgu
                    AND ngoaingudangvien.MaTrinhDo = trinhdongoaingu.MaTrinhDo
                    AND ngoaingudangvien.MaSoDangVien = "${data.MaSoDangVien}"`);
                    resFlpm.forEach(el => {
                        lArr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo })
                        lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
                    });
                    let addressArr = {};
                    let addressFull = {};
                    const [resAddress, f1] = await sqlPromise.query(`
                    SELECT diachi.*, loaidiachi.MaLoaiDiaChi 
                    FROM diachidangvien, diachi, loaidiachi 
                    WHERE diachidangvien.MaLoaiDiaChi = loaidiachi.MaLoaiDiaChi
                    AND diachidangvien.MaDiaChi = diachi.MaDiaChi
                    AND diachidangvien.MaSoDangVien = "${data.MaSoDangVien}"`)
                    if (resAddress.length)
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

                    const [resPermission, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyendangvien 
                        WHERE quyendangvien.MaSoDangVien = "${data.MaSoDangVien}"
                    `)

                    let resultPermission = {};
                    if (resPermission.length > 0) {
                        resPermission.map(e => {
                            resultPermission[e.MaQuyen] = e.CoQuyen
                        })
                    } else {
                        const [resPermissionPS, f2] = await sqlPromise.query(`
                        SELECT MaQuyen, CoQuyen 
                        FROM quyenchucvu 
                        WHERE quyenchucvu.MaChucVu = ${data.MaChucVu}
                        `)
                        if (resPermissionPS.length > 0) {
                            resPermissionPS.map(e => {
                                resultPermission[e.MaQuyen] = e.CoQuyen
                            })
                        }
                    }

                    delete result[index].HashPassword;
                    result[index].Quyen = resultPermission;
                    result[index].NgoaiNgu = lArr;
                    result[index].NgoaiNguTrinhDo = lpArr.join(", ")
                    result[index].DiaChi = addressArr;
                    result[index].QueQuan = addressFull.QueQuan;
                    result[index].DiaChiThuongTru = addressFull.DiaChiThuongTru;
                    result[index].NoiOHienTai = addressFull.NoiOHienTai;
                    result[index].TenGioiTinh = getGender(res[index].GioiTinh)
                }))
            }
            callback(null, result);
        } catch (error) {
            callback(error, null);
        }
    },
    mailing: async (data, callback) => {

        const newPassword = generator.generate({
            length: 8,
            numbers: true,
        })
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vob1706895@student.ctu.edu.vn',
                pass: `${process.env.PASSWORD}`
            }
        })

        const mailOptions = {
            from: 'vob1706895@student.ctu.edu.vn',
            to: `${data.mailList}`,
            subject: `Cấp tài khoản truy cập vào website quản lý Đảng viên khoa CNTT&TT Đại học Cần Thơ`,
            html: `
            Cấp tài khoản truy cập vào website ${process.env.URL} <br/>
            Mật khẩu đăng nhập: ${newPassword} <br/>
            Bạn có thể đổi mật khẩu sau khi đăng nhập. <br/>
            ...<br/>
            Thân,<br/>
            Nguyễn Văn Vỏ - B1706895.
            `
        }

        mail.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
                callback({ msg: "Đã có lỗi xảy ra!" }, null);
                return;
            } else {
                console.log('Email sent: ' + info.response);
                const sqlPromise = sql.promise()
                await Promise.all(data.mailList.map(async el => {
                    try {
                        await sqlPromise.query(`UPDATE dangvien SET DaXacNhan = 1, HashPassword = "${hashPassword}" WHERE Email = "${el}"`)
                    } catch (error) {
                        console.log(error);
                        callback({ message: "Đã có lỗi xảy ra!" }, null)
                        return;
                    }
                }))
                callback(null, { msg: "Đã gửi!" })
                return;
            }
        });
    }
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