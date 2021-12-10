import { getLocaleDate, getLocaleDateTime } from "./utils"

const exportDD = (body, title, pageOrientation = "portrait") => {
    return {
        pageOrientation: pageOrientation,
        content: [
            {
                columns: [
                    {
                        text: [
                            'ĐẢNG BỘ ĐẠI HỌC CẦN THƠ \n',
                            'CHI BỘ KHOA CNTT&TT'
                        ],
                        alignment: 'center'
                    },
                    {
                        text: [
                        ],
                    },
                    [
                        {
                            text: 'ĐẢNG CỘNG SẢN VIỆT NAM \n',
                            alignment: 'center'
                        },
                        {
                            text: `Ninh Kiều, ngày ${(new Date()).getDate()} tháng ${(new Date()).getMonth() + 1} năm ${(new Date()).getFullYear()} \n`,
                            alignment: 'center'
                        }
                    ]
                ],
            },
            {
                text: `${title} \n`,
                alignment: 'center',
                style: 'header',
                bold: true,
                margin: [0, 24, 0, 24]
            },
            {
                style: 'tableExample',
                color: '#222',
                table: {
                    // widths: ['auto', 'auto', 'auto'],
                    headerRows: 2,
                    // keepWithHeaderRows: 1,
                    widths: body.widths,
                    body: body.body
                }
            },
        ],
        styles: {
            header: {
                fontSize: 14,
                alignment: 'justify'
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            content: {
                margin: [0, 30, 0, 0],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }

    }
}

export const partyMemberPDF = (data, title = "DANH SÁCH ĐẢNG VIÊN") => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Giới tính', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Ngày sinh', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Nơi sinh', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Ngày vào Đảng', style: 'tableHeader', alignment: 'center', colSpan: 2 },
                { text: "" },
                { text: 'Nơi vào Đảng', style: 'tableHeader', alignment: 'center', colSpan: 2 },
                { text: "" },
                { text: 'Số thẻ', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Chức vụ', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Dân tộc', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                { text: 'Tôn giáo', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            ],
            ['', '', '', "", "", "", { text: "Lần đầu", style: 'tableHeader' }, { text: "Chính thức", style: 'tableHeader' }, { text: "Lần đầu", style: 'tableHeader' }, { text: "Chính thức", style: 'tableHeader' }, "", "", "", ""],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.TenGioiTinh,
            getLocaleDate(el.NgaySinh), el.NoiSinh, getLocaleDate(el.NgayVaoDang), getLocaleDate(el.NgayChinhThuc), el.NoiVaoDangLanDau, el.NoiVaoDangChinhThuc, el.SoThe, el.TenChucVu, el.TenDanToc, el.TenTonGiao])
    })

    return exportDD(body, title, "landscape")
}

export const gradePDF = (data, title) => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Chi bộ', style: 'tableHeader', alignment: 'center', },
                { text: 'Loại', style: 'tableHeader', alignment: 'center', },
                { text: 'Năm', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.TenChiBo, el.TenLoai, el.Nam
        ])
    })

    return exportDD(body, title)
}

export const moveOutPDF = (data, title) => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Hình thức', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển từ', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển đến', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày chuyển đi', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày chuyển về', style: 'tableHeader', alignment: 'center', },
                { text: 'Ghi chú', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.TenHinhThuc,
            "Đảng bộ " + el.ChuyenTuDangBo + ", chi bộ " + el.TenChiBoTu,
            "Đảng bộ " + el.ChuyenDenDangBo + ", chi bộ " + el.TenChiBoDen,
            getLocaleDate(el.NgayChuyenDi), el.NgayChuyenDen ? getLocaleDate(el.NgayChuyenDen) : "", el.GhiChu
        ])
    })

    return exportDD(body, title)
}

export const moveInPDF = (data, title) => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto',],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Hình thức', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển từ', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển đến', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày chuyển đến', style: 'tableHeader', alignment: 'center', },
                { text: 'Ghi chú', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.TenHinhThuc,
            "Đảng bộ " + el.ChuyenTuDangBo + ", chi bộ " + el.TenChiBoTu,
            "Đảng bộ " + el.ChuyenDenDangBo + ", chi bộ " + el.TenChiBoDen,
            getLocaleDate(el.NgayChuyenDen), el.GhiChu
        ])
    })

    return exportDD(body, title)
}

export const moveInternalPDF = (data, title) => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto',],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Hình thức', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển từ', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển đến', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày chuyển', style: 'tableHeader', alignment: 'center', },
                { text: 'Ghi chú', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.TenHinhThuc,
            "Đảng bộ " + el.ChuyenTuDangBo + ", chi bộ " + el.TenChiBoTu,
            "Đảng bộ " + el.ChuyenDenDangBo + ", chi bộ " + el.TenChiBoDen,
            getLocaleDate(el.NgayChuyenDi), el.GhiChu
        ])
    })

    return exportDD(body, title)
}

export const movePDF = (data, title) => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Loại', style: 'tableHeader', alignment: 'center', },
                { text: 'Hình thức', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển từ', style: 'tableHeader', alignment: 'center', },
                { text: 'Chuyển đến', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày chuyển đi', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày chuyển đến/về', style: 'tableHeader', alignment: 'center', },
                { text: 'Ghi chú', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.LoaiHinhThuc, el.TenHinhThuc,
            "Đảng bộ " + el.ChuyenTuDangBo + ", chi bộ " + el.TenChiBoTu,
            "Đảng bộ " + el.ChuyenDenDangBo + ", chi bộ " + el.TenChiBoDen,
            el.NgayChuyenDi ? getLocaleDate(el.NgayChuyenDi) : "", el.NgayChuyenDen ? getLocaleDate(el.NgayChuyenDen) : "", el.GhiChu
        ])
    })

    return exportDD(body, title)
}

