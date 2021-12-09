import { Button, Typography, Paper, TableContainer, MenuItem, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import ActionMenu from '../component/ActionMenu';
import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { downloadExcel, getExportData } from '../utils/utils';
import MySelect from '../component/UI/MySelect';
import { getMoveByPMId, getMoveByType, updateMove } from '../action/moveAction';
import MyButton from '../component/UI/MyButton';
import MoveReturnForm from '../component/MoveReturnForm';
import { useForm } from 'react-hook-form';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { CSVLink } from 'react-csv'
import ActionMoveMenu from '../component/ActionMoveMenu';

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
    inputSelect: {
        marginRight: '20px',
        marginLeft: '16px',
    },
}))

const Move = () => {
    const classes = useStyles();
    const [typeChoose, setTypeChoose] = useState('Chuyển sinh hoạt đi');
    const [type, setType] = useState("all");
    const [typeFirst, setTypeFirst] = useState("type")
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false);

    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext);

    const [rows, setRows] = useState([])

    const {
        handleSubmit,
        control,
        setValue,
        clearErrors,
        getValues,
        formState: { errors }
    } = useForm();

    const columnArr = {
        "Chuyển sinh hoạt đi": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển đi", field: "NgayChuyenDi", type: "date" },
            { title: "Ngày chuyển về", field: "NgayChuyenDen", type: "date" },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chuyển về", field: "NgayChuyenDi",
                render: (params) => {
                    const { NgayChuyenDi, NgayChuyenDen, MaSoDangVien, HoTen, MaChuyenSinhHoat } = params;
                    let disabled;
                    if (type == "1" || type == "all") {
                        if (NgayChuyenDen && NgayChuyenDi)
                            disabled = true;
                        else disabled = false
                    } else disabled = true

                    console.log(params);
                    return <MoveReturnForm
                        moveId={MaChuyenSinhHoat}
                        id={MaSoDangVien}
                        name={HoTen}
                        onSubmit={handleSubmitReturn}
                        disabled={disabled}
                        handleSubmit={handleSubmit}
                        control={control}
                        errors={errors}
                    />
                }
            },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu type={typeChoose} data={params} />
                }
            },
        ],
        "Chuyển sinh hoạt đến": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển đến", field: "NgayChuyenDen", type: "date" },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu typeFirst={typeFirst} type={typeChoose} data={params} />
                }
            },
        ],
        "Chuyển sinh hoạt theo Mã": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển đi", field: "NgayChuyenDi", type: "date" },
            { title: "Ngày chuyển đến/về", field: "NgayChuyenDen", type: "date" },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu type={typeChoose} data={params} />
                }
            },
        ],
        "Chuyển sinh hoạt nội bộ": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển", field: "NgayChuyenDi", type: "date" },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu type={typeChoose} data={params} />
                }
            },
        ],
    }

    const [columns, setColumns] = useState(columnArr["Chuyển sinh hoạt đi"])

    const data = getExportData(rows, columns)

    const handleChangeTypeFirst = (e) => {
        setTypeFirst(e.target.value);
        setId('');
    }

    const handleChangeType = (e) => {
        setType("all");
        setTypeChoose(e.target.value)
    }

    const fetchApi = async () => {
        console.log(typeFirst);
        let res;
        typeFirst == "type"
            ? res = await getMoveByType({ LoaiHinhThuc: typeChoose, MaHinhThuc: type })
            : res = await getMoveByPMId({ MaSoDangVien: id })
        if (res.error) {
            setRows([])
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `${res.error}`,
                    type: "error"
                }
            })
        } else {
            typeFirst == "type"
                ? setColumns(columnArr[typeChoose])
                : setColumns(columnArr["Chuyển sinh hoạt theo Mã"])
            setRows(res);
        }
        setLoading(false)
    };

    const handleView = () => {
        setLoading(true)
        fetchApi();
    }

    const handleSubmitReturn = async (data) => {
        console.log(rows);
        const res = await updateMove(data, openSnackbarDispatch);
        if (res) {
            setLoading(true)
            fetchApi();
        }
        // console.log(res);
        // console.log(rows);
        // const newRow = [...rows];
        // rows.map((el, index) => {
        //     if (el.MaChuyenSinhHoat == res.MaChuyenSinhHoat)
        //         newRow[index] = { ...rows[index], NgayChuyenDen: res.NgayChuyenDen }
        // })
        // console.log(newRow);
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
                        onChange={handleChangeTypeFirst}
                        value={typeFirst}
                        autowidth
                    >
                        <MenuItem value="type">Theo loại</MenuItem>
                        <MenuItem value="name">Theo Mã số Đảng viên</MenuItem>
                    </MySelect>
                    {
                        typeFirst == "type" ?
                            <>
                                <Typography className={classes.inputSelect}>Loại</Typography>
                                <MySelect
                                    onChange={handleChangeType}
                                    value={typeChoose}
                                    style={{ marginLeft: 16 }}
                                    autowidth
                                >
                                    <MenuItem value="Chuyển sinh hoạt đi">Chuyển đi</MenuItem>
                                    <MenuItem value="Chuyển sinh hoạt đến">Chuyển đến</MenuItem>
                                    <MenuItem value="Chuyển sinh hoạt nội bộ">Chuyển nội bộ</MenuItem>
                                </MySelect>
                                {typeChoose != "Chuyển sinh hoạt nội bộ" &&
                                    <MySelect
                                        onChange={(e) => setType(e.target.value)}
                                        value={type}
                                        style={{ marginLeft: 16 }}
                                        autowidth
                                    >
                                        <MenuItem value="all">Tất cả</MenuItem>
                                        <MenuItem value={typeChoose == "Chuyển sinh hoạt đi" ? "1" : "3"}>Chuyển sinh hoạt tạm thời</MenuItem>
                                        <MenuItem value={typeChoose == "Chuyển sinh hoạt đi" ? "2" : "4"}>Chuyển sinh hoạt chính thức</MenuItem>
                                    </MySelect>
                                }
                            </>
                            :
                            <>
                                <Typography className={classes.inputSelect}>Mã số Đảng viên</Typography>
                                <TextField
                                    onChange={(e) => setId(e.target.value)}
                                    size="small"
                                    variant="outlined"
                                />
                            </>
                    }

                </Paper>
                <MyButton onClick={handleView} primary>Xem</MyButton>
                {data.data.length > 0 &&
                    <CSVLink data={data.data} headers={data.headers} filename={"export.csv"}>
                        <MyButton sx={{ ml: 1 }} success>
                            <FileDownloadIcon sx={{ mr: 0.5 }} />Excel
                        </MyButton>
                    </CSVLink>
                }
                <TableContainer className="move-table" style={{ maxWidth: "1170px", }} >
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
                        isLoading={loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Move;