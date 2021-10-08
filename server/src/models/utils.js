const sql = require('../configs/db');

const zeroFill = (num) => {
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
                callback(null, err);
                return;
            }
            console.log("All: ", res);
            callback(null, { data: res, columnName });
        })
    }
}

exports.findById = (table, key) => {
    return (id, callback) => {
        sql.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
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

exports.create = (table) => {
    return (newValue, callback) => {
        sql.query(`INSERT INTO ${table} SET ?`, newValue, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }
            console.log("Created: ", { id: zeroFill(res.insertId), ...newValue });
            callback(null, { id: zeroFill(res.insertId), ...newValue });
        })
    }
}

exports.updateById = (table, key) => {
    return (id, newValue, callback) => {
        sql.query(`UPDATE ${table} SET ? WHERE ${key} = ${id}`, newValue, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }
            console.log("Updated: ", { id, ...newValue });
            callback(null, { id, ...newValue });
        }))
    }
}

exports.remove = (table, key) => {
    return (id, callback) => {
        sql.query(`DELETE FROM ${table} WHERE ${key} = ?`, id, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
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
                callback(null, err);
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
