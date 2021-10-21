import xlsx from 'xlsx'

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
        case 'flanguage':
            return ["MaNgoaiNgu", "TenNgoaiNgu", "SoDangVien"]
        case 'it':
            return ["MaTinHoc", "TenTinHoc", "SoDangVien"]
        case 'politics':
            return ["MaChinhTri", "TenChinhTri", "SoDangVien"]
        case 'flanguagelevel':
            return ["MaTrinhDo", "TenTrinhDo", "TenNgoaiNgu"]
        case 'partycell':
            return ["MaChiBo", "TenChiBo", "TenNgoaiNgu"]
        case 'grade':
            return ["Nam", "Loai1", "Loai2", "Loai3", "Loai4", "Loai5", "Loai6", "Loai7"]
        default:
            break;
    }
}
