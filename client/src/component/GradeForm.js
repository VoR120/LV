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
import GradeIcon from '@mui/icons-material/Grade';
import { useForm } from 'react-hook-form';
import MySelect from './UI/MySelect';
import MyButton from './UI/MyButton';
import InputGrid from './InputGrid';
import { createRewardDiscipline } from '../action/rewardDisciplineAction';
import { createGrade, getGrade, getYearGrade } from '../action/gradeAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
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

const GradeForm = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <GradeIcon className={classes.icon} />Xếp loại
            </div>
            {open &&
                <DialogGradeForm open={open} setOpen={setOpen} data={props} />
            }
        </>
    );
};

export default GradeForm;

const DialogGradeForm = ({ open, setOpen, data }) => {

    const { id, name, reward } = data
    const [gradeArr, setGradeArr] = useState([]);
    const [gradeS, setGradeS] = useState([]);
    const [yearArr, setYearArr] = useState([]);
    const [yearChoose, setYearChoose] = useState("");
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleChangeYearSelect = (e) => {
        setValue(e.target.name, e.target.value);
        setYearChoose(e.target.value);
    }

    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value);
    }

    const onSubmit = (data) => {
        createGrade(data, openSnackbarDispatch)
        setOpen(false);
    }

    useEffect(() => {
        const getGradeAPI = async () => {
            const resYear = await getYearGrade();
            const res = await getGrade({ id });
            console.log(res);
            setGradeS(res);
            setYearArr(resYear);
            setYearChoose(new Date().getFullYear())
            setValue("Nam", new Date().getFullYear());
            const result = category.categories.grade.filter(el => el.Nam == new Date().getFullYear());
            setGradeArr(result[0].Data);
        }
        setValue("MaSoDangVien", id)
        setValue("HoTen", name)
        getGradeAPI();
    }, [])

    useEffect(() => {
        console.log(yearChoose);
        if (yearChoose) {
            const result = category.categories.grade.filter(el => el.Nam == yearChoose);
            setGradeArr(result[0].Data);
            if (gradeS.length > 0) {
                const res = gradeS.find(el => el.Nam == yearChoose)
                res ? setValue("MaLoai", res.MaLoai) : setValue("MaLoai", "0")
            } else
                setValue("MaLoai", "0")
        }
    }, [yearChoose])

    return (
        <Dialog PaperProps={{ style: { minWidth: '800px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Xếp loại</DialogTitle>
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
                        {
                            yearArr.length > 0 &&
                            <>
                                <Grid item xs={6}>
                                    <InputGrid
                                        select
                                        onChange={handleChangeYearSelect}
                                        nameTitle={"Năm"}
                                        name={"Nam"}
                                        defaultValue={""}
                                        control={control}
                                        errors={errors}
                                    >
                                        {yearArr.map(el =>
                                            <MenuItem key={el.Nam} value={el.Nam}>{el.Nam}</MenuItem>
                                        )}
                                    </InputGrid>
                                </Grid>
                                <Grid item xs={6}>
                                    <InputGrid
                                        select
                                        onChange={handleChangeSelect}
                                        nameTitle={"Loại"}
                                        name={"MaLoai"}
                                        defaultValue={"0"}
                                        rules={{
                                            validate: value =>
                                                value != "0" || "Vui lòng nhập trường này!"
                                        }}
                                        control={control}
                                        errors={errors}
                                    >
                                        <MenuItem value="0">Chọn loại</MenuItem>
                                        {
                                            gradeArr.map(el =>
                                                <MenuItem key={el.MaLoai} value={el.MaLoai}>{el.TenLoai}</MenuItem>
                                            )}
                                    </InputGrid>
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
        </Dialog >
    );
}