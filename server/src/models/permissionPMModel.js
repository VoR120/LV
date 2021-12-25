const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const PermissionPM = {
    getAll: async (callback) => {
        try {
            const sqlPromise = sql.promise();
            const [rows, fields] = await sqlPromise.query(`SELECT MaChucVu, TenChucVu FROM chucvu`);
            let result = [];
            let idArr = [...rows];
            await Promise.all(idArr.map(async (el, index) => {
                result[index] = el;
                const [res, f] = await sqlPromise.query(`SELECT MaQuyen, CoQuyen 
                    FROM quyendangvien 
                    WHERE quyendangvien.MaSoDangVien = ${el.MaChucVu}`)
                if (res.length) {
                    res.map(e => {
                        result[index] = { ...result[index], [e.MaQuyen]: e.CoQuyen }
                    })
                }
            }))
            callback(null, result);
        } catch (error) {
            callback(error, null)
        }
    },
    findById: (id, callback) => {
        sql.query(`SELECT MaQuyen, CoQuyen 
            FROM quyendangvien 
            WHERE quyendangvien.MaSoDangVien = "${id}"`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                let result = {};
                if (res.length > 0)
                    res.map(e => {
                        result[e.MaQuyen] = e.CoQuyen
                    })
                // console.log("Found: ", { data: result });
                callback(null, { data: result });
                return;
            })
    },
    create: (newValue, callback) => {
        let { MaSoDangVien } = newValue
        sql.query(`INSERT INTO quyendangvien 
            ( MaSoDangVien, MaQuyen, CoQuyen )
        VALUE
            ( ${MaSoDangVien}, 0001, 0 ),
            ( ${MaSoDangVien}, 0002, 0 ),
            ( ${MaSoDangVien}, 0003, 0 ),
            ( ${MaSoDangVien}, 0004, 0 ),
            ( ${MaSoDangVien}, 0005, 0 ),
            ( ${MaSoDangVien}, 0006, 0 ),
            ( ${MaSoDangVien}, 0007, 0 ),
            ( ${MaSoDangVien}, 0008, 0 ),
            ( ${MaSoDangVien}, 0009, 0 ),
            ( ${MaSoDangVien}, 0010, 0 ),
            ( ${MaSoDangVien}, 0011, 0 ),
            ( ${MaSoDangVien}, 0012, 0 ),
            ( ${MaSoDangVien}, 0013, 0 ),
            ( ${MaSoDangVien}, 0014, 0 ),
            ( ${MaSoDangVien}, 0015, 0 ),
        `, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("Created: ", { data: newValue });
            callback(null, { data: newValue });
        })
    },
    updateById: async (id, newValue, callback) => {
        const sqlPromise = sql.promise();
        let isOne = [];
        let isZero = [];
        Object.keys(newValue).map(el => newValue[el] == 1 ? isOne.push(el) : isZero.push(el));
        console.log(isOne.join(", "), isZero);
        let isOneStr = isOne.length > 0 ? isOne.join(",") : '""';
        let isZeroStr = isZero.length > 0 ? isZero.join(",") : '""';

        const [result, f] = await sqlPromise.query(`SELECT * FROM quyendangvien WHERE MaSoDangVien = "${id}"`);
        if (result.length > 0) {
            const [result1, f1] = await sqlPromise.query(`UPDATE quyendangvien 
            SET CoQuyen = 1
            WHERE MaSoDangVien = "${id}"
            AND MaQuyen IN (${isOneStr})`)
            const [result2, f2] = await sqlPromise.query(`UPDATE quyendangvien 
            SET CoQuyen = 0
            WHERE MaSoDangVien = "${id}"
            AND MaQuyen IN (${isZeroStr})`)
            const result3 = await Promise.all([result1, result2])
            if (result3) {
                console.log(result3);
                console.log("Update", { data: newValue });
                callback(null, { data: newValue })
                return;
            }
        } else {
            await Promise.all(isOne.map(async (el, index) => {
                await sqlPromise.query(`INSERT INTO quyendangvien
                    SET CoQuyen = 1, MaQuyen = ${el}, MaSoDangVien = "${id}"
                `)
            }))
            await Promise.all(isZero.map(async (el, index) => {
                await sqlPromise.query(`INSERT INTO quyendangvien
                    SET CoQuyen = 1, MaQuyen = ${el}, MaSoDangVien = "${id}"
                `)
            }))
            console.log("Add", { data: newValue });
            callback(null, { data: newValue })
            return;
        }

    },
    remove: remove("quyenchucvu", "MaSoDangVien"),
    removeAll: removeAll("quyenchucvu")
}

module.exports = PermissionPM;