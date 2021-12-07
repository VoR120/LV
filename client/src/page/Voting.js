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
    Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { checkIsVoted, getAllPoll, vote } from '../action/votingAction'
import { LoadingContext } from '../contextAPI/LoadingContext';
import { getDateStatus, getLocaleDateTime, getStatus } from '../utils/utils';
import { InfoContext } from '../contextAPI/InfoContext';


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
    title: {
        marginBottom: '14px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    },
    votedBtn: {
        cursor: "default",
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
    checkbox: {
        color: 'green !important',
    }
}))

const Voting = () => {
    const classes = useStyles();
    const { loadingDispatch } = useContext(LoadingContext)
    const [pollArr, setPollArr] = useState([]);

    const getStatus = (startDate, finishDate) => {
        if (new Date() < new Date(startDate)) {
            return 0
        }
        if (new Date() >= new Date(startDate) && new Date() <= new Date(finishDate)) {
            return 1
        }
        if (new Date() >= new Date(finishDate)) {
            return 2
        }
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

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Biểu quyết
                    </Typography>
                </div>
                <Grid style={{ width: '100%' }} container spacing={2}>
                    {pollArr.length > 0 ?
                        pollArr.map(el =>
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
                                        <VotingForm data={el} />
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                        :
                        <Typography>Không có cuộc biểu quyết nào đang diễn ra</Typography>
                    }
                </Grid>
            </Layout>
        </>
    );
};

const VotingForm = ({ data }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const [checkedValues, setCheckedValues] = useState([]);
    const { openSnackbarDispatch } = useContext(SnackbarContext)
    const { info } = useContext(InfoContext);
    const [isVoted, setIsVoted] = useState(false);

    const [candidate, setCandidate] = useState([
        { MaSoDangVien: "B1706895", HoTen: "Nguyễn Văn Vỏ" },
        { MaSoDangVien: "B1706001", HoTen: "Nguyễn Văn Dỏ" },
        { MaSoDangVien: "B1706002", HoTen: "Nguyễn Văn Giỏ" },
    ]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const { control, getValues, setValue, register } = useForm();

    function handleSelect(e, checkedName) {
        const newNames = checkedValues?.includes(checkedName)
            ? checkedValues?.filter(name => name !== checkedName)
            : [...(checkedValues ?? []), checkedName];
        setCheckedValues(newNames);

        return newNames;
    }

    const handleSubmit = async () => {
        if (checkedValues.length > data.SoPhieuToiDa) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `Được chọn nhiều nhất ${data.SoPhieuToiDa} ứng cử viên`,
                    type: "error"
                }
            })
        }
        else if (checkedValues.length == 0) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `Phải chọn ít nhất 1 ứng cử viên`,
                    type: "error"
                }
            })
        } else {
            const candidateArr = {};
            data.UngCuVien.map(el => {
                if (checkedValues.includes(el.MaUngCuVien))
                    candidateArr[el.MaUngCuVien] = 1
                else
                    candidateArr[el.MaUngCuVien] = 0
            })
            const votes = {
                MaBieuQuyet: data.MaBieuQuyet,
                MaNguoiThamGia: info.info.MaSoDangVien,
                UngCuVien: candidateArr,
            }
            const res = await vote(votes)
            if (res) {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: res.msg,
                        type: "success"
                    }
                })
                fetchCheck();
            }
            setOpen(false);
        }
    }

    const fetchCheck = async () => {
        const res = await checkIsVoted({
            MaBieuQuyet: data.MaBieuQuyet,
            MaNguoiThamGia: info.info.MaSoDangVien,
        });
        if (res) {
            console.log(res);
            setIsVoted(res.isVoted);
            setCheckedValues(Object.keys(res.Phieu).map(el => {
                if (res.Phieu[el] == 1)
                    return el
            }))
        }
    }

    useEffect(() => {
        fetchCheck();
    }, [])

    return (
        <>
            {isVoted ?
                <>
                    <Button disableRipple disableElevation className={classes.votedBtn} variant="contained" color="success">Đã biểu quyết</Button>
                    <Button onClick={handleOpen} sx={{ marginLeft: 1 }} variant="outlined">Xem</Button>
                </>
                :
                <MyButton
                    disabled={getStatus(data.ThoiGianBatDau, data.ThoiGianKetThuc) != 1}
                    onClick={handleOpen}
                    primary>
                    Biểu quyết
                </MyButton>
            }
            <Dialog PaperProps={{ style: { minWidth: "700px" } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Biểu quyết</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography className={classes.title} alignItems="center" variant="h5">
                        {data.TenBieuQuyet}
                    </Typography>
                    <Typography marginBottom="8px">Nội dung: {data.NoiDung}</Typography>
                    <Typography marginBottom="8px">
                        Thời gian: <b>{getLocaleDateTime(data.ThoiGianBatDau)} - {getLocaleDateTime(data.ThoiGianKetThuc)}</b>
                    </Typography>
                    <Typography marginBottom="8px">Số phiếu tối đa: <b>{data.SoPhieuToiDa}</b></Typography>
                    <FormGroup>
                        {data.UngCuVien.map(el =>
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="names"
                                        render={({ props }) => {
                                            return (
                                                <Checkbox
                                                    className={classes.checkbox}
                                                    disabled={isVoted}
                                                    checked={checkedValues.includes(el.MaUngCuVien)}
                                                    onChange={(e) => handleSelect(e, el.MaUngCuVien)}
                                                />
                                            );
                                        }}
                                        control={control}
                                    />
                                }
                                key={el.MaUngCuVien}
                                label={el.HoTen + " - " + el.MaUngCuVien}
                            />
                        )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    {
                        isVoted ?
                            <Button onClick={handleClose} >
                                Thoát
                            </Button>
                            :
                            <>
                                <Button onClick={handleClose} >
                                    Hủy
                                </Button>
                                <MyButton onClick={handleSubmit} success>
                                    Đồng ý
                                </MyButton>
                            </>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Voting;