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
                    GROUP BY ${table}.${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(err, null);
                return;
            }
            console.log("All: ", res);
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
                console.log("Found: ", res);
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

exports.updateById = (table, key) => {
    return (id, newValue, callback) => {
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
            console.log("Updated: ", { [key]: id, ...newValue });
            callback(null, { [key]: id, ...newValue });
        }))
    }
}

exports.remove = (table, key) => {
    return (id, callback) => {
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