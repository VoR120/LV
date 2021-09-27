import {
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';

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
    }
}))

const LevelForm = () => {
    const classes = useStyles();
    const [imageUpload, setImageUpload] = useState('');
    const [loading, setLoading] = useState(false);
    const handleRemove = () => {

    }
    const handleUpload = () => {

    }
    return (
        <FormControl margin="dense" fullWidth>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Grid className={classes.inputItem} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Nghề nghiệp hiện nay</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Trình độ học vấn</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid className={classes.inputItem} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Học hàm</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Lí luận chính trị</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Ngoại ngữ</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className={classes.inputItem} container alignItems="center">
                        <Grid xs={5}>
                            <Typography>Tin học</Typography>
                        </Grid>
                        <Grid xs={7}>
                            <TextField fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid className={classes.input} item xs={6}>
                                    <div className={classes.imageWrapper} >
                                        {imageUpload.length > 0 ?
                                            imageUpload.map((img) => {
                                                return (
                                                    <>
                                                        <img className={classes.fileUpload} style={{ height: '100%' }}
                                                            src={img.url}
                                                            alt=""
                                                        />
                                                        <IconButton className={classes.closeBtn} size="small" onClick={handleRemove}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>)
                                            })
                                            :
                                            <>
                                                {loading ?
                                                    <div className={classes.loadingWrapper}>
                                                        <CircularProgress className={classes.loading} />
                                                    </div>
                                                    :
                                                    <input type="file" multiple className={classes.fileUpload} onChange={handleUpload} />
                                                }
                                            </>
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={6} container>
                                    <Grid className={classes.input} item xs={12}>
                                        <TextField
                                            {...register("name", {
                                                required: true,
                                                pattern: /^[A-Za-z]+$/i,
                                            })}
                                            fullWidth
                                            label="Họ Tên"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="Nguyễn Văn A"
                                        />
                                        {errors?.name?.type === "required" &&
                                            <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                        }
                                    </Grid>
                                    <Grid className={classes.input} item xs={12}>
                                        <TextField
                                            {...register("birth", {
                                                required: true,
                                                pattern: /^[A-Za-z]+$/i,
                                            })}
                                            type="date"
                                            fullWidth
                                            label="Ngày sinh"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />
                                        {errors?.birth?.type === "required" &&
                                            <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                        }
                                    </Grid>

                                    <Grid className={classes.input} item xs={12}>
                                        <TextField
                                            {...register("address", {
                                                required: true,
                                                pattern: /^[A-Za-z]+$/i,
                                            })}
                                            fullWidth
                                            label="Địa chỉ cụ thể"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="Số nhà..., đường..., quận..."

                                        />
                                        {errors?.address?.type === "required" &&
                                            <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                        }
                                    </Grid>
                                    <Grid className={classes.input} item xs={6}>
                                        <TextField
                                            {...register("phone", {
                                                required: true,
                                                pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                            })}
                                            fullWidth
                                            label="Số điện thoại"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="0123456789"

                                        />
                                        {errors?.phone?.type === "required" &&
                                            <FormHelperText error>Vui lòng nhập số điện thoại!</FormHelperText>
                                        }
                                        {errors?.phone?.type === "pattern" &&
                                            <FormHelperText error>Số điện thoại không hợp lệ!</FormHelperText>
                                        }
                                    </Grid>
                                    <Grid className={classes.input} item xs={6}>
                                        <TextField
                                            {...register("email", {
                                                required: true,
                                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            })}
                                            fullWidth
                                            label="Email"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="example@gmail.com"
                                        />
                                        {errors?.email?.type === "required" &&
                                            <FormHelperText error>Vui lòng nhập email!</FormHelperText>
                                        }
                                        {errors?.email?.type === "pattern" &&
                                            <FormHelperText error>Email không hợp lệ!</FormHelperText>
                                        }
                                    </Grid>
                                </Grid>*/}

            </Grid>
        </FormControl>
    );
};

export default LevelForm;