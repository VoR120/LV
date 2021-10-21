const sql = require('../configs/db');
const { getAll, findById, updateById, removeAll, remove } = require('./utils');

const Grade = {
    getAll: (callback) => {
        sql.query(`SELECT * FROM loai`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }
            console.log("All: ", res);
            let yearArray = [];

            // Lấy năm không trùng
            res.forEach(el => {
                yearArray.includes(el.Nam) || yearArray.push(el.Nam)
            });
            let yearWithQuan = [];
            let max = 0;

            // Đếm số lượng loại theo năm
            yearArray.forEach(year => {
                let q = 0;
                res.forEach(el => {
                    el.Nam == year && q++
                })
                yearWithQuan.push({ Nam: year, quantity: q })
            })
            
            // Lấy số lượng lớn nhất
            yearWithQuan.forEach(y => {
                max = y.quantity > max ? y.quantity : max;
            })
            let result = [];
            yearWithQuan.forEach(el => {
                let obj = {};
                let arr = [];
                obj.Nam = el.Nam
                res.forEach(r => {
                    if (r.Nam == el.Nam) {
                        arr.push({ MaLoai: r.MaLoai, TenLoai: r.TenLoai })
                    }
                })
                obj.Data = arr
                result.push(obj);
            })
            let columnName = ["Năm"];
            for (let i = 1; i <= max; i++) {
                columnName.push(`Loại ${i}`);
            }
            callback(null, { data: result, columnName });
        })
    },
    findById: findById("loai", "MaLoai"),
    create: (newValue, callback) => {
        sql.query(`SELECT count(MaLoai) as isDuplicate FROM loai WHERE TenLoai = "${newValue["TenLoai"]}" AND Nam = "${newValue["Nam"]}" `,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(null, err);
                    return;
                }
                if (res[0].isDuplicate > 0) {
                    console.log(res[0].isDuplicate)
                    callback({ type: "duplicated" }, null)
                    return;
                }
                sql.query(`INSERT INTO loai SET ?`, newValue, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(null, err);
                        return;
                    }
                    console.log("Created: ", { ...newValue });
                    callback(null, { ...newValue });
                })
            })
    },
    updateById: updateById("loai", "MaLoai"),
    remove: remove("loai", "MaLoai"),
    removeAll: removeAll("loai")
}

module.exports = Grade;