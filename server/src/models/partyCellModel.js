const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const PartyCell = {
    // getAll: getAll("chibo", "MaChiBo", "TenChiBo", ["Mã Chi bộ", "Tên chi bộ", "Số Đảng viên"]),
    getAll: (callback) => {
        const sqlPromise = sql.promise()
        sql.query(`SELECT chibo.MaChiBo, chibo.TenChiBo, count(dangvien.MaChiBo) AS SoDangVien
                    FROM chibo
                    LEFT JOIN dangvien 
                    ON chibo.MaChiBo=dangvien.MaChiBo
                    AND dangvien.DaXoa = 0
                    GROUP BY chibo.MaChiBo`, async (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            const result = [...res];
            await Promise.all(res.map(async (el, index) => {
                const [result1, f] = await sqlPromise.query(`
                    SELECT HoTen FROM dangvien 
                    WHERE MaChucVu = 1 
                    AND MaChiBo = ${el.MaChiBo}`)
                result[index].BiThu = result1.length > 0 ? result1[0].HoTen : "";
                const [result2, f2] = await sqlPromise.query(`
                    SELECT HoTen FROM dangvien 
                    WHERE MaChucVu = 2 
                    AND MaChiBo = ${el.MaChiBo}`)
                result[index].PhoBiThu = result2.length > 0 ? result2[0].HoTen : "";
            }))
            // console.log("All: ", result);
            callback(null, { data: result, columnName: ["Mã Chi bộ", "Tên chi bộ", "Bí thư", "Phó bí thư", "Số Đảng viên"] });
        })
    },
    findById: findById("chibo", "MaChiBo"),
    create: create("chibo", "MaChiBo"),
    updateById: updateById("chibo", "MaChiBo", "TenChiBo"),
    remove: remove("chibo", "MaChiBo", "Chi bộ"),
    removeAll: removeAll("chibo")
}

module.exports = PartyCell;