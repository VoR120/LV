import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import RedoIcon from '@mui/icons-material/Redo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useForm } from 'react-hook-form';
import MySelect from './UI/MySelect';
import MyButton from './UI/MyButton';
import InputGrid from './InputGrid';
import { createRewardDiscipline } from '../action/rewardDisciplineAction';
import { SnackbarContext } from '../contextAPI/SnackbarContext';

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

const RewardDisciplineForm = (props) => {
    const classes = useStyles();
    const { id, name, reward } = props
    const [open, setOpen] = useState(false);
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
        delete data.HoTen;
        createRewardDiscipline({ data, type: reward ? "reward" : "discipline" }, openSnackbarDispatch)
        setOpen(false);
    }

    useEffect(() => {
        setValue("MaSoDangVien", id)
        setValue("HoTen", name)
    }, [])

    return (
        <>
            <div className={classes.iconWrapper} onClick={handleOpen}>
                {reward ?
                    <><ThumbUpAltIcon className={classes.icon} />Khen thưởng</>
                    :
                    <><ThumbDownAltIcon className={classes.icon} />Kỷ luật</>
                }
            </div>
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{reward ? "Khen thưởng" : "Kỷ luật"}</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <InputGrid
                                    nameTitle={`Mã số Đảng viên`}
                                    name={"MaSoDangVien"}
                                    defaultValue={""}
                                    control={control}
                                    errors={errors}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    nameTitle={`Họ tên`}
                                    name={"HoTen"}
                                    defaultValue={""}
                                    control={control}
                                    errors={errors}
                                    disabled
                                />
                            </Grid>
                            {reward ?
                                <Grid item xs={6}>
                                    <InputGrid
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
                                :
                                <Grid item xs={6}>
                                    <InputGrid
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
                                </Grid>
                            }
                            <Grid item xs={6}>
                                <InputGrid
                                    type="date"
                                    nameTitle={reward ? "Ngày khen thưởng" : "Ngày kỷ luật"}
                                    name={reward ? "NgayKhenThuong" : "NgayKyLuat"}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputGrid
                                    nameTitle={reward ? "Tên khen thưởng" : "Tên kỷ luật"}
                                    name={reward ? "TenKhenThuong" : "TenKyLuat"}
                                    defaultValue={""}
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

export default RewardDisciplineForm;