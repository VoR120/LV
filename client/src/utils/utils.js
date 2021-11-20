import xlsx from 'xlsx'
import ActionMenu from '../component/ActionMenu';

export const downloadExcel = (rows) => {
    const workSheet = xlsx.utils.json_to_sheet(rows);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, "data")
    let buf = xlsx.write(workBook, { bookType: "xlsx", type: "buffer" })
    xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
    xlsx.writeFile(workBook, "DataExcel.xlsx")
}

export const getKeyField = (key) => {
    switch (key) {
        case 'ethnic':
            return ["MaDanToc", "TenDanToc", "SoDangVien"]
        case 'religion':
            return ["MaTonGiao", "TenTonGiao", "SoDangVien"]
        case 'position':
            return ["MaChucVu", "TenChucVu", "SoDangVien"]
        case 'term':
            return ["MaNhiemKy", "NamBatDau", "NamKetThuc"]
        case 'flanguage':
            return ["MaNgoaiNgu", "TenNgoaiNgu", "SoDangVien"]
        case 'it':
            return ["MaTinHoc", "TenTinHoc", "SoDangVien"]
        case 'politics':
            return ["MaChinhTri", "TenChinhTri", "SoDangVien"]
        case 'flanguagelevel':
            return ["MaTrinhDo", "TenTrinhDo", "TenNgoaiNgu"]
        case 'partycell':
            return ["MaChiBo", "TenChiBo", "SoDangVien"]
        case 'grade':
            return ["Nam", "Loai1", "Loai2", "Loai3", "Loai4", "Loai5", "Loai6", "Loai7"]
        default:
            break;
    }
}

export const getGender = (gender) => {
    const genderObj = {
        "m": "Nam",
        "f": "Nữ",
        "u": "Khác",
    }
    return genderObj[gender];
}

export const allInfoColumn = [
    { title: "Mã Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
    { title: "Họ tên", field: "HoTen", minWidth: 200 },
    { title: "Chi bộ", field: "TenChiBo", },
    { title: "Chức vụ", field: "TenChucVu", },
    { title: "CMND", field: "CMND", },
    { title: "Giới tính", field: "TenGioiTinh", },
    { title: "Ngày sinh", field: "NgaySinh", type: 'date' },
    { title: "Quê quán", field: "QueQuan", },
    { title: "Dân tộc", field: "TenDanToc", },
    { title: "Tôn giáo", field: "TenTonGiao", },
    { title: "Trình độ học vấn", field: "TrinhDoHocVan", },
    { title: "Ngoại ngữ", field: "NgoaiNguTrinhDo", },
    { title: "Trình độ tin học", field: "TenTinHoc", },
    { title: "Trình độ chính trị", field: "TenChinhTri", },
    { title: "Số điện thoại", field: "SoDienThoai", },
    { title: "Email", field: "Email", },
    { title: "Nghề nghiệp", field: "NgheNghiep", },
    { title: "Địa chỉ thường trú", field: "DiaChiThuongTru", },
    { title: "Nơi ở hiện tại", field: "NoiOHienTai", },
    { title: "Ngày vào Đoàn", field: "NgayVaoDoan", type: 'date' },
    { title: "Nơi vào Đoàn", field: "NoiVaoDoan", },
    { title: "Ngày vào Đảng lần đầu", field: "NgayVaoDang", type: 'date' },
    { title: "Ngày vào Đảng chính thức", field: "NgayChinhThuc", type: 'date' },
    { title: "Người giới thiệu", field: "NguoiGioiThieu", },
    {
        title: "Chức năng", field: "action", sorting: false,
        render: (params) => {
            return <ActionMenu data={params} />
        }
    },
]

export const getExportData = (rows, columns) => {
    const headers = columns.map(el => el.field);
    const newRows = rows.map(el => {
        let newEl = {};
        Object.keys(el).map(key => {
            if (headers.includes(key))
                newEl[key] = el[key]
        })
        return newEl;
    })
    return newRows
}