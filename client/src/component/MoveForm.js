import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, makeStyles, Menu, MenuItem, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import RedoIcon from '@material-ui/icons/Redo';
import { useForm } from 'react-hook-form';
import MySelect from './UI/MySelect';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    icon: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
        fontSize: '1.2rem'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    imageWrapper: {
        position: 'relative',
        maxWidth: '200px',
        height: '300px',
        background: 'white',

        margin: '0 auto',
    },
    fileUpload: {
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
            fontSize: '17rem',
            margin: 'auto',
            textAlign: 'center',
            backgroundColor: theme.palette.common.white
        },
    },
    updateBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.info.main,
        '&:hover': {
            backgroundColor: theme.palette.info.dark
        }
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.main,
        '&:hover': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.main
        }
    },
    inputItem: {
        marginBottom: theme.spacing(2),
    },
    divider: {
        marginBottom: '20px'
    },
    menuList: {
        padding: '0'
    }
}))

const MoveForm = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [addType, setAddType] = useState(1);
    const hanleChangeType = (e) => {
        setAddType(e.target.value)
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
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <RedoIcon className={classes.icon} />Chuyển sinh hoạt
            </div>
            <Dialog PaperProps={{ style: { minWidth: '1100px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chuyển sinh hoạt</DialogTitle>
                <DialogContent>
                    <FormControl margin="dense" fullWidth>
                        <Grid xs={12} container spacing={4}>
                            <Grid item container xs={6} className={classes.inputItem} spacing={1} alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Hình thức chuyển</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <MySelect
                                        value={addType}
                                        onChange={hanleChangeType}
                                    >
                                        <MenuItem value="1">Chuyển sinh hoạt tạm thời</MenuItem>
                                        <MenuItem value="2">Chuyển sinh hoạt vĩnh viễn</MenuItem>
                                    </MySelect>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid xs={12} container spacing={4}>
                            <Grid item container xs={6} className={classes.inputItem} spacing={1} alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Chuyển từ Chi bộ</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <TextField fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>
                            <Grid xs={6} className={classes.inputItem} spacing={1} container item alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Chuyển đến Đảng bộ</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <TextField fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} spacing={4}>
                            <Grid xs={6} className={classes.inputItem} spacing={1} container item alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Chuyển đến Chi bộ</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <TextField fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} spacing={4}>
                            <Grid xs={6} className={classes.inputItem} spacing={1} container item alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Ngày chuyển</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <TextField type="date" fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid item container xs={12} spacing={4}>
                            <Grid xs={12} className={classes.inputItem} spacing={1} container item alignItems="center">
                                <Grid xs={3}>
                                    <Typography>Nội dung</Typography>
                                </Grid>
                                <Grid xs={9}>
                                    <TextField multiline minRows="3" fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} info>
                        Lưu
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MoveForm;