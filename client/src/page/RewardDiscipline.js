import MaterialTable from '@material-table/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Chip, MenuItem, Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { getRewardDiscipline, importRewardDiscipline } from '../action/rewardDisciplineAction';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import exampleRewardFile from '../public/excel/KhenThuong.xlsx';
import exampleDisciplineFile from '../public/excel/KyLuat.xlsx';
import { disciplinePDF, rewardPDF } from '../utils/pdf';
import { getExportData, pdfmakedownload } from '../utils/utils';

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

    const handleExportPDF = () => {
        const dd = typeChoose == "Khen thưởng"
            ? rewardPDF(rows, "DANH SÁCH KHEN THƯỞNG ĐẢNG VIÊN")
            : disciplinePDF(rows, "DANH SÁCH KỶ LUẬT ĐẢNG VIÊN")
        pdfmakedownload(dd);
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
                    <>
                        <CSVLink data={data.data} headers={data.headers} filename={"export.csv"}>
                            <MyButton sx={{ ml: 1 }} success>
                                <FileDownloadIcon sx={{ mr: 0.5 }} />Excel
                            </MyButton>
                        </CSVLink>
                        <MyButton onClick={handleExportPDF} sx={{ ml: 1, backgroundColor: "#e95340", '&:hover': { backgroundColor: '#e95340' } }}>
                            <FileDownloadIcon sx={{ mr: 0.5 }} />pdf
                        </MyButton>
                    </>
                }
                <input
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                />
                <Chip
                    sx={{ ml: 2 }}
                    icon={<FileDownloadIcon />}
                    download
                    component={"a"}
                    href={typeChoose == "Khen thưởng" ? exampleRewardFile : exampleDisciplineFile}
                    clickable
                    label={"File mẫu"} />
                <label htmlFor="upload-photo">
                    <MyButton sx={{ ml: 1 }} success component="span">
                        <FileUploadIcon sx={{ mr: 0.5 }} />Import
                    </MyButton>
                    {file &&
                        <>
                            <Typography sx={{ p: '8px 16px', textDecoration: "underline" }} component="span">{file.name}</Typography>
                            <MyButton onClick={handleImport}>Lưu</MyButton>
                        </>
                    }
                </label>
                <TableContainer className='reward-discipline-table' style={{ maxWidth: "1170px", }} >
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