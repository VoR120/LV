import RedoIcon from '@mui/icons-material/Redo';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid, MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import { createMove } from '../action/moveAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
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

const MoveForm = (props) => {
    const classes = useStyles();
    const { id, partycell, dataSelect, openForm, setOpenForm, btn, fetch } = props
    const [open, setOpen] = useState(false);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const { loadingDispatch } = useContext(LoadingContext)
    const { category } = useContext(CategoryContext)
    const [type, setType] = useState(0);
    const [dataArr, setDataArr] = useState([]);

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
    const handleChangeType = (e) => {
        if (e.target.value != "") {
            clearErrors(e.target.name)
        }
        setValue(e.target.name, e.target.value)
        setType(e.target.value);
    }

    const handleChangeSelect = (e) => {
        if (e.target.value != "0") {
            clearErrors(e.target.name)
        }
        setValue(e.target.name, e.target.value)
    }

    const onSubmit = async (data) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        data.MaSoDangVienArr = dataSelect.map(el => ({ MaSoDangVien: el.MaSoDangVien, MaChiBo: el.MaChiBo }))
        const res = await createMove(data);
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
            fetch();
        }
        setOpen(false);
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

    useEffect(() => {
        if (id) {
            setValue("MaSoDangVien", id)
            setValue("ChuyenTuChiBo", partycell)
        }
        if (dataSelect) {
            dataSelect.map((el, index) => {
                setValue(`MaSoDangVien${index}`, el.MaSoDangVien)
                setValue(`HoTen${index}`, el.HoTen)
                setValue(`ChuyenTuChiBo${index}`, el.MaChiBo)
            })
        }
    }, [])

    useEffect(() => {
        setOpen(!!openForm);
    }, [openForm])

    useEffect(() => {
        if (type == "13") {
            setValue("ChuyenDenDangBo", "DHCT")
            setValue("ChuyenDenChiBo", 0)
        } else {
            setValue("ChuyenDenDangBo", "")
            setValue("ChuyenDenChiBo", "")
        }
    }, [type])

    return (
        <>
            {btn &&
                <div className={classes.iconWrapper} onClick={handleOpen}>
                    <RedoIcon className={classes.icon} />Chuyển sinh hoạt
                </div>
            }
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chuyển sinh hoạt</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <InputGrid
                                    select
                                    onChange={handleChangeType}
                                    nameTitle={"Hình thức chuyển"}
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
                                    <MenuItem value="1">Chuyển sinh hoạt tạm thời</MenuItem>
                                    <MenuItem value="2">Chuyển sinh hoạt chính thức</MenuItem>
                                    <MenuItem value="13">Chuyển sinh hoạt nội bộ</MenuItem>
                                </InputGrid>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid container spacing={1}>
                            {
                                dataSelect ?
                                    dataSelect.map((el, index) =>
                                        <React.Fragment key={index}>
                                            <Grid item xs={6}>
                                                <InputGrid
                                                    nameTitle={`Mã số Đảng viên`}
                                                    name={`MaSoDangVien${index}`}
                                                    disabled={true}
                                                    defaultValue={""}
                                                    control={control}
                                                    errors={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InputGrid
                                                    nameTitle={`Họ tên`}
                                                    name={`HoTen${index}`}
                                                    disabled={true}
                                                    defaultValue={""}
                                                    control={control}
                                                    errors={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InputGrid
                                                    nameTitle={`Chuyển từ Đảng bộ`}
                                                    name={"ChuyenTuDangBo"}
                                                    disabled={true}
                                                    defaultValue={"DHCT"}
                                                    control={control}
                                                    errors={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InputGrid
                                                    select
                                                    onChange={handleChangeSelect}
                                                    nameTitle={"Chuyển từ chi bộ"}
                                                    name={`ChuyenTuChiBo${index}`}
                                                    disabled={true}
                                                    control={control}
                                                    errors={errors}
                                                >
                                                    <MenuItem value="0">Chọn chi bộ</MenuItem>
                                                    {category.categories.partycell.length > 0 &&
                                                        category.categories.partycell.map(el =>
                                                            <MenuItem key={el.MaChiBo} value={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                                                        )
                                                    }
                                                </InputGrid>
                                            </Grid>

                                        </React.Fragment>
                                    )
                                    :
                                    <>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                nameTitle={`Chuyển từ Đảng bộ`}
                                                name={"ChuyenTuDangBo"}
                                                disabled={true}
                                                defaultValue={"DHCT"}
                                                control={control}
                                                errors={errors}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                select
                                                onChange={handleChangeSelect}
                                                nameTitle={"Chuyển từ chi bộ"}
                                                name={`ChuyenTuChiBo`}
                                                disabled={true}
                                                control={control}
                                                errors={errors}
                                            >
                                                <MenuItem value="0">Chọn chi bộ</MenuItem>
                                                {category.categories.partycell.length > 0 &&
                                                    category.categories.partycell.map(el =>
                                                        <MenuItem key={el.MaChiBo} value={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                                                    )
                                                }
                                            </InputGrid>
                                        </Grid>
                                    </>
                            }
                            {
                                type == 13 ?
                                    <>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                nameTitle={`Chuyển đến Đảng bộ`}
                                                name={"ChuyenDenDangBo"}
                                                control={control}
                                                errors={errors}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                select
                                                onChange={handleChangeSelect}
                                                nameTitle={"Chuyển đến chi bộ"}
                                                name={`ChuyenDenChiBo`}
                                                rules={{
                                                    validate: value =>
                                                        value != "0" || "Vui lòng nhập trường này!"
                                                }}
                                                control={control}
                                                errors={errors}
                                            >
                                                <MenuItem value="0">Chọn chi bộ</MenuItem>
                                                {category.categories.partycell.length > 0 &&
                                                    category.categories.partycell.map(el =>
                                                        <MenuItem key={el.MaChiBo} value={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                                                    )
                                                }
                                            </InputGrid>
                                        </Grid>
                                    </>
                                    :
                                    <>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                nameTitle={`Chuyển đến Đảng bộ`}
                                                name={"ChuyenDenDangBo"}
                                                defaultValue={""}
                                                control={control}
                                                errors={errors}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                nameTitle={`Chuyển đến chi bộ`}
                                                name={"ChuyenDenChiBo"}
                                                defaultValue={""}
                                                control={control}
                                                errors={errors}
                                            />
                                        </Grid>
                                    </>

                            }
                        </Grid>

                        <Divider className={classes.divider} />
                        <Grid item xs={12}>
                            <InputGrid
                                type="date"
                                defaultValue={getDate(new Date)}
                                nameTitle={`Ngày chuyển`}
                                name={"NgayChuyenDi"}
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid item xs={12}>
                            <InputGrid
                                nameTitle={`Nội dung`}
                                name={"GhiChu"}
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} info>
                        Lưu
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MoveForm;