export const rewardPDF = (data, title) => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto',],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Tên khen thưởng', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày khen thưởng', style: 'tableHeader', alignment: 'center', },
                { text: 'Hình thức', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.TenKhenThuong, getLocaleDate(el.NgayKhenThuong), el.HinhThuc
        ])
    })

    return exportDD(body, title)
}

export const disciplinePDF = (data, title) => {
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto',],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Tên kỷ luật', style: 'tableHeader', alignment: 'center', },
                { text: 'Ngày kỷ luật', style: 'tableHeader', alignment: 'center', },
                { text: 'Hình thức', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.TenKyLuat, getLocaleDate(el.NgayKyLuat), el.HinhThuc
        ])
    })

    return exportDD(body, title)
}

export const partycellPDF = (data, title) => {
    let body = {
        widths: ['auto', 'auto', '*', '*', 'auto', 'auto',],
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã chi bộ', style: 'tableHeader', alignment: 'center', },
                { text: 'Tên chi bộ', style: 'tableHeader', alignment: 'center', },
                { text: 'Bí thư', style: 'tableHeader', alignment: 'center', },
                { text: 'Phó bí thư', style: 'tableHeader', alignment: 'center', },
                { text: 'Số Đảng viên', style: 'tableHeader', alignment: 'center', },
            ],
        ]
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.MaChiBo, el.TenChiBo, el.BiThu, el.PhoBiThu, el.SoDangVien
        ])
    })

    return exportDD(body, title)
}

export const votingResultPDF = (data, result, noVoting) => {
    console.log(data)
    console.log(result)

    const { TenBieuQuyet, NoiDung, ThoiGianBatDau, ThoiGianKetThuc, UngCuVien, NguoiThamGia } = result
    let body = {
        widths: ['auto', '*', 'auto', 'auto', 'auto'],
        // keepWithHeaderRows: 1,
        body: [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center', },
                { text: 'Họ tên', style: 'tableHeader', alignment: 'center', },
                { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', },
                { text: 'Số phiếu', style: 'tableHeader', alignment: 'center', },
                { text: 'Tỉ lệ phiếu', style: 'tableHeader', alignment: 'center', },

            ],
        ],
    }

    data.map((el, index) => {
        body.body.push([
            index + 1, el.HoTen, el.MaSoDangVien, el.SoPhieu, el.TiLe
        ])
    })

    return {
        content: [
            {
                columns: [
                    {
                        text: [
                            'ĐẢNG BỘ ĐẠI HỌC CẦN THƠ \n',
                            'CHI BỘ KHOA CNTT&TT'
                        ],
                        alignment: 'center',
                        margin: [0, 0, 30, 20]
                    },
                    [
                        {
                            text: 'ĐẢNG CỘNG SẢN VIỆT NAM \n',
                            alignment: 'center',
                            margin: [30, 0, 0, 0]
                        },
                        {
                            text: `Ninh Kiều, ngày ${(new Date()).getDate()} tháng ${(new Date()).getMonth() + 1} năm ${(new Date()).getFullYear()} \n`,
                            alignment: 'center',
                            italics: true,
                            margin: [30, 0, 0, 0],
                        },
                    ]
                ],
            },
            {
                text: 'KẾT QUẢ BIỂU QUYẾT \n',
                alignment: 'center',
                style: 'header',
                bold: true,
            },
            {
                text: `${TenBieuQuyet} \n`,
                alignment: 'center',
                bold: true,
                fontSize: 15,
                margin: [0, 10, 0, 20]
            },
            {
                text: `Cuộc biểu quyết bắt đầu vào ${getLocaleDateTime(ThoiGianBatDau)} và kết thúc vào ${getLocaleDateTime(ThoiGianKetThuc)}`
            },
            {
                text: `Nội dung: ${NoiDung}`
            },
            {
                text: "1. Thống kê",
                style: 'header1'
            },
            {
                text: [
                    `Số ứng cử viên: ${UngCuVien.length} \n`,
                    `Số người tham gia biểu quyết: ${NguoiThamGia.length} \n`,
                    `Số người không biểu quyết: ${noVoting} \n `,
                    `Tỉ lệ người tham gia biểu quyết: ${(NguoiThamGia.length - noVoting) / NguoiThamGia.length * 100}%`
                ]
            },
            {
                text: "2. Kết quả",
                style: 'header1'
            },
            {
                text: "(Kết quả được săp xếp theo số lượng phiếu bầu)."
            },
            {
                style: 'tableExample',
                color: '#222',
                table: {
                    headerRows: 2,
                    widths: body.widths,
                    // keepWithHeaderRows: 1,
                    body: body.body
                }
            },
        ],
        styles: {
            header: {
                fontSize: 16,
                alignment: 'justify'
            },
            tableExample: {
                margin: [0, 5, 0, 15],
            },
            content: {
                margin: [0, 30, 0, 0],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            header1: {
                margin: [0, 10, 0, 0],
                bold: true
            }
        },
        defaultStyle: {
            fontSize: 13,
            lineHeight: 1.3
        }

    }

}