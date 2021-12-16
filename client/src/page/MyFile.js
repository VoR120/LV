import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, IconButton, MenuItem, Paper, Tab, Tabs, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategoryPM, getFlanguageLevel } from '../action/categoryAction';
import { updateInfo } from '../action/infoAction';
import ExportFile from '../component/ExportFile';
import InputGrid from '../component/InputGrid';
import Layout from '../component/Layout';
import MyInfo from '../component/MyInfo';
import MyLevel from '../component/MyLevel';
import MyParty from '../component/MyParty';
import MyButton from '../component/UI/MyButton';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import axios from '../helper/axios';
import { getDate } from '../utils/utils';

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
    paperContent: {
        paddingBottom: '60px'
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
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.common.white,
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
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const { loading, loadingDispatch } = useContext(LoadingContext)
    const [step, setStep] = useState(0);
    const [disable, setDisable] = useState(true);
    const [flArray, setFlArray] = useState([]);
    const [levelArray, setLevelArray] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [firstImage, setFirstImage] = useState("")

    const [qqArr, setQqArr] = useState({ provinceArr: [], districtArr: [], wardArr: [] })
    const [dcttArr, setDcttArr] = useState({ provinceArr: [], districtArr: [], wardArr: [] })
    const [nohtArr, setNohtArr] = useState({ provinceArr: [], districtArr: [], wardArr: [] })
    const [qqValue, setQqValue] = useState({ provinceValue: '', districtValue: '', wardValue: '' })
    const [dcttValue, setDcttValue] = useState({ provinceValue: '', districtValue: '', wardValue: '' })
    const [nohtValue, setNohtValue] = useState({ provinceValue: '', districtValue: '', wardValue: '' })

    const dateArr = ["NgaySinh", "NgayChinhThuc", "NgayVaoDang", "NgayVaoDoan"]

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        getValues,
        reset,
        clearErrors
    } = useForm();

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

    const handleChange = (event, newValue) => {
        setStep(newValue);
    };

    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }

    const handleRemove = () => {
        setImageUpload('');
        setValue("HinhAnh", "");
    }
    const handleUpload = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        setValue("HinhAnh", file);
        setImageUpload(file);
    }

    const handleCancer = () => {
        Object.keys(info.info).forEach(key => setValue(key, info.info[key]))
        Object.keys(info.info).forEach(key => {
            let image = {};
            image.preview = info.info["HinhAnh"]
            setImageUpload(image)
            if (key == "NgoaiNgu") {
                info.info[key].map((el, index) => {
                    setValue(`MaNgoaiNgu${index}`, el.MaNgoaiNgu)
                    setValue(`MaTrinhDo${index}`, el.MaTrinhDo)
                })
            } else
                setValue(key, info.info[key])
        })
        setDisable(true);
    }

    const onSubmit = (newValue) => {
        loadingDispatch({ type: "OPEN_LOADING" })

        JSON.stringify(getValues("NgoaiNgu")) === JSON.stringify(info.info.NgoaiNgu) && delete newValue.NgoaiNgu;
        JSON.stringify(imageUpload.preview) === JSON.stringify(firstImage) && delete newValue.HinhAnh
        if (JSON.stringify({ ...qqValue, detail: getValues("QQChiTiet") }) !==
            JSON.stringify(info.info.DiaChi.QueQuan))
            newValue.QQAddress = { ...qqValue, detail: getValues("QQChiTiet") };
        if (JSON.stringify({ ...dcttValue, detail: getValues("DCTTChiTiet") }) !==
            JSON.stringify(info.info.DiaChi.DiaChiThuongTru))
            newValue.DCTTAddress = { ...dcttValue, detail: getValues("DCTTChiTiet") };
        if (JSON.stringify({ ...nohtValue, detail: getValues("NOHTChiTiet") }) !==
            JSON.stringify(info.info.DiaChi.NoiOHienTai))
            newValue.NOHTAddress = { ...nohtValue, detail: getValues("NOHTChiTiet") };

        updateInfo(infoDispatch, newValue, openSnackbarDispatch)
        setDisable(true);
    }

    useEffect(() => {
        if (info.info && !info.loading) {
            Object.keys(info.info).forEach(key => {
                function isEmpty(obj) {
                    return Object.keys(obj).length === 0;
                }
                if (dateArr.includes(key)) {
                    setValue(key, getDate(info.info[key]))
                } else if (key == "HinhAnh") {
                    setValue(key, { preview: info.info[key] })
                    setImageUpload({ preview: info.info[key] });
                    setFirstImage(info.info[key]);
                } else if (key == "NgoaiNgu") {
                    let arr = [];
                    info.info[key].map((el, index) => {
                        setValue(`MaNgoaiNgu${index}`, el.MaNgoaiNgu)
                        setValue(`MaTrinhDo${index}`, el.MaTrinhDo)
                        arr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo });
                    })
                    setFlArray(arr);
                } else if (key == "DiaChi") {
                    console.log("SetDiaChi")
                    const getProvinceArr = async () => {
                        const resQQP = await axios.get('https://provinces.open-api.vn/api/')
                        const resQQD = await axios.get(`https://provinces.open-api.vn/api/p/${info.info["DiaChi"].QueQuan.provinceValue}/?depth=2`)
                        const resQQW = await axios.get(`https://provinces.open-api.vn/api/d/${info.info["DiaChi"].QueQuan.districtValue}/?depth=2`)
                        const resDCTTP = await axios.get('https://provinces.open-api.vn/api/')
                        const resDCTTD = await axios.get(`https://provinces.open-api.vn/api/p/${info.info["DiaChi"].DiaChiThuongTru.provinceValue}/?depth=2`)
                        const resDCTTW = await axios.get(`https://provinces.open-api.vn/api/d/${info.info["DiaChi"].DiaChiThuongTru.districtValue}/?depth=2`)
                        const resNOHTP = await axios.get('https://provinces.open-api.vn/api/')
                        const resNOHTD = await axios.get(`https://provinces.open-api.vn/api/p/${info.info["DiaChi"].NoiOHienTai.provinceValue}/?depth=2`)
                        const resNOHTW = await axios.get(`https://provinces.open-api.vn/api/d/${info.info["DiaChi"].NoiOHienTai.districtValue}/?depth=2`)
                        setQqArr({ ...qqArr, provinceArr: resQQP.data, districtArr: resQQD.data.districts, wardArr: resQQW.data.wards })
                        setDcttArr({ ...dcttArr, provinceArr: resDCTTP.data, districtArr: resDCTTD.data.districts, wardArr: resDCTTW.data.wards })
                        setNohtArr({ ...nohtArr, provinceArr: resNOHTP.data, districtArr: resNOHTD.data.districts, wardArr: resNOHTW.data.wards })
                        setQqValue({
                            ...qqValue,
                            provinceValue: info.info["DiaChi"].QueQuan.provinceValue,
                            districtValue: info.info["DiaChi"].QueQuan.districtValue,
                            wardValue: info.info["DiaChi"].QueQuan.wardValue,
                        })
                        setDcttValue({
                            ...dcttValue,
                            provinceValue: info.info["DiaChi"].DiaChiThuongTru.provinceValue,
                            districtValue: info.info["DiaChi"].DiaChiThuongTru.districtValue,
                            wardValue: info.info["DiaChi"].DiaChiThuongTru.wardValue,
                        })
                        setNohtValue({
                            ...nohtValue,
                            provinceValue: info.info["DiaChi"].NoiOHienTai.provinceValue,
                            districtValue: info.info["DiaChi"].NoiOHienTai.districtValue,
                            wardValue: info.info["DiaChi"].NoiOHienTai.wardValue,
                        })
                        setValue('QQTinh', info.info["DiaChi"].QueQuan.provinceValue)
                        setValue('QQHuyen', info.info["DiaChi"].QueQuan.districtValue)
                        setValue('QQXa', info.info["DiaChi"].QueQuan.wardValue)
                        setValue('QQChiTiet', info.info["DiaChi"].QueQuan.detail)
                        setValue('DCTTTinh', info.info["DiaChi"].DiaChiThuongTru.provinceValue)
                        setValue('DCTTHuyen', info.info["DiaChi"].DiaChiThuongTru.districtValue)
                        setValue('DCTTXa', info.info["DiaChi"].DiaChiThuongTru.wardValue)
                        setValue('DCTTChiTiet', info.info["DiaChi"].DiaChiThuongTru.detail)
                        setValue('NOHTTinh', info.info["DiaChi"].NoiOHienTai.provinceValue)
                        setValue('NOHTHuyen', info.info["DiaChi"].NoiOHienTai.districtValue)
                        setValue('NOHTXa', info.info["DiaChi"].NoiOHienTai.wardValue)
                        setValue('NOHTChiTiet', info.info["DiaChi"].NoiOHienTai.detail)
                        loadingDispatch({ type: "CLOSE_LOADING" })
                    }
                    if (!isEmpty(info.info["DiaChi"]))
                        getProvinceArr();
                } else {
                    setValue(key, info.info[key])
                }
            })
        }
    }, [info])

    useEffect(() => {
        const setA = async () => {
            let arr = [];
            await Promise.all(flArray.map(async (el, index) => {
                if (el.MaNgoaiNgu != "0") {
                    const res = await getFlanguageLevel(el.MaNgoaiNgu);
                    setValue(`MaNgoaiNgu${index}`, el.MaNgoaiNgu);
                    setValue(`MaTrinhDo${index}`, el.MaTrinhDo);
                    arr[index] = res
                }
            }))
            setLevelArray(arr);
            setValue("NgoaiNgu", flArray)
        }
        if (flArray.length > 0) {
            setA();
        }
    }, [flArray])

    useEffect(() => {
        loadingDispatch({ type: "OPEN_LOADING" })
        getAllCategoryPM(categoryDispatch);
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
                    <MyButton onClick={() => setDisable(false)} primary>Chỉnh sửa thông tin</MyButton>
                ) :
                (
                    <>
                        <MyButton onClick={handleSubmit(onSubmit)} info>Lưu</MyButton>
                        <Button onClick={handleCancer} >Hủy</Button>
                    </>
                )
            }
            <ExportFile data={info.info} button />
            {loading.open ||
                <Grid container spacing={2} className={classes.wrapper}>
                    <Grid item xs={4}>
                        <Paper variant="outlined" className={classes.paper}>
                            <div className={classes.imageWrapper} >
                                <>
                                    {imageUpload?.preview ?
                                        <>
                                            <img className={classes.fileUpload} style={{ height: '100%' }}
                                                src={imageUpload.preview}
                                                alt=""
                                            />
                                            {disable ||
                                                <IconButton className={classes.closeBtn} size="small" onClick={handleRemove}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        </>
                                        :
                                        <>
                                            <input type="file" multiple className={classes.fileUpload} onChange={handleUpload} />
                                            {/* <FormHelperText error style={{ position: "absolute" }}>Vui lòng chọn ảnh!</FormHelperText> */}
                                        </>
                                    }
                                </>
                            </div>
                            <InputGrid
                                nameTitle={`Mã Đảng viên`}
                                name={"MaSoDangVien"}
                                control={control}
                                errors={errors}
                                disabled={true}
                            />
                            <InputGrid
                                nameTitle={`Họ tên`}
                                name={"HoTen"}
                                control={control}
                                errors={errors}
                                disabled={disable}
                            />
                            <InputGrid
                                select
                                nameTitle={"Chi bộ"}
                                name={"MaChiBo"}
                                defaultValue=""
                                control={control}
                                errors={errors}
                                disabled={true}
                                onChange={handleChangeSelect}
                            >
                                {
                                    category.categories.partycell.map(el =>
                                        <MenuItem key={el.MaChiBo} value={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                                    )
                                }
                            </InputGrid>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Giới tính"}
                                name={`GioiTinh`}
                                defaultValue={"0"}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                control={control}
                                errors={errors}
                                disabled={disable}
                            >
                                <MenuItem value="0">Chọn giới tính</MenuItem>
                                <MenuItem value="m">Nam</MenuItem>
                                <MenuItem value="f">Nữ</MenuItem>
                                <MenuItem value="u">Khác</MenuItem>
                            </InputGrid>
                            <InputGrid
                                nameTitle={`CMND`}
                                name={"CMND"}
                                control={control}
                                errors={errors}
                                disabled={disable}
                            />
                            <InputGrid
                                select
                                nameTitle={"Chức vụ"}
                                name={"MaChucVu"}
                                defaultValue=""
                                control={control}
                                errors={errors}
                                disabled={true}
                                onChange={handleChangeSelect}
                            >
                                {
                                    category.categories.position.map(el =>
                                        <MenuItem key={el.MaChucVu} value={el.MaChucVu}>{el.TenChucVu}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paperContent} variant="outlined">
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
                            {loading.open ||
                                <form className="add-form">
                                    <TabPanel value={step} index={0}>
                                        <MyInfo
                                            loading={loading.open}
                                            disable={disable}
                                            control={control}
                                            errors={errors}
                                            setValue={setValue}
                                            clearErrors={clearErrors}
                                            getValues={getValues}
                                            qqArr={qqArr}
                                            setQqArr={setQqArr}
                                            dcttArr={dcttArr}
                                            setDcttArr={setDcttArr}
                                            nohtArr={nohtArr}
                                            setNohtArr={setNohtArr}
                                            qqValue={qqValue}
                                            setQqValue={setQqValue}
                                            dcttValue={dcttValue}
                                            setDcttValue={setDcttValue}
                                            nohtValue={nohtValue}
                                            setNohtValue={setNohtValue} F
                                        />
                                    </TabPanel>
                                    <TabPanel value={step} index={1}>
                                        <MyLevel
                                            disable={disable}
                                            control={control}
                                            errors={errors}
                                            setValue={setValue}
                                            loading={loading.open}
                                            flArray={flArray}
                                            setFlArray={setFlArray}
                                            levelArray={levelArray}
                                            setLevelArray={setLevelArray}
                                        />
                                    </TabPanel>
                                    <TabPanel value={step} index={2}>
                                        <MyParty
                                            disable={disable}
                                            control={control}
                                            errors={errors}
                                            setValue={setValue}
                                            loading={loading.open}
                                        />
                                    </TabPanel>
                                </form>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            }
        </Layout>
    );
};

export default MyFile;