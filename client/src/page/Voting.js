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
    Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { checkIsVoted, getAllPoll, vote } from '../action/votingAction';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { getDateStatus, getLocaleDateTime, getStatus } from '../utils/utils';
import image from '../public/image/not_found.webp'


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
    const { info } = useContext(InfoContext);
    console.log(info);
    const [pollArr, setPollArr] = useState([]);
    const DePer = info.info.Quyen["12"];

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
            const res = DePer
                ? await getAllPoll()
                : await getAllPoll({ MaSoDangVien: info.info.MaSoDangVien });
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
                                    {
                                        el.LoaiBieuQuyet == "Biểu quyết có số dư" ?
                                            <Typography textAlign="center" className={classes.title}>
                                                Số phiếu tối đa: <b>{el.SoPhieuToiDa}</b>
                                            </Typography>
                                            :
                                            <Typography textAlign="center" className={classes.title}>
                                                {el.LoaiBieuQuyet}
                                            </Typography>
                                    }
                                    <Grid container justifyContent="center">
                                        <VotingForm data={el} />
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                        :
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "calc( 50% + 127px )",
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                p: '30px 80px'
                            }}
                        >
                            <img src={image} alt="not-found"></img>
                            <Typography>Không có cuộc biểu quyết nào</Typography>
                        </div>
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
    const [check, setCheck] = useState([]);

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

    function handleRadioSelect(e) {
        const name = e.target.value.split("=")[0]
        const value = e.target.value.split("=")[1]
        setCheck(check.includes(name) ? check : [...check, name])

        const newNames = (checkedValues?.includes(name) && value == 0)
            ? checkedValues?.filter(n => n !== name)
            : [...(checkedValues ?? []), name];
        setCheckedValues(newNames);

    }

    const handleSubmit = async () => {
        if (checkedValues.length > data.SoPhieuToiDa && data.LoaiBieuQuyet == "Biểu quyết có số dư") {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `Được chọn nhiều nhất ${data.SoPhieuToiDa} ứng cử viên`,
                    type: "error"
                }
            })
        }
        else if (checkedValues.length == 0 && data.LoaiBieuQuyet == "Biểu quyết có số dư") {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `Phải chọn ít nhất 1 ứng cử viên`,
                    type: "error"
                }
            })
        } else if (check.length < data.UngCuVien.length && data.LoaiBieuQuyet == "Biểu quyết tín nhiệm") {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `Phải chọn tín nhiệm hoặc không`,
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
            res.isVoted &&
                setCheckedValues(Object.keys(res.Phieu).map(el => {
                    if (res.Phieu[el] == 1)
                        return el
                }))
        }
    }

    useEffect(() => {
        fetchCheck();
    }, [])

    useEffect(() => {
        console.log(check);
    }, [check])

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
                    {
                        data.LoaiBieuQuyet == "Biểu quyết có số dư" ?
                            <>
                                <Typography marginBottom="8px">
                                    Loại biểu quyết: Biểu quyết có số dư
                                </Typography>
                                <Typography marginBottom="8px">
                                    Số phiếu tối đa: <b>{data.SoPhieuToiDa}</b>
                                </Typography>
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
                            </>
                            :
                            <>
                                <Typography marginBottom="8px">
                                    Loại biểu quyết: {data.LoaiBieuQuyet}
                                </Typography>
                                <TableContainer variant="outlined" component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ width: '50%' }}>Ứng cử viên</TableCell>
                                                <TableCell align='center' sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                                    <Typography>Tín nhiệm</Typography>
                                                    <Typography>Không tín nhiệm</Typography>
                                                </TableCell>
                                                {/* <TableCell align='center' sx={{ width: '25%' }}>Không tín nhiệm</TableCell> */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.UngCuVien.map(el =>
                                                <TableRow
                                                    key={el.MaUngCuVien}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>
                                                        {el.HoTen + " - " + el.MaUngCuVien}
                                                    </TableCell>
                                                    {/* <FormControlLabel
                                                            control={ */}
                                                    <Controller
                                                        name="names"
                                                        render={({ props }) => {
                                                            return (
                                                                <RadioGroup onChange={handleRadioSelect}>
                                                                    <TableCell align='center'>
                                                                        <FormControlLabel
                                                                            value={el.MaUngCuVien + "=1"}
                                                                            control={<Radio sx={{ m: '0 50px' }} />}
                                                                            label=""
                                                                        />
                                                                        <FormControlLabel
                                                                            value={el.MaUngCuVien + "=0"}
                                                                            control={<Radio sx={{ m: '0 50px' }} />}
                                                                            label=""
                                                                        />
                                                                    </TableCell>
                                                                </RadioGroup>
                                                            );
                                                        }}
                                                        control={control}
                                                    //     />
                                                    // }
                                                    />
                                                </TableRow>
                                            )}


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                    }

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