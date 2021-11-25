const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const Position = {
    getAll: getAll("chucvu", "MaChucVu", "TenChucVu", ["Mã Chức vụ", "Tên Chức vụ", "Số Đảng viên"]),
    findById: findById("chucvu", "MaChucVu"),
    create: create("chucvu", "MaChucVu"),
    updateById: updateById("chucvu", "MaChucVu"),
    remove: (id, callback) => {
        try {
            sql.query(`SELECT MaSoDangVien FROM dangvien WHERE MaChucVu = ${id}`, (err, result) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                if (result.length > 0) {
                    callback({ type: 'foreign', message: `Chức vụ này đang được sử dụng, không thể xóa!` }, null)
                    return
                }

                sql.query(`DELETE FROM quyenchucvu WHERE MaChucVu = ${id}`,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            callback(err, null);
                            return;
                        }
                        sql.query(`DELETE FROM chucvu WHERE MaChucVu = ${id}`, id, ((err, res1) => {
                            if (err) {
                                console.log("error: ", err);
                                callback(err, null);
                                return;
                            }

                            if (res1.affectedRows == 0) {
                                callback({ type: "not_found" }, null);
                                return;
                            }

                            console.log("Deleted: ", id);
                            callback(null, res);
                        }))
                    }
                )
            })
        } catch (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }
    },
    removeAll: removeAll("chucvu")
}

module.exports = Position;