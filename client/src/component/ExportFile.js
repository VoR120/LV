import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { getLocaleDate, pdfmakedownload } from '../utils/utils';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    icon: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
        fontSize: '1.2rem'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
}))

const ExportFile = ({ data , button }) => {
    const classes = useStyles();

    var dd = {
        content: [
            {
                columns: [
                    {
                        text: [
                            'ĐẢNG BỘ ĐẠI HỌC CẦN THƠ \n',
                            'CHI BỘ KHOA CNTT&TT'
                        ]
                    },
                    [
                        {
                            text: 'ĐẢNG CỘNG SẢN VIỆT NAM \n',
                            alignment: 'center'
                        },
                        {
                            text: `Ninh Kiều, ngày ${(new Date()).getDate()} tháng ${(new Date()).getMonth() + 1} năm ${(new Date()).getFullYear()} \n`,
                            alignment: 'right'
                        }
                    ]
                ],
            },
            {
                text: 'SƠ YẾU LÍ LỊCH ĐẢNG VIÊN \n',
                alignment: 'center',
                style: 'header',
                bold: true,
                margin: [0, 24, 0, 0]
            },
            {
                style: 'content',
                columns: [
                    {
                        style: 'tableExample',
                        table: {
                            widths: [80],
                            heights: [106.66667],
                            body: [['']]
                        },
                        width: 120
                    },
                    {
                        columns: [
                            {
                                text: [
                                    `Họ tên: ${data.HoTen} \n\n`,
                                    `Ngày sinh: ${getLocaleDate(data.NgaySinh)} \n\n`,
                                    `CMND: ${data.CMND} \n\n`,
                                    `Dân tộc: ${data.TenDanToc} \n\n`,
                                ],
                            },
                            {
                                text: [
                                    `Giới tính: ${data.TenGioiTinh} \n\n`,
                                    `Nơi sinh: ${data.NoiSinh} \n\n`,
                                    `Quốc tịch: ${data.QuocTich} \n\n`,
                                    `Tôn giáo: ${data.TenTonGiao} \n\n`
                                ],
                            }
                        ],

                        widths: '*',
                        margin: [0, 5, 0, 0]
                    }
                ]
            },
            {
                text: [
                    `Quê quán: ${data.QueQuan} \n\n`,
                    `Địa chỉ thường trú: ${data.DiaChiThuongTru} \n\n`,
                    `Nơi ở hiện tại: ${data.NoiOHienTai} \n\n`,
                ]
            },
            {
                columns: [
                    {
                        text: [
                            `Chi bộ: CNTT&TT \n\n`,
                            `Trình độ tin học: Sơ cấp \n\n`,
                        ],
                    },
                    {
                        text: [
                            `Trình độ học vấn: 12/12 \n\n`,
                            `Trình độ chính trị: Sơ cấp \n\n`,
                        ],
                        width: 210
                    }
                ],

            },
            {
                text: `Ngoại ngữ - Trình độ: ${data.NgoaiNguTrinhDo} \n\n`
            },
            {
                columns: [
                    {
                        text: [
                            `Ngày vào Đoàn: ${getLocaleDate(data.NgayVaoDoan)} \n\n`,
                            `Ngày vào Đảng lần đầu: ${getLocaleDate(data.NgayVaoDang)} \n\n`,
                            `Ngày vào Đảng chính thức: ${getLocaleDate(data.NgayChinhThuc)} \n\n`,
                            `Số thẻ: ${data.SoThe} \n\n`,
                        ],
                    },
                    {
                        text: [
                            `Nơi vào Đoàn: ${data.NoiVaoDoan} \n\n`,
                            `Nơi vào Đảng lần đầu: ${data.NoiVaoDangLanDau} \n\n`,
                            `Nơi vào Đảng chính thức: ${data.NoiVaoDangChinhThuc} \n\n`,
                            `Người giới thiệu: ${data.NguoiGioiThieu || ""}\n\n`,
                        ],
                        width: 210
                    }
                ],

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
            }
        }

    }

    const handleDownLoad = () => {
        pdfmakedownload(dd);
    }

    return (
        <>
            {
                button
                    ?
                    <MyButton onClick={handleDownLoad} style={{ marginLeft: 8 }} success>Xuất hồ sơ</MyButton>
                    :
                    <div onClick={handleDownLoad} className={classes.iconWrapper} >
                        <FileDownloadOutlinedIcon className={classes.icon} />Xuất hồ sơ
                    </div>
            }
        </>
    );
};

export default ExportFile;