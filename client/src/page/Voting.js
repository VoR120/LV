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
import { getAllPoll } from '../action/votingAction'
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
    title: {
        marginBottom: '20px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    }
}))

const Voting = () => {
    const classes = useStyles();
    const { loadingDispatch } = useContext(LoadingContext)
    const [pollArr, setPollArr] = useState([]);

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

    const handleSubmit = () => {
        if (checkedValues.length > 2) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Được chọn nhiều nhất 2 ứng cử viên",
                    type: "error"
                }
            })
        }
        if (checkedValues.length == 0) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Phải chọn ít nhất 1 ứng cử viên",
                    type: "error"
                }
            })
        }
        console.log(checkedValues)
    }

    return (
        <>
            <MyButton onClick={handleOpen} primary>Biểu quyết</MyButton>
            <Dialog PaperProps={{ style: { minWidth: "700px" } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Biểu quyết</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography className={classes.title} alignItems="center" variant="h5">
                        {data.TenBieuQuyet}
                    </Typography>
                    <Typography marginBottom="8px">Nội dung: {data.NoiDung}</Typography>
                    <Typography marginBottom="8px">
                        Thời gian: <b>{new Date(data.ThoiGianBatDau).toLocaleString()} - {new Date(data.ThoiGianKetThuc).toLocaleString()}                        </b>
                    </Typography>
                    <Typography marginBottom="8px">Số phiếu tối đa: <b>2</b></Typography>
                    <FormGroup>
                        {data.UngCuVien.map(el =>
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="names"
                                        render={({ props }) => {
                                            return (
                                                <Checkbox
                                                    checked={checkedValues.includes(el.MaUngCuVien)}
                                                    onChange={(e) => handleSelect(e, el.MaUngCuVien)}
                                                />
                                            );
                                        }}
                                        control={control}
                                    />
                                }
                                key={el.MaUngCuVien}
                                label={el.HoTen + " - " + el.MaSoDangVien}
                            />
                        )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit} success>
                        Đồng ý
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Voting;