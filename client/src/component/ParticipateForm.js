import { Divider, FormControl, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import MySelect from './UI/MySelect';

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
    inputItem: {
        marginBottom: theme.spacing(2),
    },
    divider: {
        marginBottom: '20px'
    }
}))

const ParticipateForm = () => {
    const classes = useStyles();
    const [imageUpload, setImageUpload] = useState('');
    const [loading, setLoading] = useState(false);
    const [addType, setAddType] = useState(0);
    const hanleChangeType = (e) => {
        setAddType(e.target.value)
    }
    const handleRemove = () => {

    }
    const handleUpload = () => {

    }
    return (
        <FormControl margin="dense" fullWidth>
            <Grid xs={12} container spacing={4}>
                <Grid item xs={6}>
                    <Grid item className={classes.inputItem} spacing={1} fullWidth container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Hình thức thêm</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <MySelect
                                value={addType}
                                onChange={hanleChangeType}
                            >
                                <MenuItem value="0">Không</MenuItem>
                                <MenuItem value="1">Kết nạp mới</MenuItem>
                                <MenuItem value="2">Chuyển sinh hoạt</MenuItem>
                            </MySelect>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            {addType == "2" && (
                <>
                    <Grid xs={12} container spacing={4}>
                        <Grid item xs={6}>
                            <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Chuyển từ Chi bộ</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <TextField fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>
                            <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Chuyển đến Chi bộ</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <TextField fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={6} spacing={4}>
                            <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                                <Grid xs={5}>
                                    <Typography>Chuyển từ Đảng bộ</Typography>
                                </Grid>
                                <Grid xs={7}>
                                    <TextField fullWidth size="small" variant="outlined" />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                </>
            )}
            <Grid xs={12} container spacing={4}>
                <Grid item xs={6}>
                    <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Ngày vào Đoàn TNCSHCM</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField type="date" fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Ngày vào Đảng CSVN lần thứ nhất</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField type="date" fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Ngày công nhận chính thức lần thứ nhất</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField type="date" fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Người giới thiệu vào Đảng lần thứ nhất</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} spacing={4}>
                    <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Nơi vào Đoàn TNCSHCM</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Nơi vào Đảng CSVN lần thứ nhất</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} spacing={1} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Nơi công nhận chính thức lần thứ nhất</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default ParticipateForm;