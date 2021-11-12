import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, MenuItem, Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { getRewardDiscipline } from '../action/rewardDisciplineAction';
import Loading from '../component/CustomLoadingOverlay';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { downloadExcel } from '../utils/utils';


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

const RewardDiscipline = () => {
    const classes = useStyles();

    const [typeChoose, setTypeChoose] = useState('Khen thưởng');
    const [type, setType] = useState("all");
    const [loadingTable, setLoadingTable] = useState(false);

    const [rows, setRows] = useState([])

    const columnArr = {
        "Khen thưởng": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Tên khen thưởng", field: "TenKhenThuong", },
            { title: "Ngày khen thưởng", field: "NgayKhenThuong", },
            { title: "Hình thức", field: "TenHinhThuc", },
            // {
            //     title: "Chức năng", field: "action", sorting: false,
            //     render: (params) => {
            //         console.log(params);
            //         return <ActionMenu data={params} />
            //     }
            // },
        ],
        "Kỷ luật": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Tên kỷ luật", field: "TenKyLuat", },
            { title: "Ngày kỷ luật", field: "NgayKyLuat", },
            { title: "Hình thức", field: "TenHinhThuc", },
            // {
            //     title: "Chức năng", field: "action", sorting: false,
            //     render: (params) => {
            //         console.log(params);
            //         return <ActionMenu data={params} />
            //     }
            // },
        ]
    }

    const [columns, setColumns] = useState(columnArr["Khen thưởng"])

    const handleChangeType = (e) => {
        setType("all");
        setTypeChoose(e.target.value)
    }

    const fetchApi = async () => {
        const res = await getRewardDiscipline({
            MaHinhThuc: type,
            Loai: typeChoose == "Khen thưởng" ? "reward" : "discipline"
        });
        setRows(res);
        setColumns(columnArr[typeChoose])
        setLoadingTable(false)
    };

    const handleSubmit = () => {
        setLoadingTable(true)
        fetchApi();
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Danh sách Khen thưởng - Kỷ luật Đảng viên
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <MySelect
                        onChange={handleChangeType}
                        nameTitle={"Loại"}
                        value={typeChoose}
                        autowidth
                    >
                        <MenuItem value="Khen thưởng">Khen thưởng</MenuItem>
                        <MenuItem value="Kỷ luật">Kỷ luật</MenuItem>
                    </MySelect>
                    {typeChoose == "Khen thưởng" ?
                        <MySelect
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            style={{ marginLeft: 16 }}
                            autowidth
                        >
                            <MenuItem value="all">Tất cả</MenuItem>
                            <MenuItem value="0005">Biểu dương</MenuItem>
                            <MenuItem value="0006">Tặng giấy khen</MenuItem>
                        </MySelect>
                        :
                        <MySelect
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            style={{ marginLeft: 16 }}
                            autowidth
                        >
                            <MenuItem value="all">Tất cả</MenuItem>
                            <MenuItem value="0007">Khiển trách</MenuItem>
                            <MenuItem value="0008">Cảnh cáo</MenuItem>
                            <MenuItem value="0009">Cách chức</MenuItem>
                            <MenuItem value="0010">Khai trừ</MenuItem>
                        </MySelect>
                    }
                </Paper>
                <MyButton onClick={handleSubmit} primary>Xem</MyButton>
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
                        title={"Khen thưởng - Kỷ luật"}
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
                        isLoading={loadingTable}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default RewardDiscipline;