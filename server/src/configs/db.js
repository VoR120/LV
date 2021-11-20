const mysql = require('mysql2');
const fs = require('fs');

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quanlydangvien',
});
// conn.connect(err => {
//     if (err) {
//         throw err.stack;
//     }
//     else
//         console.log("Connect success!");
// })
// const sql = conn.promise()

module.exports = conn;
