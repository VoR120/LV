const { getAll, findById, create, updateById, removeAll, remove } = require('./utils');
const sql = require('../configs/db');

const fLpM = {
    getAll: (callback) => {
        sql.query(`SELECT * FROM ngoaingudangvien`,
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    callback(null, err);
                    return;
                }
                console.log("All: ", res);
                callback(null, { data: res });
            })
    },
    findById: findById("ngoaingudangvien", "MaDangVien"),
    create: create("ngoaingudangvien"),
    updateById: updateById("ngoaingudangvien", "MaDangVien"),
    remove: remove("ngoaingudangvien", "MaDangVien"),
    removeAll: removeAll("ngoaingudangvien")
}

module.exports = fLpM;