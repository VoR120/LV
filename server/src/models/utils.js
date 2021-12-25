const sql = require('../configs/db');

exports.zeroFill = (num) => {
    let Snum = "" + num
    const zero = "0000"
    let newNum = zero.slice(0, zero.length - Snum.length) + Snum;
    return newNum;
}

exports.getAll = (table, id, name, columnName) => {
    return (callback) => {
        sql.query(`SELECT ${table}.${id}, ${table}.${name}, count(dangvien.${id}) AS SoDangVien 
                    FROM ${table} 
                    LEFT JOIN dangvien 
                    ON ${table}.${id}=dangvien.${id}
                    AND dangvien.DaXoa = 0
                    GROUP BY ${table}.${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            // console.log("All: ", res);
            callback(null, { data: res, columnName });
        })
    }
}

exports.findById = (table, key) => {
    return (id, callback) => {
        const sqlQuery = typeof (id) === "number" ?
            `SELECT * FROM ${table} WHERE ${key} = ${id}` :
            `SELECT * FROM ${table} WHERE ${key} = "${id}"`
        sql.query(sqlQuery, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (res.length) {
                // console.log("Found: ", res);
                callback(null, res);
                return;
            }
            callback({ type: "not_found" }, null)
        })
    }
}

exports.create = (table, key) => {
    return (newValue, callback) => {
        sql.query(`INSERT INTO ${table} SET ?`, newValue, (err, res) => {
            if (err) {
                if (err.errno == 1062) {
                    callback({ type: "duplicated" }, null)
                    return;
                }
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("Created: ", { [key]: res.insertId, ...newValue });
            callback(null, { [key]: res.insertId, ...newValue, SoDangVien: 0 });
        })
    }
}

exports.updateById = (table, key, name) => {
    return (id, newValue, callback) => {
        console.log("id:", id);
        console.log("newvalue:", newValue);
        const sqlQuery = typeof (id) === "number" ?
            `UPDATE ${table} SET ? WHERE ${key} = ${id}` :
            `UPDATE ${table} SET ? WHERE ${key} = "${id}"`
        sql.query(sqlQuery, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            sql.query(`SELECT ${table}.${key}, ${table}.${name}, count(dangvien.${key}) AS SoDangVien 
                    FROM ${table}, dangvien 
                    WHERE ${table}.${key}=dangvien.${key}
                    AND dangvien.DaXoa = 0
                    AND ${table}.${key} = ${id}
                    `, (err, res1) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }
                console.log("Updated: ", res1[0]);
                callback(null, res1[0]);
            })
        }))
    }
}

exports.remove = (table, key, name) => {
    return (id, callback) => {
        const sqlQuerySelect = typeof (id) === "number" ?
            `SELECT MaSoDangVien FROM dangvien WHERE ${key} = ${id}` :
            `SELECT MaSoDangVien FROM dangvien WHERE ${key} = "${id}"`;
        sql.query(sqlQuerySelect, (err, result) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            if (result.length > 0) {
                callback({ type: 'foreign', message: `${name} này đang được sử dụng, không thể xóa!` }, null)
                return
            }
            const sqlQuery = typeof (id) === "number" ?
                `DELETE FROM ${table} WHERE ${key} = ${id}` :
                `DELETE FROM ${table} WHERE ${key} = "${id}"`;
            sql.query(sqlQuery, id, ((err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(err, null);
                    return;
                }

                if (res.affectedRows == 0) {
                    callback({ type: "not_found" }, null);
                    return;
                }

                console.log("Deleted: ", id);
                callback(null, res);
            }))
        })
    }
}

exports.removeAll = (table) => {
    return (callback) => {
        sql.query(`DELETE * FROM ${table}`, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }

            // if (res.affectedRows == 0) {
            //     callback({ type: "not_found" }, null);
            //     return;
            // }

            console.log("Deleted: ", id);
            callback(null, res);
        }))
    }
}

exports.getDate = (date) => {
    const offset = date.getTimezoneOffset()
    let newDate = new Date(date.getTime() - (offset * 60 * 1000))
    console.log(newDate.toISOString().split('T')[0]);
    return newDate.toISOString().split('T')[0]
}

exports.getGender = (gender) => {
    const genderObj = {
        "m": "Nam",
        "f": "Nữ",
        "u": "Khác",
    }
    return genderObj[gender];
}
