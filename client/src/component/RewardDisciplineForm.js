import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid, MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createRewardDiscipline } from '../action/rewardDisciplineAction';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { getDate } from '../utils/utils';
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

const RewardDisciplineForm = (props) => {
    const classes = useStyles();
    const { reward, dataSelect, btn, openForm, setOpenForm } = props
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
        setOpenForm && setOpenForm(false);
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }
    const onSubmit = async (data) => {
        data.MaSoDangVienArr = dataSelect.map(el => ({ MaSoDangVien: el.MaSoDangVien }))
        const res = await createRewardDiscipline({ data, type: reward ? "reward" : "discipline" }, openSnackbarDispatch)
        if (res.error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.error.message,
                    type: "error"
                }
            })
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.msg,
                    type: "success"
                }
            })
        }
        setOpen(false);
    }

    useEffect(() => {
        setOpen(!!openForm);
    }, [openForm])

    useEffect(() => {
        if (dataSelect) {
            dataSelect.map((el, index) => {
                setValue(`MaSoDangVien${index}`, el.MaSoDangVien)
                setValue(`HoTen${index}`, el.HoTen)
            })
        }
    }, [])

    return (
        <>
            {btn &&
                <div className={classes.iconWrapper} onClick={handleOpen}>
                    {reward ?
                        <><ThumbUpAltIcon className={classes.icon} />Khen thưởng</>
                        :
                        <><ThumbDownAltIcon className={classes.icon} />Kỷ luật</>
                    }
                </div>
            }
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">{reward ? "Khen thưởng" : "Kỷ luật"}</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        <Grid container spacing={1}>
                            {dataSelect.map((el, index) =>
                                <React.Fragment key={index}>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Mã số Đảng viên`}
                                            name={`MaSoDangVien${index}`}
                                            defaultValue={""}
                                            control={control}
                                            errors={errors}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Họ tên`}
                                            name={`HoTen${index}`}
                                            defaultValue={""}
                                            control={control}
                                            errors={errors}
                                            disabled
                                        />
                                    </Grid>
                                </React.Fragment>

                            )}

                            {reward ?
                                <Grid item xs={6}>
                                    <InputGrid
                                        select
                                        onChange={handleChangeSelect}
                                        nameTitle={"Hình thức"}
                                        name={"HinhThuc"}
                                        defaultValue={"0"}
                                        rules={{
                                            validate: value =>
                                                value != "0" || "Vui lòng nhập trường này!"
                                        }}
                                        control={control}
                                        errors={errors}
                                    >
                                        <MenuItem value="0">Chọn hình thức</MenuItem>
                                        <MenuItem value="Biểu dương">Biểu dương</MenuItem>
                                        <MenuItem value="Tặng giấy khen">Tặng giấy khen</MenuItem>
                                    </InputGrid>
                                </Grid>
                                :
                                <Grid item xs={6}>
                                    <InputGrid
                                        select
                                        onChange={handleChangeSelect}
                                        nameTitle={"Hình thức"}
                                        name={"HinhThuc"}
                                        defaultValue={"0"}
                                        rules={{
                                            validate: value =>
                                                value != "0" || "Vui lòng nhập trường này!"
                                        }}
                                        control={control}
                                        errors={errors}
                                    >
                                        <MenuItem value="0">Chọn hình thức</MenuItem>
                                        <MenuItem value="Khiển trách">Khiển trách</MenuItem>
                                        <MenuItem value="Cảnh cáo">Cảnh cáo</MenuItem>
                                        <MenuItem value="Cách chức">Cách chức</MenuItem>
                                        <MenuItem value="Khai trừ">Khai trừ</MenuItem>
                                    </InputGrid>
                                </Grid>
                            }
                            <Grid item xs={6}>
                                <InputGrid
                                    type="date"
                                    defaultValue={getDate(new Date)}
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