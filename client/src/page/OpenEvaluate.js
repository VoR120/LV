import {
    Grid,
    MenuItem,
    Paper, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getTimeEvaluate, setTimeEvaluate } from '../action/evaluateAction';
import InputGrid from '../component/InputGrid';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { getDate, getTimeWithStartHour } from '../utils/utils';

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

const OpenEvaluate = () => {
    const classes = useStyles();

    // ContextAPI
    const { openSnackbarDispatch } = useContext(SnackbarContext)
    const { loadingDispatch } = useContext(LoadingContext)

    // State
    const {
        handleSubmit,
        control,
        setValue,
        setError,
        clearErrors,
        getValues,
        watch,
        formState: { errors }
    } = useForm();

    const [year, setYear] = useState((new Date).getFullYear())

    const pmFrom = useRef({});
    pmFrom.current = watch("pmFrom", "");
    const subjectFrom = useRef({});
    subjectFrom.current = watch("subjectFrom", "")
    const departmentFrom = useRef({});
    departmentFrom.current = watch("departmentFrom", "")

    // Handle Function
    const handleChangeYear = (e) => {
        setValue(e.target.name, e.target.value);
        setYear(e.target.value)
    }



    const onSubmit = async (data) => {
        const res = await setTimeEvaluate(data);
        if (res.status == 201) {
            await fetchAPI();
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "???? c???p nh???t!",
                    type: "success"
                }
            })
        }
    }

    // UseEffect
    const fetchAPI = async () => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        const res = await getTimeEvaluate({ Nam: year });
        console.log(res);
        if (res.length > 0) {
            res.map(el => {
                if (el.MaDVDG == 1) {
                    setValue("pmFrom", getDate(el.ThoiGianBatDau))
                    setValue("pmTo", getDate(el.ThoiGianKetThuc))
                }
                if (el.MaDVDG == 2) {
                    setValue("subjectFrom", getDate(el.ThoiGianBatDau))
                    setValue("subjectTo", getDate(el.ThoiGianKetThuc))
                }
                if (el.MaDVDG == 3) {
                    setValue("departmentFrom", getDate(el.ThoiGianBatDau))
                    setValue("departmentTo", getDate(el.ThoiGianKetThuc))
                }
            })
        } else {
            setValue("pmFrom", "")
            setValue("pmTo", "")
            setValue("subjectFrom", "")
            setValue("subjectTo", "")
            setValue("departmentFrom", "")
            setValue("departmentTo", "")
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

    useEffect(() => {
        fetchAPI();
    }, [])

    useEffect(() => {
        fetchAPI();
    }, [year])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        M??? ????nh gi?? ?????ng vi??n
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Typography style={{ textTransform: 'uppercase', marginBottom: 30 }}>M??? ????nh gi?? ?????ng vi??n cu???i n??m</Typography>
                    <Grid xs={3}>
                        <InputGrid
                            select
                            name="year"
                            nameTitle="N??m"
                            defaultValue={(new Date).getFullYear()}
                            onChange={handleChangeYear}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value={`${(new Date).getFullYear() - 2}`}>{(new Date).getFullYear() - 2}</MenuItem>
                            <MenuItem value={`${(new Date).getFullYear() - 1}`}>{(new Date).getFullYear() - 1}</MenuItem>
                            <MenuItem value={`${(new Date).getFullYear()}`}>{(new Date).getFullYear()}</MenuItem>
                            <MenuItem value={`${(new Date).getFullYear() + 1}`}>{(new Date).getFullYear() + 1}</MenuItem>
                            <MenuItem value={`${(new Date).getFullYear() + 2}`}>{(new Date).getFullYear() + 2}</MenuItem>
                        </InputGrid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2} marginBottom={2}>
                        <Grid item xs={2} marginTop={2}>C?? nh??n ????nh gi??</Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ng??y b???t ?????u"
                                name="pmFrom"
                                rules={require}
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui l??ng nh???p tr?????ng n??y!" }}
                            />
                        </Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ng??y k???t th??c"
                                name="pmTo"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui l??ng nh???p tr?????ng n??y!",
                                    validate: value =>
                                        new Date(value) >= getTimeWithStartHour(pmFrom.current) || "Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2} marginBottom={2}>
                        <Grid item xs={2} marginTop={2}>B??? m??n ????nh gi??</Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ng??y b???t ?????u"
                                name="subjectFrom"
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui l??ng nh???p tr?????ng n??y!" }}
                            />
                        </Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ng??y k???t th??c"
                                name="subjectTo"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui l??ng nh???p tr?????ng n??y!",
                                    validate: value =>
                                        new Date(value) >= getTimeWithStartHour(subjectFrom.current) || "Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2} marginBottom={2}>
                        <Grid item xs={2} marginTop={2}>Khoa ????nh gi??</Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ng??y b???t ?????u"
                                name="departmentFrom"
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui l??ng nh???p tr?????ng n??y!" }}
                            />
                        </Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ng??y k???t th??c"
                                name="departmentTo"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui l??ng nh???p tr?????ng n??y!",
                                    validate: value =>
                                        new Date(value) >= getTimeWithStartHour(departmentFrom.current) || "Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <MyButton onClick={handleSubmit(onSubmit)} style={{ marginTop: 16 }} info>M??? ????nh gi??</MyButton>
                </Paper>
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
            </Layout>
        </>
    );
};

export default OpenEvaluate;