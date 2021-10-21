import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getInfo, updateInfo } from '../action/infoAction';
import CustomLoadingOverlay from '../component/CustomLoadingOverlay';
import InputGrid from '../component/InputGrid';
import Layout from '../component/Layout';
import MyInfo from '../component/MyInfo';
import MyLevel from '../component/MyLevel';
import MyParty from '../component/MyParty';
import MyButton from '../component/UI/MyButton';
import { InfoContext } from '../contextAPI/InfoContext';
import image from '../public/image/anhthe1.png';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    wrapper: {
        marginTop: '8px'
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
    },
    imageWrapper: {
        position: 'relative',
        height: '200px',
        width: '150px',
        background: 'white',

        margin: '0 auto',
    },
    fileUpload: {
        cursor: 'pointer',
        position: 'absolute',
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
        top: '2px',
        right: '2px',
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: 'transparent',
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

}))

const MyFile = () => {
    const classes = useStyles();
    const { info, infoDispatch } = useContext(InfoContext);
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        getValues
    } = useForm();

    const [step, setStep] = useState(0);
    const [disable, setDisable] = useState(true);

    const TabPanel = (props) => {
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
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const formatDate = () => {
        setValue("NgaySinh", getValues("NgaySinh").slice(0, 10))
        setValue("NgayVaoDoan", getValues("NgaySinh").slice(0, 10))
        setValue("NgayVaoDang", getValues("NgaySinh").slice(0, 10))
        setValue("NgayChinhThuc", getValues("NgaySinh").slice(0, 10))
    }

    const handleChange = (event, newValue) => {
        setStep(newValue);
    };

    const handleRemove = () => {

    }
    const handleUpload = () => {

    }

    const handleCancer = () => {
        Object.keys(info.info).forEach(key => setValue(key, info.info[key]))
        // setValue("Tinh", "0")
        // setValue("Huyen", "0")
        // setValue("Xa", "0")
        formatDate();
        setDisable(true);
    }

    const onSubmit = (data) => {
        // console.log(data);
        updateInfo(infoDispatch, data)
        // setValue("Tinh", "0")
        // setValue("Huyen", "0")
        // setValue("Xa", "0")
        setDisable(true);
    }

    useEffect(() => {
        if (info.info) {
            Object.keys(info.info).forEach(key =>
                key == "NgoaiNgu" ?
                    info.info[key].map((el, index) => {
                        setValue(`MaNgoaiNgu${index}`, el.MaNgoaiNgu)
                        setValue(`MaTrinhDo${index}`, el.MaTrinhDo)
                    }) :
                    setValue(key, info.info[key]))
            formatDate();
        }
    }, [info])

    useEffect(() => {

    })

    useEffect(() => {
        getInfo(infoDispatch, { id: '0001' })
    }, [])

    return (
        <Layout sidebar>
            <div className={classes.header} >
                <Typography className={classes.headerContent} variant="h5">
                    Thông tin Đảng viên
                </Typography>
            </div>
            {disable ?
                (
                    <MyButton onClick={() => setDisable(false)} primary={true}>Chỉnh sửa thông tin</MyButton>
                ) :
                (
                    <>
                        <MyButton onClick={handleSubmit(onSubmit)} info={true}>Lưu</MyButton>
                        <Button onClick={handleCancer} >Hủy</Button>
                    </>
                )
            }
            <Grid container spacing={2} className={classes.wrapper}>
                <Grid item xs={4}>
                    <Paper variant="outlined" className={classes.paper}>
                        <div className={classes.imageWrapper} >
                            <img className={classes.fileUpload} style={{ height: '100%' }}
                                src={image}
                                alt="avatar-image"
                            />
                            {disable ||
                                <IconButton className={classes.closeBtn} size="small" onClick={handleRemove}>
                                    <DeleteIcon />
                                </IconButton>
                            }

                            {/* <div className={classes.loadingWrapper}>
                            <CircularProgress className={classes.loading} />
                        </div> */}

                            {/* <input type="file" multiple className={classes.fileUpload} onChange={handleUpload} /> */}
                        </div>
                        <InputGrid
                            nameTitle={`Mã Đảng viên`}
                            name={"MaDangVien"}
                            control={control}
                            errors={errors}
                            disabled={true}
                        />
                        <InputGrid
                            nameTitle={`Họ tên`}
                            name={"HoTen"}
                            control={control}
                            errors={errors}
                            disabled={true}
                        />
                        <InputGrid
                            nameTitle={`Chi bộ`}
                            name={"TenChiBo"}
                            control={control}
                            errors={errors}
                            disabled={true}
                        />
                        <InputGrid
                            nameTitle={`Giới tính`}
                            name={"GioiTinh"}
                            control={control}
                            errors={errors}
                            disabled={true}
                        />
                        <InputGrid
                            nameTitle={`CMND`}
                            name={"CMND"}
                            control={control}
                            errors={errors}
                            disabled={true}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper variant="outlined">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                        </Box>
                        <form className="add-form">
                            <TabPanel value={step} index={0}>
                                <MyInfo disable={disable} control={control} errors={errors} setValue={setValue} />
                            </TabPanel>
                            <TabPanel value={step} index={1}>
                                <MyLevel disable={disable} control={control} errors={errors} setValue={setValue} />
                            </TabPanel>
                            <TabPanel value={step} index={2}>
                                <MyParty disable={disable} control={control} errors={errors} setValue={setValue} />
                            </TabPanel>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
            <CustomLoadingOverlay loading={info.loading} />
        </Layout>
    );
};

export default MyFile;