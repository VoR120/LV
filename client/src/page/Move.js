import { Button, Typography, Paper, TableContainer, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import ActionMenu from '../component/ActionMenu';
import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { downloadExcel, getExportData } from '../utils/utils';
import MySelect from '../component/UI/MySelect';
import { getMoveByType, updateMove } from '../action/moveAction';
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
}))

const Move = () => {
    const classes = useStyles();
    const [typeChoose, setTypeChoose] = useState('Chuyển sinh hoạt đi');
    const [type, setType] = useState("all");
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
            { title: "Chuyển từ chi bộ", field: "ChuyenTuChiBo", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "ChuyenDenChiBo", },
            { title: "Ngày chuyển đi", field: "NgayChuyenDi", },
            { title: "Ngày chuyển về", field: "NgayChuyenDen", },
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
            { title: "Chuyển từ chi bộ", field: "ChuyenTuChiBo", },
            { title: "Chuyển đến Đảng bộ", field: "ChuyenDenDangBo", },
            { title: "Chuyển đến Chi bộ", field: "ChuyenDenChiBo", },
            { title: "Ngày chuyển đến", field: "NgayChuyenDen", },
            { title: "Hình thức", field: "TenHinhThuc", },
            { title: "Ghi chú", field: "GhiChu", sorting: false },
            {
                title: "Chức năng", field: "action", sorting: false,
                render: (params) => {
                    console.log(params);
                    return <ActionMoveMenu type={typeChoose} data={params} />
                }
            },
        ]
    }

    const [columns, setColumns] = useState(columnArr["Chuyển sinh hoạt đi"])

    const data = getExportData(rows, columns)

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
        return () => {
            console.log("Unmount");
        }
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
                        <MenuItem value={typeChoose == "Chuyển sinh hoạt đi" ? "1" : "3"}>Chuyển sinh hoạt tạm thời</MenuItem>
                        <MenuItem value={typeChoose == "Chuyển sinh hoạt đi" ? "2" : "4"}>Chuyển sinh hoạt chính thức</MenuItem>
                    </MySelect>
                </Paper>
                <MyButton onClick={handleView} primary>Xem</MyButton>
                {data.length > 0 &&
                    <CSVLink data={data} filename={"export.csv"}>
                        <MyButton style={{ marginLeft: 8 }} success>
                            <SaveAltIcon style={{ marginRight: 4 }} />Excel
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