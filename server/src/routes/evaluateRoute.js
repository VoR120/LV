const express = require('express');
const { createEvaluate, getByPartyMember, getBySubject, getEvaluated } = require('../controllers/evaluateCtrller');

const Router = express.Router();

Router.get('/evaluate/getbypm', getByPartyMember);
Router.get('/evaluate/getbysubject', getBySubject);
Router.get('/evaluate/getevaluated', getEvaluated);
Router.post('/evaluate/create', createEvaluate);

module.exports = Router;

// const sql = require('../configs/db');

// exports.getByPartyMember = (req, res) => {
//     try {
//         const { Nam, MaSoDangVien } = req.query;
//         sql.query(`SELECT *
//             FROM danhgiadangvien
//             WHERE MaSoDangVien = "${MaSoDangVien}"
//             AND Nam = ${Nam}
//         `,
//             (err, result) => {
//                 if (err) {
//                     res.status(500).json({ msg: err.message })
//                     return;
//                 }
//                 res.status(200).json(result)
//             }
//         )
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

// exports.getBySubject = (req, res) => {
//     try {
//         const { Nam, MaChiBo } = req.query;
//         sql.query(`SELECT dangvien.MaSoDangVien
//             FROM dangvien, chibo 
//             WHERE dangvien.MaChiBo = chibo.MaChiBo AND chibo.MaChiBo = "1"
//         `, (err, result) => {
//             if (err) {
//                 res.status(500).json({ msg: err.message })
//                 return;
//             }
//             sql.query(`SELECT dg.* 
//                 FROM danhgiadangvien dg 
//                 WHERE dg.MaSoDangVien IN (
//                 SELECT dangvien.MaSoDangVien FROM dangvien, chibo WHERE dangvien.MaChiBo = chibo.MaChiBo
//                 AND chibo.MaChiBo = ${MaChiBo}
//                 ) AND dg.Nam = ${Nam}`,
//                 (err, result1) => {
//                     if (err) {
//                         res.status(500).json({ msg: err.message })
//                         return;
//                     }
//                     const list = result.map(el => {
//                         el.DanhGiaCaNhan = "";
//                         el.DanhGiaBoMon = "";
//                         el.DanhGiaKhoa = "";
//                         result1.map(r => {
//                             if (r.MaSoDangVien == el.MaSoDangVien) {
//                                 el.DanhGiaCaNhan = r.MaDVDG == 1 ? r.MaLoai : "";
//                                 el.DanhGiaBoMon = r.MaDVDG == 2 ? r.MaLoai : "";
//                                 el.DanhGiaKhoa = r.MaDVDG == 3 ? r.MaLoai : "";
//                             }
//                         })
//                         return el;
//                     })
//                     res.status(200).json(list);
//                 }
//             )
//         })
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

// exports.getByDepartment = (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }

// exports.createEvaluate = (req, res) => {
//     try {
//         console.log()
//         const { Nam, MaSoDangVien, MaDVDG, MaLoai } = req.body
//         sql.query(`SELECT *
//         FROM danhgiadangvien
//         WHERE MaSoDangVien = "${MaSoDangVien}"
//         AND Nam = ${Nam}
//         AND MaDVDG = ${MaDVDG}`,
//             (err, result) => {
//                 if (err) {
//                     res.status(500).json({ msg: err.message })
//                     return;
//                 }
//                 if (result.length) {
//                     sql.query(`UPDATE danhgiadangvien SET MaLoai = ${MaLoai}
//                     WHERE MaSoDangVien = "${MaSoDangVien}"
//                     AND Nam = ${Nam}
//                     AND MaDVDG = ${MaDVDG}
//                     `,
//                         (err, result1) => {
//                             if (err) {
//                                 res.status(500).json({ msg: err.message })
//                                 return;
//                             }
//                             console.log("Updated!")
//                             res.status(201).json(req.body)
//                             return;
//                         })
//                 } else {
//                     console.log(req.body);
//                     sql.query(`INSERT INTO danhgiadangvien SET ?`, req.body,
//                         (err, result2) => {
//                             if (err) {
//                                 console.log(err);
//                                 res.status(500).json({ msg: err.message })
//                                 return;
//                             }
//                             console.log("Created!")
//                             res.status(201).json(req.body)
//                             return;
//                         }
//                     )
//                 }
//             })
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// }
