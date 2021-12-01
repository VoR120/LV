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
import { useForm } from 'react-hook-form';
import MySelect from './UI/MySelect';
import MyButton from './UI/MyButton';
import InputGrid from './InputGrid';
import { createMove } from '../action/moveAction';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { CategoryContext } from '../contextAPI/CategoryContext';

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
    const { id, partycell } = props
    const [open, setOpen] = useState(false);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const { category } = useContext(CategoryContext)
    const [type, setType] = useState(0);

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
    const handleChangeType = (e) => {
        if (e.target.value != "") {
            clearErrors(e.target.name)
        }
        setValue(e.target.name, e.target.value)
        setType(e.target.value);
    }

    const handleChangeSelect = (e) => {
        if (e.target.value != "") {
            clearErrors(e.target.name)
        }
        setValue(e.target.name, e.target.value)
    }

    const onSubmit = (data) => {
        createMove(data, openSnackbarDispatch);
        setOpen(false);
    }

    useEffect(() => {
        if (id) {
            setValue("MaSoDangVien", id)
            setValue("ChuyenTuChiBo", partycell)
        }
    }, [])

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
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <RedoIcon className={classes.icon} />Chuyển sinh hoạt
            </div>
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
                            <Grid item xs={6}>
                                <InputGrid
                                    type="date"
                                    nameTitle={`Ngày chuyển`}
                                    name={"NgayChuyenDi"}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
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