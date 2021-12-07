import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import { getDate } from '../utils/utils'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid, MenuItem, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import InputGrid from './InputGrid';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    icon: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
        fontSize: '1.2rem'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    divider: {
        marginTop: '20px'
    },
}))

const SaveResult = (props) => {
    const classes = useStyles();
    const { open, setOpen, data, name } = props
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        clearErrors,
        formState: { errors }
    } = useForm();

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Khen thưởng</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={12}><Typography>Danh sách Đảng viên</Typography></Grid>
                            <Grid container item xs={12} alignItems="center">
                                <Grid item flex={1} />
                                <Grid item>
                                    {data.map(el =>
                                        <Grid key={el.MaSoDangVien} item container alignItems="center">
                                            <LabelImportantRoundedIcon sx={{ marginRight: 2 }} />
                                            <Typography variant="h6">{el.HoTen} - {el.MaSoDangVien}</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid item flex={1} />
                            </Grid>
                            <Grid item xs={12}>
                                <InputGrid
                                    nameTitle={"Tên khen thưởng"}
                                    name={"TenKhenThuong"}
                                    defaultValue={name}
                                    multiline
                                    minRows={3}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    center
                                    select
                                    onChange={handleChangeSelect}
                                    nameTitle={"Hình thức"}
                                    name={"MaHinhThuc"}
                                    defaultValue={"0"}
                                    rules={{
                                        validate: value =>
                                            value != "0" || "Vui lòng nhập trường này!"
                                    }}
                                    control={control}
                                    errors={errors}
                                >
                                    <MenuItem value="0">Chọn hình thức</MenuItem>
                                    <MenuItem value="0005">Biểu dương</MenuItem>
                                    <MenuItem value="0006">Tặng giấy khen</MenuItem>
                                </InputGrid>
                            </Grid>

                            {/* <Grid item xs={6}>
                                    <InputGrid
                                    center
                                        select
                                        onChange={handleChangeSelect}
                                        nameTitle={"Hình thức"}
                                        name={"MaHinhThuc"}
                                        defaultValue={"0"}
                                        rules={{
                                            validate: value =>
                                                value != "0" || "Vui lòng nhập trường này!"
                                        }}
                                        control={control}
                                        errors={errors}
                                    >
                                        <MenuItem value="0">Chọn hình thức</MenuItem>
                                        <MenuItem value="0007">Khiển trách</MenuItem>
                                        <MenuItem value="0008">Cảnh cáo</MenuItem>
                                        <MenuItem value="0009">Cách chức</MenuItem>
                                        <MenuItem value="0010">Khai trừ</MenuItem>
                                    </InputGrid>
                                </Grid> */}

                            <Grid item xs={6}>
                                <InputGrid
                                    center
                                    type="date"
                                    nameTitle={"Ngày khen thưởng"}
                                    defaultValue={getDate(new Date)}
                                    name={"NgayKhenThuong"}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} info>
                        Lưu
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SaveResult;