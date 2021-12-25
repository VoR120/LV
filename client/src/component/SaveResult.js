import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    Grid, MenuItem, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { createRewardDisciplines } from '../action/rewardDisciplineAction';
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

const SaveResult = (props) => {
    const classes = useStyles();
    const { open, setOpen, data, resultState, setResultState } = props
    const id = resultState.MaBieuQuyet;
    const name = resultState.TenBieuQuyet;
    const voteFor = resultState.MucDich;
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
        if (e.target.value != 0)
            clearErrors(e.target.name)
        setValue(e.target.name, e.target.value)
    }
    const onSubmit = async (d) => {
        d.DanhSach = data
        d.type = voteFor == "Khen thưởng" ? "reward" : "discipline"
        console.log(d);
        const res = await createRewardDisciplines(d, id)
        if (res) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã lưu!",
                    type: "success"
                }
            })
            setResultState({ ...resultState, LuuKetQua: 1 })
        }
        setOpen(false);
    }

    return (
        <>
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{voteFor}</DialogTitle>
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
                            {
                                voteFor == "Khen thưởng" ?
                                    <>
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
                                    </>
                                    :
                                    <>
                                        <Grid item xs={12}>
                                            <InputGrid
                                                nameTitle={"Tên kỷ luật"}
                                                name={"TenKyLuat"}
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
                                        <Grid item xs={6}>
                                            <InputGrid
                                                center
                                                type="date"
                                                nameTitle={"Ngày kỷ luật"}
                                                defaultValue={getDate(new Date)}
                                                name={"NgayKyLuat"}
                                                control={control}
                                                errors={errors}
                                            />
                                        </Grid>
                                    </>
                            }

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