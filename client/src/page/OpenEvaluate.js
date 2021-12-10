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
                    msg: "Đã cập nhật!",
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
                        Mở đánh giá Đảng viên
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Typography style={{ textTransform: 'uppercase', marginBottom: 30 }}>Mở đánh giá Đảng viên cuối năm</Typography>
                    <Grid xs={3}>
                        <InputGrid
                            select
                            name="year"
                            nameTitle="Năm"
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
                        <Grid item xs={2} marginTop={2}>Cá nhân đánh giá</Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ngày bắt đầu"
                                name="pmFrom"
                                rules={require}
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui lòng nhập trường này!" }}
                            />
                        </Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ngày kết thúc"
                                name="pmTo"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    validate: value =>
                                        new Date(value) >= getTimeWithStartHour(pmFrom.current) || "Ngày kết thúc phải lớn hơn ngày bắt đầu"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2} marginBottom={2}>
                        <Grid item xs={2} marginTop={2}>Bộ môn đánh giá</Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ngày bắt đầu"
                                name="subjectFrom"
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui lòng nhập trường này!" }}
                            />
                        </Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ngày kết thúc"
                                name="subjectTo"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    validate: value =>
                                        new Date(value) >= getTimeWithStartHour(subjectFrom.current) || "Ngày kết thúc phải lớn hơn ngày bắt đầu"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={2} marginBottom={2}>
                        <Grid item xs={2} marginTop={2}>Khoa đánh giá</Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ngày bắt đầu"
                                name="departmentFrom"
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui lòng nhập trường này!" }}
                            />
                        </Grid>
                        <Grid item container xs={4}>
                            <InputGrid
                                center
                                type="date"
                                nameTitle="Ngày kết thúc"
                                name="departmentTo"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    validate: value =>
                                        new Date(value) >= getTimeWithStartHour(departmentFrom.current) || "Ngày kết thúc phải lớn hơn ngày bắt đầu"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <MyButton onClick={handleSubmit(onSubmit)} style={{ marginTop: 16 }} info>Mở đánh giá</MyButton>
                </Paper>
                {/* <TableContainer variant="outlined" component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Loại</TableCell>
                                <TableCell>Tiêu chí</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={3}>
                                    - Hoàn thành xuất sắc nhiệm vụ<br />
                                </TableCell>
                                <TableCell sx={9}>
                                    <p style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                        - Là Đảng viên thực sự tiêu biểu về năng lực, phẩm chất đạo đức, lối sống, luôn đổi mới, sáng tạo, có nhiều thành tích nổi bật trong công tác được các Đảng viên khác học tập, noi theo.<br />
                                        - Các tiêu chí về kết quả thực hiện nhiệm vụ chính trị được giao đều đạt “Xuất sắc”; các tiêu chí còn lại được đánh giá “Tốt” trở lên.<br />
                                        - Đảng viên là cán bộ, công chức, viên chức được xếp loại “Hoàn thành xuất sắc nhiệm vụ”.
                                    </p>
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={3}>
                                    - Hoàn thành xuất sắc nhiệm vụ<br />
                                </TableCell>
                                <TableCell sx={9}>
                                    <p style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                        - Các tiêu chí về kết quả thực hiện nhiệm vụ chính trị được giao đạt “Tốt” trở lên; những tiêu chí còn lại đạt “Trung bình” trở lên.

                                        - Đảng viên là cán bộ, công chức, viên chức được xếp loại “Hoàn thành tốt nhiệm vụ” trở lên.
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