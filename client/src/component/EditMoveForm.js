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

const EditMoveForm = (props) => {
    console.log(props)
    const classes = useStyles();
    const { data, type } = props
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
        if (e.target.value != "") {
            clearErrors(e.target.name)
        }
        setValue(e.target.name, e.target.value)
    }
    const onSubmit = (data) => {
        console.log(data);
        // createMove(data, openSnackbarDispatch);
        // setOpen(false);
    }

    useEffect(() => {
        if (data) {
            Object.keys(data).map(el => setValue(el, data[el]))
        }
    }, [])

    return (
        <>
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <RedoIcon className={classes.icon} />Chỉnh sửa
            </div>
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cập nhật chuyển sinh hoạt</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        {/* <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <InputGrid
                                    select
                                    onChange={handleChangeSelect}
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
                                    <MenuItem value="0001">Chuyển sinh hoạt tạm thời</MenuItem>
                                    <MenuItem value="0002">Chuyển sinh hoạt chính thức</MenuItem>
                                </InputGrid>
                            </Grid>
                        </Grid> */}
                        {/* <Divider className={classes.divider} /> */}
                        <Grid container spacing={1}>
                            {type == "Chuyển sinh hoạt đi" &&
                                <>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển từ Đảng bộ`}
                                            name={"ChuyenTuDangBo"}
                                            defaultValue={"DHCT"}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển từ chi bộ`}
                                            name={"ChuyenTuChiBo"}
                                            defaultValue={""}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
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
                                    <Grid item xs={6}>
                                        <InputGrid
                                            type="date"
                                            nameTitle={`Ngày chuyển đí`}
                                            name={"NgayChuyenDi"}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            type="date"
                                            nameTitle={`Ngày chuyển về`}
                                            name={"NgayChuyenDen"}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                </>
                            }
                            {type == "Chuyển sinh hoạt đến" &&
                                <>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển từ Đảng bộ`}
                                            name={"ChuyenTuChiBo"}
                                            defaultValue={""}
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển từ chi bộ`}
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
                                    <Grid item xs={6}>
                                        <InputGrid
                                            type="date"
                                            nameTitle={`Ngày chuyển đến`}
                                            name={"NgayChuyenDen"}
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

export default EditMoveForm;