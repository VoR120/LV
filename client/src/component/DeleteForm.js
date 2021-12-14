import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import image from '../public/image/warning.png';
import MyButton from './UI/MyButton';
const useStyles = makeStyles(theme => ({
    dialogContent: {
        textAlign: 'center'
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
    const { content, handleSubmit, btn, noBtn, openForm, setOpenForm } = props;
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    const onSubmit = () => {
        handleSubmit();
        setOpen(false);
    }

    useEffect(() => {
        setOpen(!!openForm);
    }, [openForm])

    return (
        <>
            {
                !noBtn &&
                (btn
                    ?
                    <MyButton onClick={handleOpen} error><DeleteIcon /></MyButton>
                    :
                    <div className={classes.iconWrapper} onClick={handleOpen}>
                        <DeleteIcon className={classes.icon} />Xóa
                    </div>
                )
            }

            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Xóa</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <img style={{ width: '150px', height: '150px' }} src={image} alt="warning" />
                    <Typography>{content}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={onSubmit} error>
                        Xóa
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteForm;