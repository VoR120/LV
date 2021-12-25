import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogTitle, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { deletePoll } from '../action/votingAction';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
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

const DeleteVotingForm = (props) => {
    const classes = useStyles();
    const { data, fetchAllPoll } = props;
    const { openSnackbarDispatch } = useContext(SnackbarContext)
    const { loadingDispatch } = useContext(LoadingContext)

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleSubmit = async () => {
        loadingDispatch({ type: "OPEN_LOADING" })
        const res = await deletePoll({ id: data.MaBieuQuyet })
        if (res.error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.error.msg,
                    type: "error"
                }
            })
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã xóa!",
                    type: "success"
                }
            })
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
        fetchAllPoll();
    }

    return (
        <>
            <MyButton onClick={handleOpen} style={{ marginBottom: '20px', marginLeft: "8px" }} error={true} small>Xóa</MyButton>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Hủy cuộc  biểu quyết</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography>Bạn có muốn xóa cuộc biểu quyết này?</Typography>
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