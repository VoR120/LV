import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategory } from '../action/categoryAction';
import AddCandidateForm from '../component/AddCandidateForm';
import AddVoterForm from '../component/AddVoterForm';
import AddVotingForm from '../component/AddVotingForm';
import InputGrid from '../component/InputGrid';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { getTimeWithStartHour } from '../utils/utils';

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
    const [candidate, setCandidate] = useState([]);
    const [voter, setVoter] = useState([]);

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

    const ThoiGianBatDau = useRef({});
    ThoiGianBatDau.current = watch("ThoiGianBatDau", "");

    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }

    const onSubmit = (data) => {
        console.log(data);
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
                                select
                                noTitle
                                defaultValue="0"
                                name="TenBieuQuyet"
                                rules={require}
                                control={control}
                                errors={errors}
                                rules={{ required: "Vui lòng nhập trường này!" }}
                                onChange={(e) => setValue(e.target.name, e.target.value)}
                            >
                                <MenuItem value="0">Chọn</MenuItem>
                                {
                                    category.categories.achievement.map(el =>
                                        <MenuItem key={el.MaThanhTich} value={el.MaThanhTich}>Biểu quyết {el.TenThanhTich}</MenuItem>
                                    )
                                }
                            </InputGrid>
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
                                rules={require}
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
                                rules={require}
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
                    <Grid container style={{ marginTop: '16px' }} >
                        <Grid item xs={4}>
                            <Typography>Số phiếu tối đa</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField defaultValue="1" InputProps={{ inputProps: { min: 1} }} fullWidth type="number" size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '16px' }} >
                        <Grid item xs={4}>
                            <Typography>Nội dung biểu quyết</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth multiline minRows="3" size="small" variant="outlined" />
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
                                            label={el.HoTen + " - " + el.MaSoDangVien}
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
                                            label={el.HoTen + " - " + el.MaSoDangVien}
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