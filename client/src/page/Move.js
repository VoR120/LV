import MaterialTable from '@material-table/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MenuItem, Paper, TableContainer, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useForm } from 'react-hook-form';
import { getMoveByPMId, getMoveByType, removeMove, updateMove, updateReturnMove } from '../action/moveAction';
import ActionMoveMenu from '../component/ActionMoveMenu';
import Layout from '../component/Layout';
import MoveReturnForm from '../component/MoveReturnForm';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { InfoContext } from '../contextAPI/InfoContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { moveInPDF, moveInternalPDF, moveOutPDF, movePDF } from '../utils/pdf';
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
    const { info } = useContext(InfoContext);
    const isDeP = info.info.Quyen["12"] == 1;

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
            { title: "Loại", field: "LoaiHinhThuc", },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển đi", field: "NgayChuyenDi", type: "date" },
            { title: "Ngày chuyển về", field: "NgayChuyenDen", type: "date" },
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
                    return <ActionMoveMenu
                        handleDelete={(e) => handleDelete(e, params.MaChuyenSinhHoat)}
                        fetchApi={fetchApi}
                        type={typeChoose} data={params}
                    />
                },
            }
        ],
        "Chuyển sinh hoạt đến": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Loại", field: "LoaiHinhThuc", },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển đến", field: "NgayChuyenDen", type: "date" },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu
                        handleDelete={(e) => handleDelete(e, params.MaChuyenSinhHoat)}
                        fetchApi={fetchApi}
                        type={typeChoose} data={params}
                    />
                }
            },
        ],
        "Chuyển sinh hoạt theo Mã": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Loại", field: "LoaiHinhThuc", },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển đi", field: "NgayChuyenDi", type: "date" },
            { title: "Ngày chuyển đến/về", field: "NgayChuyenDen", type: "date" },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu
                        handleDelete={(e) => handleDelete(e, params.MaChuyenSinhHoat)}
                        fetchApi={fetchApi}
                        type={typeChoose} data={params}
                    />
                }
            },
        ],
        "Chuyển sinh hoạt nội bộ": [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", maxWidth: 150 },
            { title: "Họ tên", field: "HoTen", },
            { title: "Loại", field: "LoaiHinhThuc", },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Chuyển từ Đảng bộ", field: "ChuyenTuDangBo", },
            { title: "Chuyển từ chi bộ", field: "TenChiBoTu", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến chi bộ", field: "TenChiBoDen", },
            { title: "Ngày chuyển", field: "NgayChuyenDi", type: "date" },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu
                        handleDelete={(e) => handleDelete(e, params.MaChuyenSinhHoat)}
                        fetchApi={fetchApi}
                        type={typeChoose} data={params}
                    />
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
        let res
        if (isDeP) {
            typeFirst == "type"
                ? res = await getMoveByType({ LoaiHinhThuc: typeChoose, MaHinhThuc: type })
                : res = await getMoveByPMId({ MaSoDangVien: id })
        } else {
            typeFirst == "type"
                ? res = await getMoveByType({ LoaiHinhThuc: typeChoose, MaHinhThuc: type, MaChiBo: info.info.MaChiBo })
                : res = await getMoveByPMId({ MaSoDangVien: id, MaChiBo: info.info.MaChiBo })
        }
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
            setRows(res);
        }
        setLoading(false)
    };

    const handleView = () => {
        setLoading(true)
        fetchApi();
    }

    const handleDelete = async (e, id) => {
        setLoading(true);
        const res = await removeMove({ id })
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
            setRows(rows.filter(el => el.MaChuyenSinhHoat != id))
        }
        setLoading(false);
    }

    const handleSubmitReturn = async (data) => {
        setLoading(true);
        const res = await updateReturnMove(data);
        console.log(res);
        console.log(rows);
        if (res.error) {
            setRows([])
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.error,
                    type: "error"
                }
            })
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
            typeFirst == "type"
                ? setColumns(columnArr[typeChoose])
                : setColumns(columnArr["Chuyển sinh hoạt theo Mã"])
            setRows(rows.map(el => el.MaChuyenSinhHoat == data.MaChuyenSinhHoat
                ? { ...el, NgayChuyenDen: res.NgayChuyenDen }
                : el
            ));
            // fetchApi();
        }
    }

    const handleExportPDF = () => {
        let dd;
        let title = `DANH SÁCH ĐẢNG VIÊN ${typeChoose.toUpperCase()}`
        if (typeFirst == "type") {
            if (typeChoose == "Chuyển sinh hoạt đi")
                dd = moveOutPDF(rows, title);
            if (typeChoose == "Chuyển sinh hoạt đến")
                dd = moveInPDF(rows, title);
            if (typeChoose == "Chuyển sinh hoạt nội bộ")
                dd = moveInternalPDF(rows, title);
        } else {
            dd = movePDF(rows, "DANH SÁCH ĐẢNG VIÊN CHUYỂN SINH HOẠT")
        }
        pdfmakedownload(dd);
    }

    useEffect(() => {
        typeFirst == "type"
            ? setColumns(columnArr[typeChoose])
            : setColumns(columnArr["Chuyển sinh hoạt theo Mã"])
        setLoading(false)
    }, [rows])

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