import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddVotingForm from '../component/AddVotingForm';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import InputGrid from './InputGrid';


const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
        marginTop: '20px',
        width: 'fit-content'
    },
    title: {
        marginBottom: '20px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    }
}))

const MoveReturnForm = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const { moveId, id, name, disabled, errors, handleSubmit, onSubmit, control } = props

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmitReturn = (data) => {
        data.MaChuyenSinhHoat = moveId
        setOpen(false);
        onSubmit(data);
    }

    return (
        <>
            <MyButton onClick={() => setOpen(true)} disabled={disabled} primary>Chuyển về</MyButton>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chuyển về</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Xác nhận chuyển về Đảng viên "{name}" - "{id}" ?
                    <InputGrid
                        type="date"
                        rules={{ require: "Vui lòng nhập trường này!" }}
                        nameTitle={`Ngày chuyền về`}
                        defaultValue={""}
                        name={"NgayChuyenDen"}
                        control={control}
                        errors={errors}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit(handleSubmitReturn)} success>
                        Chuyển
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MoveReturnForm;