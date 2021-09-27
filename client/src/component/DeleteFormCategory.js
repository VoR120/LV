import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
    FormHelperText,
    FormControl,
    InputLabel,
    IconButton,
    CircularProgress,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    btn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        },
        margin: '0 4px'
    },
    inputItem: {
        marginBottom: theme.spacing(2),
    },
}))

const DeleteFormCategory = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const onSubmit = () => {

    }

    return (
        <>
            <MyButton onClick={handleOpen} error small><DeleteIcon />Xóa</MyButton>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Xóa Đảng viên</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn có muốn xóa Đảng viên?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit}>
                        Xóa
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteFormCategory;