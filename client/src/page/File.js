import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import xlsx from 'xlsx';
import { getAllPartyMember } from '../action/infoAction';
import ActionMenu from '../component/ActionMenu';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';


const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px',
    },
    editBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.info.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.info.dark
        },
    },
}))

const File = () => {
    const classes = useStyles();

    const [rows, setRows] = useState([])

    const [columns] = useState([
        { title: "Mã Đảng viên", field: "MaDangVien", maxWidth: 150 },
        { title: "Họ tên", field: "HoTen", minWidth: 200 },
        { title: "Chi bộ", field: "TenChiBo", },
        { title: "Giới tính", field: "GioiTinh", },
        { title: "Ngày sinh", field: "NgaySinh", type: 'date' },
        { title: "Quê quán", field: "QueQuan", },
        { title: "Dân tộc", field: "DanToc", },
        { title: "Tôn giáo", field: "TonGiao", },
        { title: "Trình độ học vấn", field: "TDHocVan", },
        { title: "Ngoại ngữ", field: "MaNgoaiNgu", },
        { title: "Trình độ ngoại ngữ", field: "MaTrinhDo", },
        { title: "Trình độ tin học", field: "MaTinHoc", },
        { title: "Trình độ chính trị", field: "MaChinhTri", },
        { title: "Số điện thoại", field: "SoDienThoai", },
        { title: "Email", field: "Email", },
        { title: "Nghề nghiệp", field: "NgheNghiep", },
        { title: "Địa chỉ thường trú", field: "DiaChiThuongTru", },
        { title: "Nơi ở hiện tại", field: "NoiOHienTai", },
        { title: "Ngày vào Đoàn", field: "NgayVaoDoan", type: 'date'},
        { title: "Nơi vào Đoàn", field: "NoiVaoDoan", },
        { title: "Ngày vào Đảng lần đầu", field: "NgayVaoDang", type: 'date' },
        { title: "Ngày vào Đảng chính thức", field: "NgayChinhThuc", type: 'date' },
        { title: "Người giới thiệu", field: "NguoiGioiThieu", },
        {
            title: "Chức năng", field: "action", sorting: false,
            render: (params) => {
                console.log(params);
                return <ActionMenu data={params} />
            }
        },
    ])

    const downloadExcel = () => {
        const workSheet = xlsx.utils.json_to_sheet(rows);
        const workBook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workBook, workSheet, "data")
        let buf = xlsx.write(workBook, { bookType: "xlsx", type: "buffer" })
        xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
        xlsx.writeFile(workBook, "DataExcel.xlsx")
    }

    useEffect(() => {
        const getAll = async () => {
            const res = await getAllPartyMember();
            console.log(res);
            setRows(res)
        }
        getAll();
    }, [])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Hồ sơ Đảng viên
                    </Typography>
                </div>
                <AddForm data={rows} />
                <TableContainer style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={"Hồ sơ Đảng viên"}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense'
                        }}
                        actions={[
                            {
                                icon: () => <DownloadIcon />,
                                tooltip: "Export to excel",
                                onClick: () => downloadExcel(),
                                isFreeAction: true
                            }
                        ]}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default File;