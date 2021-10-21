import { Grid, MenuItem, Paper, TextField, Typography, Button, TableContainer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import ActionMenu from '../component/ActionMenu';
import Layout from '../component/Layout';
import MySelect from '../component/UI/MySelect';
import MyButton from '../component/UI/MyButton';
import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import xlsx from 'xlsx'

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: (props) => ({
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px'
    }),
    deleteBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
    }
}))

const Search = () => {

    const [rows] = useState([
        { HoTen: "Nguyen Vân A" },
        { HoTen: "Nguyen Vân A" },
        { HoTen: "Nguyen Vân A" },
        { HoTen: "Nguyen Vân A" },
        { HoTen: "Nguyen Vân A" },
        { HoTen: "Nguyen Vân A" },
        { HoTen: "Nguyen Vân A" },
    ])

    const [columns] = useState([
        { title: "Mã Đảng viên", field: "MaDangVien", maxWidth: 150 },
        {
            title: "Họ tên", field: "HoTen", minWidth: 200
        },
        { title: "Chi bộ", field: "TenChiBo", },
        { title: "Giới tính", field: "GioiTinh", },
        { title: "Ngày sinh", field: "NgaySinh", },
        { title: "Quê quán", field: "QueQuan", },
        { title: "Dân tộc", field: "DanToc", },
        { title: "Tôn giáo", field: "TonGiao", },
        { title: "Ngày vào Đảng", field: "NgayVaoDang", },
        { title: "Ngày chính thức", field: "NgayChinhThuc", },
        { title: "Số điện thoại", field: "SoDienThoai", },
        { title: "Email", field: "Email", },
        { title: "CMND", field: "CMND", },
        {
            title: "Chức năng", field: "action", sorting: false,
            render: (params) => {
                console.log(params);
                return <ActionMenu data={params} />
            }
        },
    ])

    const classes = useStyles({ rows: rows });
    const [gender, setGender] = useState('2');
    const handleChangeGender = (e) => {
        setGender(e.target.value)
    }

    const downloadExcel = () => {
        const workSheet = xlsx.utils.json_to_sheet(rows);
        const workBook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workBook, workSheet, "data")
        let buf = xlsx.write(workBook, { bookType: "xlsx", type: "buffer" })
        xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
        xlsx.writeFile(workBook, "DataExcel.xlsx")
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Tìm kiếm
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Chi bộ</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <MySelect
                                    // onChange={handleChangeGender}
                                    value={"sv"}
                                >
                                    <MenuItem value="sv">Sinh viên</MenuItem>
                                    <MenuItem value="gv">Giảng viên</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Trạng thái</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <MySelect
                                    // onChange={handleChangeGender}
                                    value={"sv"}
                                >
                                    <MenuItem value="sv">Đang sinh hoạt</MenuItem>
                                    <MenuItem value="cshtt">Chuyển sinh hoạt tạm thời</MenuItem>
                                    <MenuItem value="cshct">Chuyển sinh hoạt chính thức</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Họ tên</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <TextField fullWidth size="small" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Quê quán</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <TextField fullWidth size="small" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Dân tộc</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <MySelect
                                    // onChange={handleChangeGender}
                                    value={"sv"}
                                >
                                    <MenuItem value="sv">Kinh</MenuItem>
                                    <MenuItem value="cshtt">Khmer</MenuItem>
                                    <MenuItem value="cshct">Chăm</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Tôn giáo</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <MySelect
                                    // onChange={handleChangeGender}
                                    value={"sv"}
                                >
                                    <MenuItem value="sv">Phật giáo</MenuItem>
                                    <MenuItem value="cshtt">...</MenuItem>
                                    <MenuItem value="cshct">...</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Giới tính</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <MySelect
                                    onChange={handleChangeGender}
                                    value={gender}
                                >
                                    <MenuItem value="2">Tất cả</MenuItem>
                                    <MenuItem value="male">Nam</MenuItem>
                                    <MenuItem value="female">Nữ</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <MyButton primary >Xem</MyButton>
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
                        title={"Tìm kiếm"}
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

export default Search;