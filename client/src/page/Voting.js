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
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AddVotingForm from '../component/AddVotingForm';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';


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
    const [open, setOpen] = useState(false)

    const [choose, setChoose] = useState([]);



    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const ConfirmSelect = () => {

        const [checkedValues, setCheckedValues] = useState([]);
        const [candidate, setCandidate] = useState([
            { MaSoDangVien: "B1706895", HoTen: "Nguyễn Văn Vỏ" },
            { MaSoDangVien: "B1706001", HoTen: "Nguyễn Văn Dỏ" },
            { MaSoDangVien: "B1706002", HoTen: "Nguyễn Văn Giỏ" },
        ]);

        const { control, getValues, setValue, register } = useForm();

        function handleSelect(e, checkedName) {
            const newNames = checkedValues?.includes(checkedName)
                ? checkedValues?.filter(name => name !== checkedName)
                : [...(checkedValues ?? []), checkedName];
            setCheckedValues(newNames);

            return newNames;
        }

        const handleSubmit = () => {
            console.log(checkedValues)
        }

        return (
            <Dialog PaperProps={{ style: { minWidth: "700px" } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Biểu quyết</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography className={classes.title} alignItems="center" variant="h5">
                        Biểu quyết khen thưởng Đảng viên hoàn thành xuất sắc nhiệm vụ 5 năm
                    </Typography>
                    <Typography>Nội dung: Biểu quyết khen thưởng Đảng viên hoàn thành xuất sắc nhiệm vụ 5 năm</Typography>
                    <Typography>Thời gian: 00:00 25/12/2021 - 23:59 27/12/2021</Typography>
                    <Typography>Số phiếu tối đa: 2</Typography>
                    <FormGroup>
                        {candidate.map(el =>
                            <FormControlLabel
                                control={
                                    <Controller
                                        name="names"
                                        render={({ props }) => {
                                            return (
                                                <Checkbox
                                                    checked={checkedValues.includes(el.MaSoDangVien)}
                                                    onChange={(e) => handleSelect(e, el.MaSoDangVien)}
                                                />
                                            );
                                        }}
                                        control={control}
                                    />
                                }
                                key={el.MaSoDangVien}
                                label={el.HoTen}
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
        )
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Biểu quyết
                    </Typography>
                </div>
                <Grid style={{ width: '100%' }} container spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} variant="outlined">
                            <Grid container justifyContent="space-between" marginBottom="40px">
                                <Typography variant="button">00:00 25/12/2021 - 23:59 27/12/2021</Typography>
                                <Typography color="green" variant="button">Đang diễn ra</Typography>
                            </Grid>
                            <Typography textAlign="center" className={classes.title} variant="h5">
                                Biểu quyết khen thưởng Đảng viên hoàn thành xuất sắc nhiệm vụ 5 năm
                            </Typography>
                            <Grid container justifyContent="center">
                                <MyButton onClick={handleOpen} primary>Biểu quyết</MyButton>
                            </Grid>
                            <ConfirmSelect />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} variant="outlined">
                            <div className={classes.flex}>
                                <Typography variant="button">00:00 25/12/2021 - 23:59 27/12/2021</Typography>
                                <Typography color="red" variant="button">Đã kết thúc</Typography>
                            </div>
                            <Typography textAlign="center" className={classes.title} variant="h5">
                                Biểu quyết khen thưởng Đảng viên hoàn thành xuất sắc nhiệm vụ 5 năm
                            </Typography>
                            <ConfirmSelect />
                        </Paper>
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
};

export default Voting;