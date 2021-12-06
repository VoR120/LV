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
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import MySelect from './UI/MySelect';
import MyButton from './UI/MyButton';
import InputGrid from './InputGrid';
import { createMove } from '../action/moveAction';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { getAllCategory } from '../action/categoryAction';
import { dateArr, getDate } from '../utils/utils'

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
    const classes = useStyles();
    const { data, type } = props
    const [open, setOpen] = useState(false);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext);
    const { category, categoryDispatch } = useContext(CategoryContext);

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
            console.log(data);
            getAllCategory(categoryDispatch, "partycell");
            Object.keys(data).map(el => {
                (dateArr.includes(el) && data[el])
                    ? setValue(el, getDate(data[el]))
                    : setValue(el, data[el])
            })
        }
    }, [])

    return (
        <>
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <EditIcon className={classes.icon} />Chỉnh sửa
            </div>
            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cập nhật chuyển sinh hoạt</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        <Grid container spacing={1}>
                            {(data.MaHinhThuc == 1 || data.MaHinhThuc == 2) &&
                                <>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển từ Đảng bộ`}
                                            name={"ChuyenTuDangBo"}
                                            defaultValue={"DHCT"}
                                            disabled={true}
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
                                            name={"TenChiBoDen"}
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
                            {(data.MaHinhThuc == 3 || data.MaHinhThuc == 4) &&
                                <>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển từ Đảng bộ`}
                                            name={"ChuyenTuDangBo"}
                                            defaultValue={""}
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
                                            select
                                            onChange={handleChangeSelect}
                                            nameTitle={"Chuyển đến chi bộ"}
                                            name={`ChuyenDenChiBo`}
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
                            {data.MaHinhThuc == 13 &&
                                <>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển từ Đảng bộ`}
                                            name={"ChuyenTuDangBo"}
                                            defaultValue={""}
                                            disabled={true}
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
                                    <Grid item xs={6}>
                                        <InputGrid
                                            nameTitle={`Chuyển đến Đảng bộ`}
                                            name={"ChuyenDenDangBo"}
                                            disabled={true}
                                            defaultValue={""}
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
                                    <Grid item xs={6}>
                                        <InputGrid
                                            type="date"
                                            nameTitle={`Ngày chuyển`}
                                            name={"NgayChuyenDi"}
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