import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { removeCategory } from '../action/categoryAction';
import MyButton from './UI/MyButton';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';

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

const DeleteFormCategory = (props) => {
    const classes = useStyles();
    const { id, name, title, categoryField } = props;
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleSubmit = () => {
        removeCategory(categoryDispatch, { categoryField, id }, openSnackbarDispatch)
        setOpen(false)
    }

    return (
        <>
            <MyButton onClick={handleOpen} error={true} small><DeleteIcon />Xóa</MyButton>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Xóa {props.title}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn có muốn xóa {title} "{name}"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit} error={true}>
                        Xóa
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteFormCategory;