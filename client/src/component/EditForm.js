import EditIcon from '@mui/icons-material/Edit';
import {
    AppBar, Box, Button,
    Dialog, DialogActions, DialogTitle, Tab, Tabs, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../public/css/Form.scss';
import InfoForm from './InfoForm';
import LevelForm from './LevelForm';
import PartyForm from './PartyForm';
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
    btn: {

    }
}))

const formatDate = (d) => {
    if (d == null) return '';
    const date = new Date(d);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day

    return year + "-" + month + "-" + day
}

const EditForm = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { data } = props;
    data.birth = formatDate(data.birth);
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
    const handleRemove = () => {

    }
    const handleUpload = () => {

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
        <>
            {/* <Button onClick={handleOpen} size="small" className={classes.editBtn}>
                <EditIcon />
            </Button> */}
            <div className={classes.iconWrapper} onClick={handleOpen}>
                <EditIcon className={classes.icon} />Chỉnh sửa
            </div>
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
                        <InfoForm update data={data} />
                    </TabPanel>
                    <TabPanel value={step} index={1}>
                        <LevelForm update data={data} />
                    </TabPanel>
                    <TabPanel value={step} index={2}>
                        <PartyForm update data={data} />
                    </TabPanel>
                </form>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} info>Lưu</MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditForm;