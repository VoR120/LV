import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
    FormHelperText,
    FormControl,
    InputLabel,
    IconButton,
    CircularProgress,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import '../public/css/Form.scss'
import InfoForm from './InfoForm';
import LevelForm from './LevelForm';
import ParticipateForm from './ParticipateForm';
import MyButton from './UI/MyButton';

const useStyles = makeStyles(theme => ({
    btn: {
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
    }
}))


const AddForm = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [imageUpload, setImageUpload] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
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
        alert("abc")
        // setOpen(false)
    }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setStep(newValue);
    };
    return (
        <div className="add-form">
            <MyButton onClick={handleOpen} success><AddIcon />Thêm</MyButton>
            <Dialog PaperProps={{ style: { minWidth: '1100px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thêm Đảng viên</DialogTitle>
                <AppBar className={classes.tabsbar} position="static">
                    <Tabs
                        value={step}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Cơ bản" {...a11yProps(0)} />
                        <Tab label="Trình độ" {...a11yProps(1)} />
                        <Tab label="Về Đoàn / Đảng" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <form className="add-form">
                    <TabPanel value={step} index={0}>
                        <InfoForm />
                    </TabPanel>
                    <TabPanel value={step} index={1}>
                        <LevelForm />
                    </TabPanel>
                    <TabPanel value={step} index={2}>
                        <ParticipateForm />
                    </TabPanel>
                </form>
                <DialogContent>
                    <form>
                        {/*<FormControl margin="dense" fullWidth>
                            <Grid container spacing={4}>
                                <Grid item xs={5}>
                                    <Grid container alignItems="center">
                                        <Grid xs={5}>
                                            <Typography>Họ và tên đang dùng</Typography>
                                        </Grid>
                                        <Grid xs={7}>
                                            <TextField fullWidth size="small" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item alignItems="center" xs={5}>
                                    <Grid container alignItems="center">
                                        <Grid xs={5}>
                                            <Typography>Họ và tên khai sinh</Typography>
                                        </Grid>
                                        <Grid xs={7}>
                                            <TextField fullWidth size="small" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}>
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
                                </Grid>

                            </Grid> 
                        </FormControl>*/}
                    </form>
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
        </div>
    );
};

export default AddForm;