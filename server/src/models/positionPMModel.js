const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const PositionPM = {
    getAll: getAll("chucvu", "MaChucVu", "TenChucVu", ["Mã Chức vụ", "Tên Chức vụ", "Số Đảng viên"]),
    findById: findById("chucvu", "MaSoDangVien"),
    create: (newValue, callback) => {
        sql.query(`SELECT * FROM chucvudangvien 
            WHERE MaSoDangVien = "${newValue.MaSoDangVien}"
            AND MaChucVu = ${newValue.MaChucVu}
        `,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                if (res.length > 0) {
                    callback({ type: "duplicated" }, null)
                    return;
                }
                sql.query(`INSERT INTO chucvudangvien SET ?`, newValue, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    sql.query(`SELECT chucvudangvien.*, chucvu.TenChucVu 
                    FROM chucvudangvien, chucvu
                    WHERE chucvudangvien.MaChucVu = chucvu.MaChucVu
                    AND chucvudangvien.MaSoDangVien = "${newValue.MaSoDangVien}"
                    `, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            callback(err, null);
                            return;
                        }
                        console.log("Created: ", { data: res });
                        callback(null, { data: res });
                    })
                })
            })
    },
    updateById: updateById("chucvu", "MaSoDangVien"),
    remove: remove("chucvu", "MaSoDangVien"),
    removeAll: removeAll("chucvu")
}

module.exports = PositionPM;