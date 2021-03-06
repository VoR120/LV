import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Grid,
    MenuItem,
    Paper, Typography
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
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
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

const Evaluate = () => {
    const classes = useStyles();

    // ContextAPI
    const { partyMember, partyMemberDispatch } = useContext(PartyMemberContext);
    const { info, infoDispatch } = useContext(InfoContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const { loading, loadingDispatch } = useContext(LoadingContext)
    // State


    const [year, setYear] = useState((new Date).getFullYear());
    const [grade, setGrade] = useState("0");
    const [gradeArr, setGradeArr] = useState([]);
    const [isEvaluate, setIsEvaluate] = useState(false);
    const [isTime, setIsTime] = useState({ isTime: false, ThoiGianBatDau: "", ThoiGianKetThuc: "" });

    // Handle Function
    const handleChange = (e) => {
        setGrade(e.target.value)
    }

    const fetchGetEvaluate = async () => {
        try {
            loadingDispatch({ type: 'OPEN_LOADING' })
            const res = await axios.get(`/api/evaluate/getbypm?MaSoDangVien=${info.info.MaSoDangVien}&Nam=${year}&MaDVDG=1`)
            console.log(res.data);
            if (res.status == 200) {
                if (res.data.length > 0) {
                    setGrade(res.data[0].MaLoai)
                    setIsEvaluate(true)
                }
            }
            loadingDispatch({ type: 'CLOSE_LOADING' })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post('/api/evaluate/create', {
                MaSoDangVien: info.info.MaSoDangVien,
                Nam: year,
                MaLoai: grade,
                MaDVDG: 1
            })
            if (res.status == 201) {
                await fetchGetEvaluate();
            }
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "???? ????nh gi??!",
                    type: "success"
                }
            })
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
    // UseEffect
    useEffect(() => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        getAllCategory(categoryDispatch, "grade");
        checkTime();
    }, [])

    const checkTime = async () => {
        const res = await checkIsOpen({ id: 1 });
        console.log(res);
        if (res) {
            const { ThoiGianBatDau, ThoiGianKetThuc, Nam } = res
            setYear(Nam)
            let NgayKetThucCheck = getTimeWithEndHour(ThoiGianKetThuc)
            let NgayBatDauCheck = getTimeWithStartHour(ThoiGianBatDau)

            if (new Date() >= NgayBatDauCheck && new Date() <= NgayKetThucCheck) {
                setIsTime({ isTime: true, ThoiGianBatDau, ThoiGianKetThuc });
            }
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

    useEffect(() => {
        if (isTime.isTime) {
            fetchGetEvaluate();
        }
    }, [isTime])

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
                {!loading.open &&
                    <>
                        <div className={classes.header} >
                            <Typography className={classes.headerContent} variant="h5">
                                C?? nh??n ????nh gi??
                            </Typography>
                        </div>
                        {
                            isTime.isTime ?
                                <Paper variant="outlined" className={classes.paper}>
                                    <Typography style={{ textTransform: 'uppercase', marginBottom: 16 }}>????nh gi?? ?????ng vi??n cu???i n??m</Typography>
                                    <Typography variant="body1">Th???i gian: T??? ng??y <b>{getLocaleDate(isTime.ThoiGianBatDau)}</b> ?????n ng??y <b>{getLocaleDate(isTime.ThoiGianKetThuc)}</b>
                                    </Typography>
                                    <div className={classes.flexContainer}>
                                        <Typography style={{ marginRight: 40 }} variant="body1">N??m: <b>{year}</b></Typography>
                                        <Typography style={{ marginRight: 20 }} variant="body1">Lo???i:</Typography>
                                        <MySelect
                                            value={grade}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="0">Ch???n lo???i</MenuItem>
                                            {
                                                gradeArr.length > 0 &&
                                                gradeArr.map(el => <MenuItem key={el.MaLoai} value={el.MaLoai}>{el.TenLoai}</MenuItem>)
                                            }
                                        </MySelect>
                                        <MyButton disabled={grade == 0} onClick={handleSubmit} style={{ marginLeft: 20 }} info>????nh gi??</MyButton>
                                    </div>
                                    {isEvaluate ?
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <CheckIcon color="success" fontSize="large" />
                                            <Typography alignItems="center" style={{ textTransform: "uppercase" }} variant="h5" color="green">???? ????nh gi??</Typography>
                                        </div>
                                        :
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <ClearIcon color="error" fontSize="large" />
                                            <Typography alignItems="center" style={{ textTransform: "uppercase" }} variant="h5" color="red">Ch??a ????nh gi??</Typography>
                                        </div>
                                    }
                                </Paper>
                                :
                                <Paper variant="outlined" className={classes.paper}>
                                    <Grid marginBottom={2}>
                                        <Typography style={{ textTransform: 'uppercase' }}>????nh gi?? ?????ng vi??n cu???i n??m</Typography>
                                        <Typography style={{ marginRight: 40 }} variant="body1">N??m: <b>{year}</b></Typography>
                                        <Typography variant="body1">Ch??a ?????n th???i gian ????nh gi??</Typography>
                                    </Grid>
                                </Paper>
                        }

                        {/* <TableContainer variant="outlined" component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Lo???i</TableCell>
                                <TableCell>Ti??u ch??</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={3}>
                                    - Ho??n th??nh xu???t s???c nhi???m v???<br />
                                </TableCell>
                                <TableCell sx={9}>
                                    <p style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                        - L?? ?????ng vi??n th???c s??? ti??u bi???u v??? n??ng l???c, ph???m ch???t ?????o ?????c, l???i s???ng, lu??n ?????i m???i, s??ng t???o, c?? nhi???u th??nh t??ch n???i b???t trong c??ng t??c ???????c c??c ?????ng vi??n kh??c h???c t???p, noi theo.<br />
                                        - C??c ti??u ch?? v??? k???t qu??? th???c hi???n nhi???m v??? ch??nh tr??? ???????c giao ?????u ?????t ???Xu???t s???c???; c??c ti??u ch?? c??n l???i ???????c ????nh gi?? ???T???t??? tr??? l??n.<br />
                                        - ?????ng vi??n l?? c??n b???, c??ng ch???c, vi??n ch???c ???????c x???p lo???i ???Ho??n th??nh xu???t s???c nhi???m v??????.
                                    </p>
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={3}>
                                    - Ho??n th??nh xu???t s???c nhi???m v???<br />
                                </TableCell>
                                <TableCell sx={9}>
                                    <p style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                        - C??c ti??u ch?? v??? k???t qu??? th???c hi???n nhi???m v??? ch??nh tr??? ???????c giao ?????t ???T???t??? tr??? l??n; nh???ng ti??u ch?? c??n l???i ?????t ???Trung b??nh??? tr??? l??n.

                                        - ?????ng vi??n l?? c??n b???, c??ng ch???c, vi??n ch???c ???????c x???p lo???i ???Ho??n th??nh t???t nhi???m v?????? tr??? l??n.
                                    </p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer> */}
                    </>
                }
            </Layout>
        </>
    );
};

export default Evaluate;