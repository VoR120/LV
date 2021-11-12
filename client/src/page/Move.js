import { Button, Typography, Paper, TableContainer, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import ActionMenu from '../component/ActionMenu';
import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadExcel } from '../utils/utils';
import MySelect from '../component/UI/MySelect';
import { getMoveByType } from '../action/moveAction';
import MyButton from '../component/UI/MyButton';

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
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '16px',
        marginBottom: '16px',
    },
}))

const Move = () => {
    const classes = useStyles();
    const [typeChoose, setTypeChoose] = useState('Chuyển sinh hoạt đi');
    const [type, setType] = useState("all");
    const [loading, setLoading] = useState(false);

    const [rows, setRows] = useState([])

    const columnArr = {
        "Chuyển sinh hoạt đi": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Chuyển từ", field: "ChuyenTu", },
            { title: "Chuyển đến", field: "ChuyenDen", },
            { title: "Ngày chuyển đi", field: "NgayChuyenDi", },
            { title: "Ngày chuyển về", field: "NgayChuyenDen", },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            { title: "", field: "", maxWidth: 10 },
            // {
            //     title: "Chức năng", field: "action", sorting: false,
            //     render: (params) => {
            //         console.log(params);
            //         return <ActionMenu data={params} />
            //     }
            // },
        ],
        "Chuyển sinh hoạt đến": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Chuyển từ", field: "ChuyenTu", },
            { title: "Chuyển đến", field: "ChuyenDen", },
            { title: "Ngày chuyển đến", field: "NgayChuyenDen", },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            // {
            //     title: "Chức năng", field: "action", sorting: false,
            //     render: (params) => {
            //         console.log(params);
            //         return <ActionMenu data={params} />
            //     }
            // },
        ]
    }

    const [columns, setColumns] = useState(columnArr["Chuyển sinh hoạt đi"])

    const handleChangeType = (e) => {
        setType("all");
        setTypeChoose(e.target.value)
    }

    const fetchApi = async () => {
        const res = await getMoveByType({ LoaiHinhThuc: typeChoose, MaHinhThuc: type });
        setRows(res);
        setColumns(columnArr[typeChoose])
        setLoading(false)
    };

    const handleSubmit = () => {
        setLoading(true)
        fetchApi();
    }

    useEffect(() => {
        setLoading(true)
        fetchApi();
    }, [])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Danh sách Đảng viên chuyển sinh hoạt
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <MySelect
                        onChange={handleChangeType}
                        nameTitle={"Loại báo cáo"}
                        value={typeChoose}
                        autowidth
                    >
                        <MenuItem value="Chuyển sinh hoạt đi">Chuyển đi</MenuItem>
                        <MenuItem value="Chuyển sinh hoạt đến">Chuyển đến</MenuItem>
                    </MySelect>
                    <MySelect
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        style={{ marginLeft: 16 }}
                        autowidth
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value={typeChoose == "Chuyển sinh hoạt đi" ? "0001" : "0003"}>Chuyển sinh hoạt tạm thời</MenuItem>
                        <MenuItem value={typeChoose == "Chuyển sinh hoạt đi" ? "0002" : "0004"}>Chuyển sinh hoạt chính thức</MenuItem>
                    </MySelect>
                </Paper>
                <MyButton onClick={handleSubmit} primary>Xem</MyButton>
                <TableContainer style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) => <Paper
                                {...props}
                                className={classes.table}
                                variant="outlined"
                            />
                        }}
                        title={"Chuyển sinh hoạt"}
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
                        isLoading={loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Move;