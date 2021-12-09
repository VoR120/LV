import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, MenuItem, Paper, TableContainer, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { getRewardDiscipline, importRewardDiscipline } from '../action/rewardDisciplineAction';
import Loading from '../component/CustomLoadingOverlay';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { downloadExcel, getExportData } from '../utils/utils';
import { CSVLink } from 'react-csv'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { SnackbarContext } from '../contextAPI/SnackbarContext';

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

    const { openSnackbarDispatch } = useContext(SnackbarContext);

    const [typeChoose, setTypeChoose] = useState('Khen thưởng');
    const [type, setType] = useState("all");
    const [loadingTable, setLoadingTable] = useState(false);
    const [file, setFile] = useState(null)

    const [rows, setRows] = useState([])

    const columnArr = {
        "Khen thưởng": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Email", field: "Email", },
            { title: "Số điện thoại", field: "SoDienThoai", },
            { title: "Tên khen thưởng", field: "TenKhenThuong", },
            { title: "Ngày khen thưởng", field: "NgayKhenThuong", type: "date" },
            { title: "Hình thức", field: "HinhThuc", },
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
            { title: "Email", field: "Email", },
            { title: "Số điện thoại", field: "SoDienThoai", },
            { title: "Tên kỷ luật", field: "TenKyLuat", },
            { title: "Ngày kỷ luật", field: "NgayKyLuat", type: "date" },
            { title: "Hình thức", field: "HinhThuc", },
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

    const data = getExportData(rows, columns)


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

    const handleImport = async () => {
        const res = await importRewardDiscipline({ file, type: typeChoose == "Khen thưởng" ? "reward" : "discipline" })
        console.log(res);
        if (res.error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.error.msg,
                    type: "error"
                }
            })
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.msg,
                    type: "success"
                }
            })
            fetchApi();
        }
    }

    const handleUpload = (e) => {
        let file = e.target.files
        console.log(file[0]);
        e.target?.files &&
            setFile(e.target.files[0])
    }

    useEffect(() => {
        setLoadingTable(true)
        fetchApi();
    }, [])

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
                </Paper>
                <MyButton onClick={handleSubmit} primary>Xem</MyButton>
                {data.data.length > 0 &&
                    <CSVLink data={data.data} headers={data.headers} filename={"export.csv"}>
                        <MyButton sx={{ ml: 1 }} success>
                            <FileDownloadIcon sx={{ mr: 0.5 }} />Excel
                        </MyButton>
                    </CSVLink>
                }
                <input
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                />
                <label htmlFor="upload-photo">
                    <MyButton sx={{ ml: 1 }} success component="span">
                        <FileUploadIcon sx={{ mr: 0.5 }} />Excel
                    </MyButton>
                    {file &&
                        <>
                            <Typography sx={{ p: '8px 16px', textDecoration: "underline" }} component="span">{file.name}</Typography>
                            <MyButton onClick={handleImport}>Lưu</MyButton>
                        </>
                    }
                </label>
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
                        isLoading={loadingTable}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default RewardDiscipline;