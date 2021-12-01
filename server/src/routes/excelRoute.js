const express = require('express');
const Router = express.Router();
const upload = require('../configs/multer');
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const path = require('path');
const sql = require('../configs/db');

function importExcelData2MySQL(filePath) {
    readXlsxFile(filePath).then((rows) => {  
        console.log(rows);
        rows.shift();
        sql.query(`INSERT INTO dantoc (MaDanToc, TenDanToc) VALUES ?`, [rows],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
            })
    })
}

Router.get('/', (req, res) => {
    console.log("_basedir" + path.join(path.dirname(__dirname)));
    res.sendFile(__dirname + "index.html");
})
Router.post('/file/upload', upload.single("file"), (req, res) => {

    readXlsxFile(path.join(path.dirname(__dirname)) + '/uploads/' + req.file.filename).then((rows) => {  
        console.log(rows);
        rows.shift();
        sql.query(`INSERT INTO dantoc (MaDanToc, TenDanToc) VALUES ?`, [rows],
            (err, result) => {
                if (err) {
                    if(err.errno == 1062) {
                        res.status(400).json({ msg: "Có mã trùng lặp!" });
                        return;
                    }
                    console.log(err);
                    res.status(400).json({ err });
                    return;
                }
                res.status(200).json({ msg: "Upload thành công!" })
                return;
            })
    })

    console.log(res);
});

Router.get('/file')

module.exports = Router;