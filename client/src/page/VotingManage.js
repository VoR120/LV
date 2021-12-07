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
    Chip,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
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
import { getAllPoll, getResult, updatePoll } from '../action/votingAction';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { getDateStatus, getDateTime, getLocaleDateTime, getStatus } from '../utils/utils';
import { getAllCategory } from '../action/categoryAction';
import MaterialTable from '@material-table/core';
import SaveResult from '../component/SaveResult';


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
        marginBottom: '14px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    },
    table: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px',
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
    const [open, setOpen] = useState([]);
    const [editOpen, setEditOpen] = useState([]);
    const [editState, setEditState] = useState(null);
    const [resultState, setResultState] = useState(null);
    const [label, setLabel] = useState([])
    const [quantity, setQuantity] = useState([]);
    const [quantityPer, setQuantityPer] = useState("")
    const [resultVoting, setResultVoting] = useState([])
    const [indexForm, setIndexForm] = useState("")

    console.log(resultState);

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

    const handleToggle = (data, index) => {
        setEditOpen([]);
        setResultState(data);
        setIndexForm(index)
        let newOpen = [];
        newOpen[index] = !open[index]
        setOpen(newOpen);
    }

    const handleEditToggle = (data, index) => {
        setOpen([])
        setEditState(data);
        setIndexForm(index)
        let newEdit = [];
        newEdit[index] = !editOpen[index]
        setEditOpen(newEdit);
    }

    const fetchAllPoll = async () => {
        const res = await getAllPoll();
        if (res) {
            setPollArr(res);
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
    }

    useEffect(() => {
        const getResultAPI = async () => {
            const res = await getResult({ id: resultState.MaBieuQuyet })
            console.log(res);
            setResultVoting(res.Data)
            setLabel(res.Data.map(el => `${el.MaSoDangVien} - ${el.HoTen}`));
            setQuantity(res.Data.map(el => el.SoPhieu));
            setQuantityPer(res.SoLuongBieuQuyet + "/" + res.SoLuong)
        }
        resultState &&
            getResultAPI()
    }, [resultState])

    const onSubmit = async (data) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        data.UngCuVien = candidate.map(el => el.MaUngCuVien);
        data.NguoiThamGia = voter.map(el => el.MaNguoiThamGia);
        const res = await updatePoll(data);
        if (res) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
            fetchAllPoll();
        } else
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã xảy ra lỗi!",
                    type: "error"
                }
            })
        loadingDispatch({ type: 'CLOSE_LOADING' })
        setEditOpen([]);
    }

    useEffect(() => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        fetchAllPoll();
    }, [])

    useEffect(() => {
        if (editState != null) {
            setValue("MaBieuQuyet", editState.MaBieuQuyet);
            setValue("TenBieuQuyet", editState.TenBieuQuyet);
            setValue("NoiDung", editState.NoiDung);
            setValue("ThoiGianNhacNho", editState.ThoiGianNhacNho);
            setValue("PhamVi", editState.PhamVi);
            setValue("SoPhieuToiDa", editState.SoPhieuToiDa);
            setValue("ThoiGianBatDau", getDateTime(editState.ThoiGianBatDau))
            setValue("ThoiGianKetThuc", getDateTime(editState.ThoiGianKetThuc))
            setCandidate(editState.UngCuVien);
            setVoter(editState.NguoiThamGia)
        }
    }, [editState])

    useEffect(() => {
        getAllCategory(categoryDispatch, "achievement");
        getAllCategory(categoryDispatch, "partycell");
        getAllCategory(categoryDispatch, "position");
        getAllCategory(categoryDispatch, "grade");
    }, [])

    const VotingResultForm = () => {

        const [openResult, setOpenResult] = useState(false);
        const [data, setData] = useState([]);

        const columns = [
            { title: "Mã số Đảng viên", field: "MaSoDangVien", },
            { title: "Họ tên", field: "HoTen", },
            { title: "Số phiếu", field: "SoPhieu", },
        ];

        const rows = resultVoting.map((el, index) => ({
            id: index,
            HoTen: el.HoTen,
            MaSoDangVien: el.MaSoDangVien,
            SoPhieu: el.SoPhieu
        }));

        return (
            <Paper className={classes.paper} variant="outlined">
                <Typography textAlign="center" style={{ marginBottom: '40px' }} variant="h5">
                    {resultState.TenBieuQuyet}
                </Typography>
                <Typography marginBottom="8px">Nội dung: {resultState.NoiDung}</Typography>
                <Typography marginBottom="8px">Thời gian: <b>00:00 25/12/2021 - 23:59 27/12/2021</b></Typography>
                <Typography marginBottom="8px">Số phiếu tối đa: <b>{resultState.SoPhieuToiDa}</b></Typography>
                <Typography marginBottom="8px">Số người biểu quyết: <b>{quantityPer}</b></Typography>
                <Bar
                    width="500px"
                    data={{
                        labels: label
                        ,
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
                                data: quantity
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

                <TableContainer sx={{ width: '800px', margin: '0 auto', marginTop: '40px' }} variant="outlined">
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={"Bảng kết quả"}
                        columns={columns}
                        data={rows}

                        actions={[
                            {
                                // isFreeAction: true,
                                icon: 'save',
                                tooltip: 'Lưu',
                                onClick: (event, rowData) => {
                                    setData(rowData);
                                    setOpenResult(true)
                                },
                            },
                        ]}

                        options={{
                            sorting: false,
                            search: false,
                            paging: false,
                            padding: 'dense',
                            selection: true
                        }}
                    />
                </TableContainer>
                <SaveResult
                    open={openResult}
                    setOpen={setOpenResult}
                    data={data}
                    name={resultState.TenBieuQuyet}
                />
            </Paper>
        )
    }

    const checkEditOpen = (index) => {
        return (editOpen.length > 0 && index == indexForm) ? !editOpen.every(el => el == false) : false
    }
    const checkOpen = (index) => {
        return (open.length > 0 && index == indexForm) ? !open.every(el => el == false) : false
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
                            <>
                                <Grid item xs={6} key={el.MaBieuQuyet}>
                                    <Paper className={classes.paper} variant="outlined">
                                        <Grid container justifyContent="space-between" marginBottom="40px">
                                            <Typography variant="button">
                                                {getLocaleDateTime(el.ThoiGianBatDau)} - {getLocaleDateTime(el.ThoiGianKetThuc)}
                                            </Typography>
                                            <Typography color="gray" variant="button">{getDateStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc)}</Typography>
                                        </Grid>
                                        <Typography textAlign="center" className={classes.title} variant="h5">
                                            {el.TenBieuQuyet}
                                        </Typography>
                                        <Typography textAlign="center" className={classes.title}>
                                            {el.NoiDung}
                                        </Typography>
                                        <Typography textAlign="center" className={classes.title}>
                                            Phạm vi: <b>{el.PhamVi}</b>
                                        </Typography>
                                        <Typography textAlign="center" className={classes.title}>
                                            Số phiếu tối đa: <b>{el.SoPhieuToiDa}</b>
                                        </Typography>
                                        <Grid container justifyContent="center">
                                            {getStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc) == 2 &&
                                                <MyButton onClick={() => handleToggle(el, index)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                    {open[index] ? 'Ẩn' : 'Xem kết quả'}
                                                </MyButton>
                                            }
                                            {/* {getStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc) == 0 && */}
                                            <MyButton onClick={() => handleEditToggle(el, index)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                {editOpen[index] ? 'Hủy' : 'Chỉnh sửa'}
                                            </MyButton>
                                            <MyButton primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                Gửi mail
                                            </MyButton>
                                            {/* } */}
                                            <DeleteVotingForm data={el} />
                                        </Grid>

                                    </Paper>
                                </Grid>
                                {checkOpen(index) &&
                                    <Grid item xs={12}>
                                        <VotingResultForm />
                                    </Grid>
                                }
                                {checkEditOpen(index) &&
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
                                                    <Typography>Phạm vi</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        noTitle
                                                        name="PhamVi"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            required: "Vui lòng nhập trường này!",
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.inputItem} alignItems="center" >
                                                <Grid item xs={4}>
                                                    <Typography>Thời gian nhắc nhở (phút)</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        noTitle
                                                        type="number"
                                                        InputProps={{ inputProps: { min: 10 } }}
                                                        defaultValue="10"
                                                        name="ThoiGianNhacNho"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            required: "Vui lòng nhập trường này!",
                                                        }}
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
                                                    <MyButton onClick={handleSubmit(onSubmit)} info>Lưu</MyButton>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                }
                            </>
                        )
                        :
                        <Typography>Không có cuộc biểu quyết nào đang diễn ra</Typography>
                    }
                </Grid>
            </Layout>
        </>
    );
};

export default Voting;