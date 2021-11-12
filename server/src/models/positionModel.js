const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Position = {
    getAll: (callback) => {
        sql.query(`SELECT chucvu.MaChucVu, chucvu.TenChucVu, count(chucvudangvien.MaChucVu) AS SoDangVien 
                FROM chucvu 
                LEFT JOIN chucvudangvien 
                INNER JOIN dangvien
                ON dangvien.MaSoDangVien = chucvudangvien.MaSoDangVien
                ON chucvu.MaChucVu=chucvudangvien.MaChucVu
                GROUP BY chucvu.MaChucVu`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("All: ", res);
            callback(null, { data: res, columnName: ["Mã Chức vụ", "Tên Chức vụ", "Số Đảng viên"] });
        })
    },
    findById: findById("chucvu", "MaChucVu"),
    create: create("chucvu", "MaChucVu"),
    updateById: updateById("chucvu", "MaChucVu"),
    remove: remove("chucvu", "MaChucVu"),
    removeAll: removeAll("chucvu")
}

module.exports = Position;