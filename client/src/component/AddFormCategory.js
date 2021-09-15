import { makeStyles, Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, TextField, FormHelperText, FormControl, InputLabel, IconButton, CircularProgress, Typography, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    addBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    },
    imageWrapper: {
        position: 'relative',
        height: '200px',
        width: '100%',
        background: 'white',

        margin: '0 auto',
    },
    fileUpload: {
        cursor: 'pointer',
        position: 'relative',
        width: '100%',
        height: '100%',
        outline: '1px solid #ddd',
        '&::before': {
            content: '"+"',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            fontSize: '11rem',
            margin: 'auto',
            textAlign: 'center',
            backgroundColor: theme.palette.common.white
        },
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main
        }
    },
    loadingWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    loading: {
        position: 'absolute',
        left: 'calc( 50% - 20px )',
        top: 'calc( 50% - 20px )'
    },
    tabsbar: {
        backgroundColor: theme.palette.common.white,
        boxShadow: 'none',
        borderBottom: '1px solid #ddd'
    },
    inputItem: {
        marginBottom: theme.spacing(2),
    },
}))

const AddFormCategory = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { header, idTitle, idValue, nameTitle  } = props

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
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid xs={5}>
                            <Typography>{idTitle}</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField value={idValue} disabled fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid xs={5}>
                            <Typography>{nameTitle}</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} success>
                        Add
                    </MyButton>ư
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddFormCategory;