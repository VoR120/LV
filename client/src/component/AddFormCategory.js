import {
    Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, TextField, FormHelperText,
    FormControl, InputLabel, IconButton, CircularProgress, Typography, AppBar, Tabs, Tab, Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    inputItem: {
        marginTop: theme.spacing(2),
    },
}))

const AddFormCategory = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { header, children } = props

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
            <MyButton onClick={handleOpen} success><AddIcon />Thêm</MyButton>
            <Dialog PaperProps={{ style: { minWidth: '300px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{header}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} success>
                        Thêm
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddFormCategory;