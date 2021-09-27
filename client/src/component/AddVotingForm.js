import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    inputItem: {
        marginBottom: theme.spacing(2),
    },
    inputWrapper: {
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: theme.palette.common.white,
        cursor: 'pointer'
    }
}))

const AddVotingForm = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [inputList, setInputList] = useState([{ value: "" }]);

    const handleRemoveList = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const handleInputChange = (e, index) => {
        const { value } = e.target
        const list = [...inputList];
        list[index].value = value;
        setInputList(list);
    }
    const handleAddClick = () => {
        setInputList([...inputList, { value: "" }])
    }

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
            <MyButton onClick={handleOpen} success><AddIcon />Tạo biểu quyết</MyButton>
            <Dialog PaperProps={{ style: { minWidth: '700px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Tạo biểu quyết</DialogTitle>
                <DialogContent>
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid xs={5}>
                            <Typography>Tên cuộc họp</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputItem}>
                        <Grid xs={5}>
                            <Typography>Nội dung biểu quyết</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth multiline minRows="3" size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputItem}>
                        <Grid xs={5}>
                            <Typography>Ứng cử viên</Typography>
                        </Grid>
                        <Grid xs={7}>
                            {inputList.map((input, index) => {
                                return (
                                    <div className={classes.inputWrapper}>
                                        <TextField onChange={(e) => handleInputChange(e, index)} name="info" value={input.value} className={classes.inputItem} fullWidth size="small" variant="outlined" />
                                        <CloseIcon id="close-icon" className={classes.closeIcon} onClick={() => handleRemoveList(index)} />
                                    </div>
                                )
                            })}
                            <Button id="add-btn" onClick={handleAddClick} variant="outlined" fullWidth><AddIcon /></Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} success>
                        Add
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddVotingForm;