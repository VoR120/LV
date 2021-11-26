import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    MenuItem,
    Chip
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import InputGrid from '../component/InputGrid';
import { useHistory } from 'react-router';
import { CategoryContext } from '../contextAPI/CategoryContext';
import AddCandidateForm from '../component/AddCandidateForm';
import AddVoterForm from '../component/AddVoterForm';
import DeleteVotingForm from '../component/DeleteVotingForm';
import { getAllPoll } from '../action/votingAction';
import { LoadingContext } from '../contextAPI/LoadingContext';


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
        marginTop: '20px',
        // width: 'fit-content'
    },
    paperForm: {
        padding: '16px',
        marginBottom: '16px',
        marginTop: '20px',
        width: '900px',
        margin: '0 auto'
    },
    title: {
        marginBottom: '20px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    },
}))

const Voting = () => {
    const classes = useStyles();
    const history = useHistory();
    const [candidate, setCandidate] = useState([]);
    const [voter, setVoter] = useState([]);
    const [pollArr, setPollArr] = useState([]);
    const { loadingDispatch } = useContext(LoadingContext)
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);

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

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState([]);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [editState, setEditState] = useState(null);

    const handleToggle = () => {
        setOpen(!open)
    }

    const handleEditToggle = (data, index) => {
        setEditState(data);
        let newEdit = [];
        newEdit[index] = !editOpen[index]
        setEditOpen(newEdit);
    }

    const onSubmit = () => {

    }

    useEffect(() => {
        const fetchAllPoll = async () => {
            const res = await getAllPoll();
            if (res) {
                setPollArr(res);
                loadingDispatch({ type: 'CLOSE_LOADING' })
            }
        }
        loadingDispatch({ type: 'OPEN_LOADING' })
        fetchAllPoll();
    }, [])

    const getDate = (date) => {
        const dateObj = new Date(date)
        const offset = dateObj.getTimezoneOffset()
        let newDate = new Date(dateObj.getTime() - (offset * 60 * 1000))
        return newDate.toISOString().slice(0, 16)
    }

    useEffect(() => {
        if (editState != null) {
            console.log(getDate(editState.ThoiGianKetThuc));
            setValue("TenBieuQuyet", editState.TenBieuQuyet);
            setValue("NoiDung", editState.NoiDung);
            setValue("SoPhieuToiDa", editState.SoPhieuToiDa);
            setValue("ThoiGianBatDau", getDate(editState.ThoiGianBatDau))
            setValue("ThoiGianKetThuc", getDate(editState.ThoiGianKetThuc))
            setCandidate(editState.UngCuVien);
            setVoter(editState.NguoiThamGia)
        }
    }, [editState])

    const VotingResultForm = () => {
        return (
            <Paper className={classes.paper} variant="outlined">
                <Typography textAlign="center" style={{ marginBottom: '40px' }} variant="h5">
                    Biểu quyết khen thưởng Đảng viên hoàn thành xuất sắc nhiệm vụ 5 năm
                </Typography>
                <Typography marginBottom="8px">Nội dung: Biểu quyết khen thưởng Đảng viên hoàn thành xuất sắc nhiệm  xuất sắc nhiệm  xuất sắc nhiệm vụ 5 năm</Typography>
                <Typography marginBottom="8px">Thời gian: <b>00:00 25/12/2021 - 23:59 27/12/2021</b></Typography>
                <Typography marginBottom="8px">Số phiếu tối đa: <b>2</b></Typography>
                <Typography marginBottom="8px">Số phiếu biểu quyết: <b>38/40</b></Typography>
                <Bar
                    width="500px"
                    data={{
                        labels: [
                            "Nguyễn Văn Vỏ - B1706895",
                            "Nguyễn Văn Dỏ - B1706001",
                            "Nguyễn Văn Giỏ - B1706002",
                            "Nguyễn Văn Giỏ - B1706002",
                            "Nguyễn Văn Giỏ - B1706002",
                            "Nguyễn Văn Giỏ - B1706002",
                        ],
                        datasets: [
                            {
                                label: "Số phiếu",
                                backgroundColor: [
                                    "#3e95cd",
                                    "#8e5ea2",
                                    "#3cba9f",
                                    "#e8c3b9",
                                    "#c45850"
                                ],
                                data: [30, 29, 25, 20, 5, 40]
                            }
                        ]
                    }}
                    options={{
                        legend: { display: true },
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        },
                    }}
                />
            </Paper>
        )
    }

    const checkOpen = () => {
        return editOpen.length > 0 ? !editOpen.every(el => el == false) : false
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Quản lý Biểu quyết
                    </Typography>
                </div>
                <Grid style={{ width: '100%' }} container spacing={2}>
                    {pollArr.length > 0 ?
                        pollArr.map((el, index) =>
                            <Grid item xs={6} key={el.MaBieuQuyet}>
                                <Paper className={classes.paper} variant="outlined">
                                    <Grid container justifyContent="space-between" marginBottom="40px">
                                        <Typography variant="button">
                                            {new Date(el.ThoiGianBatDau).toLocaleString()} - {new Date(el.ThoiGianKetThuc).toLocaleString()}
                                        </Typography>
                                        <Typography color="gray" variant="button">Chưa bắt đầu</Typography>
                                    </Grid>
                                    <Typography textAlign="center" className={classes.title} variant="h5">
                                        {el.TenBieuQuyet}
                                    </Typography>
                                    <Typography textAlign="center" className={classes.title}>
                                        {el.NoiDung}
                                    </Typography>
                                    <Typography textAlign="center" className={classes.title}>
                                        Số phiếu tối đa: <b>{el.SoPhieuToiDa}</b>
                                    </Typography>
                                    <Grid container justifyContent="center">
                                        <MyButton onClick={handleToggle} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                            {open ? 'Ẩn' : 'Xem kết quả'}
                                        </MyButton>
                                        <MyButton onClick={() => handleEditToggle(el, index)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                            {editOpen[index] ? 'Hủy' : 'Chỉnh sửa'}
                                        </MyButton>
                                        <DeleteVotingForm />
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                        :
                        <Typography>Không có cuộc biểu quyết nào đang diễn ra</Typography>
                    }
                    {/* <Grid item xs={6}>
                        <Paper className={classes.paper} variant="outlined">
                            <div className={classes.flex}>
                                <Typography variant="button">00:00 25/12/2021 - 23:59 27/12/2021</Typography>
                                <Typography color="red" variant="button">Đã kết thúc</Typography>
                            </div>
                            <Typography textAlign="center" className={classes.title} variant="h5">
                                Biểu quyết khen thưởng Đảng viên hoàn thành xuất sắc nhiệm vụ 5 năm
                            </Typography>
                            <VotingResultForm />
                        </Paper>
                    </Grid> */}
                    {open &&
                        <Grid item xs={12}>
                            <VotingResultForm />
                        </Grid>
                    }
                    {checkOpen() &&
                        <Grid item xs={12}>
                            <Paper className={classes.paperForm} variant="outlined">
                                <Typography style={{ textTransform: 'uppercase', marginBottom: 30 }}>Cập nhật biểu quyết</Typography>
                                <Grid container className={classes.inputItem} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography>Tên biểu quyết</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <InputGrid
                                            noTitle
                                            name="TenBieuQuyet"
                                            defaultValue="0"
                                            control={control}
                                            errors={errors}
                                            rules={{
                                                required: "Vui lòng nhập trường này!",
                                            }}
                                        />
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
                                            defaultValue="0"
                                            control={control}
                                            errors={errors}
                                            rules={{
                                                required: "Vui lòng nhập trường này!",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.inputItem} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography>Thời gian kết thúc</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <InputGrid
                                            noTitle
                                            type="datetime-local"
                                            name="ThoiGianKetThuc"
                                            defaultValue="0"
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
                                            defaultValue=""
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
                                        <MyButton onClick={handleSubmit(onSubmit)} info>Lưu</MyButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    }
                </Grid>
            </Layout>
        </>
    );
};

export default Voting;