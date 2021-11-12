const sql = require('../configs/db');
const { zeroFill } = require('./utils');

const Address = {
    create: (newValue, callback) => {
        const { MaSoDangVien, MaTinh, MaHuyen, MaXa, DiaChiCuThe, MaLoaiDiaChi } = newValue;
        sql.query(`INSERT INTO diachi 
            SET MaTinh = ${MaTinh}, MaHuyen = ${MaHuyen}, MaXa = ${MaXa}, DiaChiCuThe = "${DiaChiCuThe}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                const addressId = zeroFill(res.insertId)
                console.log("Created Address: ", { MaDiaChi: addressId, ...newValue });
                sql.query(`INSERT INTO diachidangvien SET MaSoDangVien = "${MaSoDangVien}", MaDiaChi = ${zeroFill(res.insertId)},
                MaLoaiDiaChi = ${MaLoaiDiaChi} 
            `, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    console.log("Created: ", { MaDiaChi: addressId, MaSoDangVien, MaLoaiDiaChi });
                    callback(null, { MaDiaChi: addressId, MaSoDangVien, MaLoaiDiaChi, MaTinh, MaHuyen, MaXa, DiaChiCuThe, });
                })
            })
    },
    findById: (id, callback) => {
        sql.query(`SELECT diachi.*, loaidiachi.MaLoaiDiaChi 
            FROM diachidangvien, diachi, loaidiachi 
            WHERE diachidangvien.MaLoaiDiaChi = loaidiachi.MaLoaiDiaChi
            AND diachidangvien.MaDiaChi = diachi.MaDiaChi
            AND diachidangvien.MaSoDangVien = "${id}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("All: ", res);
                callback(null, { data: res });
            })
    },
    updateById: (id, newValue, callback) => {
        console.log(id, newValue.MaLoaiDiaChi);
        let newV = { ...newValue };
        delete newV.MaLoaiDiaChi;
        sql.query(`UPDATE diachi SET ?
            WHERE MaDiaChi = (
            SELECT MaDiaChi FROM diachidangvien
            WHERE MaSoDangVien = "${id}"
            AND MaLoaiDiaChi = "${newValue.MaLoaiDiaChi}"
            )`, newV,
            ((err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }

                if (res.affectedRows == 0) {
                    callback({ type: "not_found" }, null);
                    return;
                }
                console.log("Updated: ", newValue);
                callback(null, newValue);
            }))
    },
    remove: (id, callback) => {
        sql.query(`SELECT diachi.MaDiaChi
        FROM diachidangvien, diachi, loaidiachi 
        WHERE diachidangvien.MaLoaiDiaChi = loaidiachi.MaLoaiDiaChi
        AND diachidangvien.MaDiaChi = diachi.MaDiaChi
        AND diachidangvien.MaSoDangVien = "${id}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                let ids = res.map(el => el.MaDiaChi);
                const idsText = ids.join(",")
                console.log(idsText);
                sql.query(`DELETE FROM diachidangvien 
                    WHERE MaDiaChi IN (${idsText})
                `, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    sql.query(`DELETE FROM diachi 
                        WHERE MaDiaChi IN (${idsText})`,
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                callback(err, null);
                                return;
                            }
                            callback(null, res)
                        }
                    )
                })
            })
    }
}

module.exports = Address;