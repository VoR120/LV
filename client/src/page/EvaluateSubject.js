import MaterialTable from '@material-table/core';
import {
    Grid,
    MenuItem,
    Paper,
    TableContainer, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { getAllCategory } from '../action/categoryAction';
import { checkIsOpen } from '../action/evaluateAction';
import Layout from '../component/Layout';
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

const EvaluateSubject = () => {
    const classes = useStyles();

    // ContextAPI
    const { info, infoDispatch } = useContext(InfoContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const { loading, loadingDispatch } = useContext(LoadingContext)

    // State
    const columns = [
        { title: "M?? s??? ?????ng vi??n", field: "MaSoDangVien", },
        { title: "H??? t??n", field: "HoTen", },
        { title: "C?? nh??n ????nh gi??", field: "TenDanhGiaCaNhan", },
        {
            title: "B??? m??n ????nh gi??", field: "action",
            render: (params) => {
                return (
                    <MySelect
                        key={params.MaSoDangVien}
                        value={params.DanhGiaBoMon || "0"}
                        onChange={(e) => handleChange(e, params.MaSoDangVien)}
                    >
                        <MenuItem value="0">Ch???n lo???i</MenuItem>
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
    const [loadingTable, setLoadingTable] = useState(false);
    const [isTime, setIsTime] = useState({ isTime: false, ThoiGianBatDau: "", ThoiGianKetThuc: "" });
    const [firstLoading, setFirstLoading] = useState(true)

    // Handle Function
    const handleChange = async (e, id) => {
        if (e.target.value == 0)
            return;
        try {
            setLoadingTable(true)
            const res = await axios.post('/api/evaluate/create', {
                MaSoDangVien: id,
                Nam: year,
                MaLoai: e.target.value,
                MaDVDG: 2
            })
            if (res.status == 201) {
                await fetchAPI();
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "???? ????nh gi??!",
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
            // loadingDispatch({ type: 'OPEN_LOADING' })
            const res = await axios.get(`/api/evaluate/getbysubject?MaChiBo=${info.info.MaChiBo}&Nam=${year}`)
            console.log(res.data);
            if (res.status == 200) {
                if (res.data.length > 0) {
                    // setGrade(res.data[0].DanhGiaCaNhan)
                    const newRes = [...res.data];
                    res.data.map((el, index) => ({ ...el, id: index }));
                    setRows(res.data);
                    // setIsEvaluate(true)
                }
            }
            // loadingDispatch({ type: 'CLOSE_LOADING' })
            setLoadingTable(false);
        } catch (error) {
            console.log(error.message)
        }
    }

    const checkTime = async () => {
        const res = await checkIsOpen({ id: 2 });
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
    // UseEffect
    useEffect(() => {
        setLoadingTable(true)
        loadingDispatch({ type: 'OPEN_LOADING' })
        getAllCategory(categoryDispatch, "grade");
        checkTime();
    }, [])

    useEffect(() => {
        if (isTime.isTime) {
            fetchAPI();
        }
    }, [isTime])

    useEffect(() => {
        firstLoading
            ? loadingDispatch({ type: 'OPEN_LOADING' })
            : loadingDispatch({ type: 'CLOSE_LOADING' })
    }, [firstLoading])

    useEffect(() => {
        if (category.categories.grade.length > 0) {
            category.categories.grade.map(el => {
                el.Nam == year && setGradeArr(el.Data)
            })
        }
    }, [category.categories.grade])

    return (
        <>
            <Layout sidebar>
                {
                    !firstLoading &&
                    <>
                        <div className={classes.header} >
                            <Typography className={classes.headerContent} variant="h5">
                                B??? m??n ????nh gi??
                            </Typography>
                        </div>
                        {
                            isTime.isTime ?
                                <>
                                    <Paper variant="outlined" className={classes.paper}>
                                        <Typography style={{ textTransform: 'uppercase' }}>????nh gi?? ?????ng vi??n cu???i n??m</Typography>
                                        <Typography style={{ marginRight: 40 }} variant="body1">N??m: <b>{year}</b></Typography>
                                        <Typography variant="body1">
                                            Th???i gian: T??? ng??y <b>{getLocaleDate(isTime.ThoiGianBatDau)}</b> ?????n ng??y <b>{getLocaleDate(isTime.ThoiGianKetThuc)}</b>
                                        </Typography>
                                    </Paper>
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
                                            title={"B??? m??n ????nh gi??"}
                                            columns={columns}
                                            data={rows}
                                            isLoading={loadingTable}
                                        />
                                    </TableContainer>
                                </>
                                :
                                <Paper variant="outlined" className={classes.paper}>
                                    <Grid marginBottom={2}>
                                        <Typography style={{ textTransform: 'uppercase' }}>????nh gi?? ?????ng vi??n cu???i n??m</Typography>
                                        <Typography style={{ marginRight: 40 }} variant="body1">N??m: <b>{year}</b></Typography>
                                        <Typography variant="body1">Ch??a ?????n th???i gian ????nh gi??</Typography>
                                    </Grid>
                                </Paper>
                        }
                    </>
                }
            </Layout>
        </>
    );
};

export default EvaluateSubject;