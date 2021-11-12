const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quanlydangvien',
});
conn.connect(err => {
    if (err) {
        throw err.stack;
    }
    else
        console.log("Connect success!");
})

module.exports = conn;
