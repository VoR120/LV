const express = require('express');
const {
    getAllPartyMember,
    findByIdPartyMember,
    createPartyMember,
    updateByIdPartyMember,
    removePartyMember,
    removeAllPartyMember
} = require('../controllers/partyMemberCtrller');
const Router = express.Router();

Router.get('/partymember', getAllPartyMember);
Router.get('/partymember/:id', findByIdPartyMember);
Router.post('/partymember/create', createPartyMember);
Router.put('/partymember/:id', updateByIdPartyMember);
Router.delete('/partymember/:id', removePartyMember);
Router.delete('/partymember/removeall', removeAllPartyMember);

module.exports = Router;

// {
//     "HoTen": "Nguyễn Văn B",
//     "NgaySinh": "1999-10-10",
//     "QueQuan": "Cần Thơ",
//     "NgayVaoDang": "2017-12-12",
//     "NgayChinhThuc": "2018-12-12",
//     "MaChiBo": "0001",
//     "TrangThai": 1,
//     "SoDienThoai": "0123456781",
//     "Email": "bnguyen@gmail.com",
//     "Password": "123456",
//     "NoiSinh": "Cần Thơ",
//     "GioiTinh": "m",
//     "MaDanToc": "0002",
//     "MaTonGiao": "0003",
//     "TDHocVan": "12/12",
//     "CMND": "352434124",
//     "MaTinHoc": "0002",
//     "MaChinhTri": "0003"
// }