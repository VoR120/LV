import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import MyButton from './UI/MyButton';
const useStyles = makeStyles(theme => ({
    dialogContent: {
        marginBottom: theme.spacing(2),
    },
    icon: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
        fontSize: '1.2rem'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    deleteBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    },
}))

const DeleteForm = (props) => {
    const classes = useStyles();
    const { name } = props.data;
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
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <DeleteIcon className={classes.icon} />Xóa
            </div>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Xóa Đảng viên</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn có muốn xóa Đảng viên "{name}"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit} error>
                        Xóa
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteForm;