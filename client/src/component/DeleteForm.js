import React, { useState, useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import MyButton from './UI/MyButton';
import { removePartyMember } from '../action/partyMemberAction';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
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

    const { partyMember, partyMemberDispatch } = useContext(PartyMemberContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)

    const classes = useStyles();
    const { name, id } = props;
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleSubmit = () => {
        removePartyMember(partyMemberDispatch, { id }, openSnackbarDispatch)
        setOpen(false);
    }

    return (
        <>
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <DeleteIcon className={classes.icon} />Xóa
            </div>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Xóa Đảng viên</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn có muốn xóa Đảng viên "{name}" - "{id}"?
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