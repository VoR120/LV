import MaterialTable from '@material-table/core';
import {
    Grid, MenuItem,
    Paper,
    TableContainer, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { getAllCategory } from '../action/categoryAction';
import { checkIsOpen } from '../action/evaluateAction';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import axios from '../helper/axios';
import { getLocaleDate, getTimeWithEndHour, getTimeWithStartHour } from '../utils/utils';

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
        padding: '16px',
        marginBottom: '16px',
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '20px 0'
    },
    inputSelect: {
        marginRight: '20px',
        marginLeft: '16px',
    },
    paperStatistic: {
        padding: '8px',
        margin: '0 8px',
    },
    paperWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    status: {
        cursor: "default",
        '&:hover': {
            backgroundColor: theme.palette.common.white
        }
    }
}))

const EvaluateDepartment = () => {
    const classes = useStyles();

    // ContextAPI
    const { info, infoDispatch } = useContext(InfoContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const { loading, loadingDispatch } = useContext(LoadingContext)

    // State
    const columns = [
        { title: "Mã số Đảng viên", field: "MaSoDangVien", },
        { title: "Họ tên", field: "HoTen", },
        { title: "Cá nhân đánh giá", field: "TenDanhGiaCaNhan", },
        { title: "Bộ môn đánh giá", field: "TenDanhGiaBoMon", },
        {
            title: "Khoa đánh giá", field: "action",
            render: (params) => {
                return (
                    <MySelect
                        value={params.DanhGiaKhoa || "0"}
                        onChange={(e) => handleChange(e, params.MaSoDangVien)}
                    >
                        <MenuItem value="0">Chọn loại</MenuItem>
                        {
                            gradeArr.length > 0 &&
                            gradeArr.map(el => <MenuItem key={el.MaLoai} value={el.MaLoai}>{el.TenLoai}</MenuItem>)
                        }
                    </MySelect>
                )
            }
        }
    ]

    const [rows, setRows] = useState([])

    const [year, setYear] = useState((new Date).getFullYear());
    const [grade, setGrade] = useState("0");
    const [gradeArr, setGradeArr] = useState([]);
    const [isEvaluate, setIsEvaluate] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false)
    const [field, setField] = useState('all')
    const [isTime, setIsTime] = useState({ isTime: false, NgayBatDau: "", NgayKetThuc: "" });
    const [firstLoading, setFirstLoading] = useState(true)

    // Handle Function

    const handleChangeField = (e) => {
        setField(e.target.value);
    }

    const handleChange = async (e, id) => {
        try {
            setLoadingTable(true)
            const res = await axios.post('/api/evaluate/create', {
                MaSoDangVien: id,
                Nam: year,
                MaLoai: e.target.value,
                MaDVDG: 3
            })
            if (res.status == 201) {
                await fetchAPI();
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "Đã đánh giá!",
                        type: "success"
                    }
                })
                setLoadingTable(false)
            }
        } catch (error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: error.response.data.msg,
                    type: "error"
                }
            })
        }
    }

    const fetchAPI = async () => {
        try {
            setLoadingTable(true)
            let res;
            if (field == "all")
                res = await axios.get(`/api/evaluate/getbysubject?Nam=${year}`)
            else
                res = await axios.get(`/api/evaluate/getbysubject?MaChiBo=${field}&Nam=${year}`)
            console.log(res.data);
            if (res.status == 200) {
                setRows(res.data);
            }
            setLoadingTable(false);
            // loadingDispatch({ type: 'CLOSE_LOADING' })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit = async () => {
        fetchAPI();
    }

    // UseEffect
    useEffect(() => {
        setLoadingTable(true)
        getAllCategory(categoryDispatch, "grade");
        getAllCategory(categoryDispatch, "partycell");
        checkTime();
    }, [])

    const checkTime = async () => {
        const res = await checkIsOpen({ id: 3 });
        console.log(res);
        if (res) {
            const { ThoiGianBatDau, ThoiGianKetThuc, Nam } = res
            setYear(Nam)
            let ThoiGianKetThucCheck = getTimeWithEndHour(ThoiGianKetThuc)
            let ThoiGianBatDauCheck = getTimeWithStartHour(ThoiGianBatDau)

            if (new Date() >= ThoiGianBatDauCheck && new Date() <= ThoiGianKetThucCheck) {
                setIsTime({ isTime: true, ThoiGianBatDau, ThoiGianKetThuc });
            }
        }
        setFirstLoading(false)
    }

    useEffect(() => {
        if (isTime.isTime) {
            fetchAPI();
        }
    }, [isTime])

    useEffect(() => {
        if (category.categories.grade.length > 0) {
            category.categories.grade.map(el => {
                el.Nam == year && setGradeArr(el.Data)
            })
        }
    }, [category.categories.grade])

    useEffect(() => {
        firstLoading
        ? loadingDispatch({ type: 'OPEN_LOADING' })
        : loadingDispatch({ type: 'CLOSE_LOADING' })
    }, [firstLoading])

    return (
        <>

            <Layout sidebar>
                {!firstLoading &&
                    <>
                        <div className={classes.header} >
                            <Typography className={classes.headerContent} variant="h5">
                                Khoa đánh giá
                            </Typography>
                        </div>
                        {
                            isTime.isTime ?
                                <>
                                    <Paper variant="outlined" className={classes.paper}>
                                        <Typography style={{ textTransform: 'uppercase', marginBottom: 8 }}>Đánh giá Đảng viên cuối năm</Typography>
                                        <Typography style={{ marginRight: 40 }} variant="body1">Năm: <b>{year}</b></Typography>
                                        <Typography marginBottom={2} variant="body1">
                                            Thời gian: Từ ngày <b>{getLocaleDate(isTime.ThoiGianBatDau)}</b> đến ngày <b>{getLocaleDate(isTime.ThoiGianKetThuc)}</b>
                                        </Typography>
                                        <MySelect
                                            nameTitle="Chi bộ"
                                            value={field}
                                            onChange={handleChangeField}
                                            autowidth
                                        >
                                            <MenuItem value="all">Tất cả</MenuItem>
                                            {
                                                category.categories.partycell.map(el =>
                                                    <MenuItem value={el.MaChiBo} key={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                                                )
                                            }
                                        </MySelect>
                                    </Paper>
                                    <MyButton onClick={handleSubmit} primary>Xem</MyButton>
                                    <TableContainer className="decentralization-table" style={{ maxWidth: "1170px", }} >
                                        <MaterialTable
                                            components={{
                                                Container: (props) => <Paper
                                                    {...props}
                                                    className={classes.table}
                                                    variant="outlined"
                                                />
                                            }}
                                            options={{
                                                padding: 'dense'
                                            }}
                                            title={"Bộ môn đánh giá"}
                                            columns={columns}
                                            data={rows}
                                            isLoading={loadingTable}
                                        />
                                    </TableContainer>
                                </>
                                :
                                <Paper variant="outlined" className={classes.paper}>
                                    <Grid marginBottom={2}>
                                        <Typography style={{ textTransform: 'uppercase' }}>Đánh giá Đảng viên cuối năm</Typography>
                                        <Typography style={{ marginRight: 40 }} variant="body1">Năm: <b>{year}</b></Typography>
                                        <Typography variant="body1">Chưa đến thời gian đánh giá</Typography>
                                    </Grid>
                                </Paper>
                        }
                    </>
                }
            </Layout>
        </>
    );
};

export default EvaluateDepartment;