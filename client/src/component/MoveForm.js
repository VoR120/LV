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
                    <RedoIcon className={classes.icon} />Chuy???n sinh ho???t
                </div>
            }
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chuy???n sinh ho???t</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <InputGrid
                                    select
                                    onChange={handleChangeType}
                                    nameTitle={"H??nh th???c chuy???n"}
                                    name={"MaHinhThuc"}
                                    defaultValue={"0"}
                                    rules={{
                                        validate: value =>
                                            value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                    }}
                                    control={control}
                                    errors={errors}
                                >
                                    <MenuItem value="0">Ch???n h??nh th???c</MenuItem>
                                    <MenuItem value="1">Chuy???n sinh ho???t t???m th???i</MenuItem>
                                    <MenuItem value="2">Chuy???n sinh ho???t ch??nh th???c</MenuItem>
                                    <MenuItem value="13">Chuy???n sinh ho???t n???i b???</MenuItem>
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
                                                    nameTitle={`M?? s??? ?????ng vi??n`}
                                                    name={`MaSoDangVien${index}`}
                                                    disabled={true}
                                                    defaultValue={""}
                                                    control={control}
                                                    errors={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InputGrid
                                                    nameTitle={`H??? t??n`}
                                                    name={`HoTen${index}`}
                                                    disabled={true}
                                                    defaultValue={""}
                                                    control={control}
                                                    errors={errors}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <InputGrid
                                                    nameTitle={`Chuy???n t??? ?????ng b???`}
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
                                                    nameTitle={"Chuy???n t??? chi b???"}
                                                    name={`ChuyenTuChiBo${index}`}
                                                    disabled={true}
                                                    control={control}
                                                    errors={errors}
                                                >
                                                    <MenuItem value="0">Ch???n chi b???</MenuItem>
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
                                                nameTitle={`Chuy???n t??? ?????ng b???`}
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
                                                nameTitle={"Chuy???n t??? chi b???"}
                                                name={`ChuyenTuChiBo`}
                                                disabled={true}
                                                control={control}
                                                errors={errors}
                                            >
                                                <MenuItem value="0">Ch???n chi b???</MenuItem>
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
                                                nameTitle={`Chuy???n ?????n ?????ng b???`}
                                                name={"ChuyenDenDangBo"}
                                                control={control}
                                                errors={errors}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                select
                                                onChange={handleChangeSelect}
                                                nameTitle={"Chuy???n ?????n chi b???"}
                                                name={`ChuyenDenChiBo`}
                                                rules={{
                                                    validate: value =>
                                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                                }}
                                                control={control}
                                                errors={errors}
                                            >
                                                <MenuItem value="0">Ch???n chi b???</MenuItem>
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
                                                nameTitle={`Chuy???n ?????n ?????ng b???`}
                                                name={"ChuyenDenDangBo"}
                                                defaultValue={""}
                                                control={control}
                                                errors={errors}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                nameTitle={`Chuy???n ?????n chi b???`}
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
                                nameTitle={`Ng??y chuy???n`}
                                name={"NgayChuyenDi"}
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid item xs={12}>
                            <InputGrid
                                nameTitle={`N???i dung`}
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
                        L??u
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MoveForm;