const sql = require('../configs/db');

const PartyCell = {
    getAll: (callback) => {
        sql.query("SELECT * FROM chibo", (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }

            console.log("All: ", res);
            callback(null, res);
        })
    },
    findById: (id, callback) => {
        sql.query("SELECT * FROM chibo WHERE MaChiBo = ?", [id], (err, res) => {
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
    },
    create: (newPC, callback) => {
        console.log(newPC);
        sql.query("INSERT INTO chibo SET ?", newPC, (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }
            console.log(res);

            console.log("Created: ", { id: res.MaChiBo, ...newPC });
            callback(null, { id: res.MaChiBo, ...newPC });
        })
    },
    updateById: (id, newPC, callback) => {
        console.log(newPC, id)
        sql.query(`UPDATE chibo SET ? WHERE MaChiBo = ${id}`, newPC, ((err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                callback({ type: "not_found" }, null);
                return;
            }

            console.log("Updated: ", { id, ...newPC });
            callback(null, { id, ...newPC });
        }))
    },
    delete: (id, callback) => {
        sql.query("DELETE FROM chibo WHERE MaChiBo = ?", id, ((err, res) => {
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
    },
    deleteAll: (callback) => {
        sql.query("DELETE * FROM chibo", ((err, res) => {
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

module.exports = PartyCell;