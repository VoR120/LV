import DeleteIcon from '@mui/icons-material/Delete';
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogTitle, Typography
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

const DeleteVotingForm = (props) => {
    const classes = useStyles();
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleSubmit = () => {

    }

    return (
        <>
            <MyButton onClick={handleOpen} style={{ marginBottom: '20px', marginLeft: "8px" }} error={true} small>Hủy</MyButton>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Hủy cuộc  biểu quyết</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography>Bạn có muốn hủy cuộc biểu quyết này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit} error={true}>
                        Đồng ý
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteVotingForm;