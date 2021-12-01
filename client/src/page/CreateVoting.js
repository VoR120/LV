import {
    Chip, Grid,
    MenuItem,
    Paper, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategory } from '../action/categoryAction';
import { createPoll } from '../action/votingAction';
import AddCandidateForm from '../component/AddCandidateForm';
import AddVoterForm from '../component/AddVoterForm';
import InputGrid from '../component/InputGrid';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
        width: '900px',
        margin: '0 auto'
        // width: 'fit-content'
    },
    title: {
        marginBottom: '20px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    },
    // inputItem: {
    //     marginBottom: theme.spacing(2),
    // },
}))

const CreateVoting = () => {
    const classes = useStyles();

    const { category, categoryDispatch } = useContext(CategoryContext);
    const { info } = useContext(InfoContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const [candidate, setCandidate] = useState([]);
    const [voter, setVoter] = useState([]);

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        clearErrors,
        getValues,
        reset,
        watch,
        formState: { errors }
    } = useForm();

    const ThoiGianBatDau = useRef({});
    ThoiGianBatDau.current = watch("ThoiGianBatDau", "");

    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }

    const onSubmit = async (data) => {
        if (candidate.length == 0)
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Bạn chưa chọn ứng cử viên",
                    type: "error"
                }
            })
        else if (voter.length == 0)
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Bạn chưa chọn đơn vị tham gia",
                    type: "error"
                }
            })
        else {
            data.UngCuVien = candidate.map(el => el.MaUngCuVien);
            data.NguoiThamGia = voter.map(el => el.MaNguoiThamGia);
            const res = await createPoll(data);
            if (res) {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "Đã tạo cuộc biểu quyết",
                        type: "success"
                    }
                })
                reset({
                    TenBieuQuyet: 0,
                    ThoiGianBatDau: "",
                    ThoiGianKetThuc: "",
                    SoPhieuToiDa: 1,
                    NoiDung: "",
                });
                setCandidate([]);
                setVoter([]);
            }
        }
    }

    useEffect(() => {
        getAllCategory(categoryDispatch, "achievement");
        getAllCategory(categoryDispatch, "partycell");
        getAllCategory(categoryDispatch, "position");
        getAllCategory(categoryDispatch, "grade");
    }, [])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Tạo Biểu quyết
                    </Typography>
                </div>
                <Paper className={classes.paper} variant="outlined">
                    <Typography style={{ textTransform: 'uppercase', marginBottom: 30 }}>Tạo biểu quyết</Typography>
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid item xs={4}>
                            <Typography>Tên biểu quyết</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputGrid
                                noTitle
                                name="TenBieuQuyet"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                            />

                            {/* <InputGrid
                                select
                                noTitle
                                defaultValue="0"
                                name="TenBieuQuyet"
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui lòng nhập trường này!" }}
                                onChange={(e) => setValue(e.target.name, e.target.value)}
                            >
                                <MenuItem value="0">Chọn</MenuItem>
                                {
                                    category.categories.achievement.map(el =>
                                        <MenuItem key={el.MaThanhTich} value={"Biểu quyết " + el.TenThanhTich}>Biểu quyết {el.TenThanhTich}</MenuItem>
                                    )
                                }
                            </InputGrid> */}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid item xs={4}>
                            <Typography>Thời gian bắt đầu</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputGrid
                                noTitle
                                type="datetime-local"
                                name="ThoiGianBatDau"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid xs={4}>
                            <Typography>Thời gian kết thúc</Typography>
                        </Grid>
                        <Grid xs={8}>
                            <InputGrid
                                noTitle
                                type="datetime-local"
                                name="ThoiGianKetThuc"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    validate: value =>
                                        new Date(value) >= new Date(ThoiGianBatDau.current) || "Ngày kết thúc phải lớn hơn ngày bắt đầu"
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputItem} alignItems="center" >
                        <Grid item xs={4}>
                            <Typography>Số phiếu tối đa</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputGrid
                                noTitle
                                type="number"
                                defaultValue="1"
                                name="SoPhieuToiDa"
                                control={control}
                                errors={errors}
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputItem} alignItems="center" >
                        <Grid item xs={4}>
                            <Typography>Nội dung biểu quyết</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputGrid
                                noTitle
                                multiline
                                minRows={3}
                                name="NoiDung"
                                control={control}
                                errors={errors}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '16px' }} >
                        <Grid item xs={4}>
                            <Typography>Ứng cử viên</Typography>
                        </Grid>
                        <Grid item container xs={8}>
                            {
                                candidate.length > 0 &&
                                candidate.map(el =>
                                    <Grid item xs={12}>
                                        <Chip style={{ marginBottom: '12px' }}
                                            size="medium"
                                            varian="outlined"
                                            label={el.HoTen + " - " + el.MaUngCuVien}
                                        />
                                    </Grid>
                                )
                            }
                            <Grid item xs={12}>
                                <AddCandidateForm setCandidate={setCandidate} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '16px' }} >
                        <Grid item xs={4}>
                            <Typography>Đơn vị tham gia</Typography>
                        </Grid>
                        <Grid item container xs={8}>
                            <Grid item xs={12}>
                                {
                                    voter.length > 0 &&
                                    voter.map(el =>
                                        <Chip style={{ marginBottom: '12px', marginRight: '4px' }}
                                            size="small"
                                            varian="outlined"
                                            label={el.HoTen + " - " + el.MaNguoiThamGia}
                                        />
                                    )
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <AddVoterForm setVoter={setVoter} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '16px' }} >
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={8}>
                            <MyButton onClick={handleSubmit(onSubmit)} info>Tạo</MyButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Layout>
        </>
    );
};

export default CreateVoting;