const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const PermissionPM = {
    getAll: async (callback) => {
        try {
            const sqlPromise = sql.promise();
            const [rows, fields] = await sqlPromise.execute(`SELECT MaChucVu, TenChucVu FROM chucvu`);
            let result = [];
            let idArr = [...rows];
            await Promise.all(idArr.map(async (el, index) => {
                result[index] = el;
                const [res, f] = await sqlPromise.execute(`SELECT MaQuyen, CoQuyen 
                    FROM quyenchucvu 
                    WHERE quyenchucvu.MaChucVu = ${el.MaChucVu}`)
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
            FROM quyenchucvu 
            WHERE quyenchucvu.MaChucVu = ${id}`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                if (res.length) {
                    let result = {};
                    res.map(e => {
                        result[e.MaQuyen] = e.CoQuyen
                    })
                    console.log("Found: ", { data: result });
                    callback(null, { data: result });
                    return;
                }
                callback({ type: "not_found" }, null)
            })
    },
    create: (newValue, callback) => {
        let { MaChucVu } = newValue
        sql.query(`INSERT INTO quyenchucvu 
            ( MaChucVu, MaQuyen, CoQuyen )
        VALUE
            ( ${MaChucVu}, 0001, 0 ),
            ( ${MaChucVu}, 0002, 0 ),
            ( ${MaChucVu}, 0003, 0 ),
            ( ${MaChucVu}, 0004, 0 ),
            ( ${MaChucVu}, 0005, 0 ),
            ( ${MaChucVu}, 0006, 0 ),
            ( ${MaChucVu}, 0007, 0 ),
            ( ${MaChucVu}, 0008, 0 ),
            ( ${MaChucVu}, 0009, 0 ),
            ( ${MaChucVu}, 0010, 0 ),
            ( ${MaChucVu}, 0011, 0 ),
            ( ${MaChucVu}, 0012, 0 )
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
        let isOne = [];
        let isZero = [];
        Object.keys(newValue).map(el => newValue[el] == 1 ? isOne.push(el) : isZero.push(el));
        console.log(isOne.join(", "), isZero);
        let isOneStr = isOne.length > 0 ? isOne.join(",") : '""';
        let isZeroStr = isZero.length > 0 ? isZero.join(",") : '""';
        sql.query(`UPDATE quyenchucvu 
                SET CoQuyen = 1
                WHERE MaChucVu = ${id}
                AND MaQuyen IN (${isOneStr})
            `, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            sql.query(`UPDATE quyenchucvu 
                    SET CoQuyen = 0
                    WHERE MaChucVu = ${id}
                    AND MaQuyen IN (${isZeroStr})`,
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        callback(err, null);
                        return;
                    }
                    console.log("Update", { data: newValue });
                    callback(null, { data: newValue })
                }
            )
        })
        // const sqlQuery = `UPDATE quyenchucvu 
        //     SET CoQuyen = ${newValue.CoQuyen} 
        //     WHERE MaChucVu = ${id}
        //     AND MaQuyen = ${newValue.MaQuyen}
        //     `
        // sql.query(sqlQuery, newValue, ((err, res) => {
        //     if (err) {
        //         console.log("error: ", err);
        //         callback(err, null);
        //         return;
        //     }
        //     if (res.affectedRows == 0) {
        //         callback({ type: "not_found" }, null);
        //         return;
        //     }
        //     console.log("Updated: ", { data: newValue });
        //     callback(null, { data: newValue });
        // }))
    },
    remove: remove("quyenchucvu", "MaSoDangVien"),
    removeAll: removeAll("quyenchucvu")
}

module.exports = PermissionPM;