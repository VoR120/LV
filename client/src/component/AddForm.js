import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box, Button,
    Dialog, DialogActions, DialogTitle, Tab, Tabs
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategory, getFlanguageLevel } from '../action/categoryAction';
import { addPartyMember, updatePartyMember } from '../action/partyMemberAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import axios from '../helper/axios';
import '../public/css/Form.scss';
import { dateArr, getDate, getLocaleDate } from '../utils/utils';
import Loading from './CustomLoadingOverlay';
import InfoForm from './InfoForm';
import LevelForm from './LevelForm';
import PartyForm from './PartyForm';
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
    },
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
}))


const AddForm = ({ edit, data, setRows, rows }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { partyMember, partyMemberDispatch } = useContext(PartyMemberContext);
    const { loadingDispatch } = useContext(LoadingContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const [flArray, setFlArray] = useState([{ MaNgoaiNgu: "0", MaTrinhDo: "0" }]);
    const [levelArray, setLevelArray] = useState([]);
    const [imageUpload, setImageUpload] = useState("")
    const [firstImage, setFirstImage] = useState("")

    const [qqArr, setQqArr] = useState({ provinceArr: [], districtArr: [], wardArr: [] })
    const [dcttArr, setDcttArr] = useState({ provinceArr: [], districtArr: [], wardArr: [] })
    const [nohtArr, setNohtArr] = useState({ provinceArr: [], districtArr: [], wardArr: [] })
    const [qqValue, setQqValue] = useState({ provinceValue: '', districtValue: '', wardValue: '' })
    const [dcttValue, setDcttValue] = useState({ provinceValue: '', districtValue: '', wardValue: '' })
    const [nohtValue, setNohtValue] = useState({ provinceValue: '', districtValue: '', wardValue: '' })

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        clearErrors,
        getValues,
        watch,
        formState: { errors }
    } = useForm();

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
            // disabled: index > step ? true : false
        };
    }
    const handleChange = (event, newValue) => {
        setStep(newValue);
    };

    const updateAndFetch = async (newValue) => {
        let res = edit
            ? await updatePartyMember(partyMemberDispatch, newValue)
            : await addPartyMember(partyMemberDispatch, newValue);
        if (res.error) {
            loadingDispatch({ type: 'CLOSE_LOADING' })
            setStep(0);
            setError(res.error.type,
                {
                    type: "manual",
                    message: res.error.msg,
                }
            )
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
            edit
                ? setRows(rows.map(el => el.MaSoDangVien == res.MaSoDangVien ? res : el))
                : setRows([...rows, res])
            loadingDispatch({ type: 'CLOSE_LOADING' })
            setOpen(false);
        }
    }

    const onSubmit = (newValue) => {
        if (edit) {
            JSON.stringify(imageUpload.preview) === JSON.stringify(firstImage) && delete newValue.HinhAnh
            JSON.stringify(getValues("NgoaiNgu")) === JSON.stringify(data.NgoaiNgu) && delete newValue.NgoaiNgu
            if (JSON.stringify({ ...qqValue, detail: getValues("QQChiTiet") }) !==
                JSON.stringify(data.DiaChi.QueQuan))
                newValue.QQAddress = { ...qqValue, detail: getValues("QQChiTiet") };
            if (JSON.stringify({ ...dcttValue, detail: getValues("DCTTChiTiet") }) !==
                JSON.stringify(data.DiaChi.DiaChiThuongTru))
                newValue.DCTTAddress = { ...dcttValue, detail: getValues("DCTTChiTiet") };
            if (JSON.stringify({ ...nohtValue, detail: getValues("NOHTChiTiet") }) !==
                JSON.stringify(data.DiaChi.NoiOHienTai))
                newValue.NOHTAddress = { ...nohtValue, detail: getValues("NOHTChiTiet") };
        } else {
            newValue.QQAddress = { ...qqValue, detail: getValues("QQChiTiet") };
            newValue.DCTTAddress = { ...dcttValue, detail: getValues("DCTTChiTiet") };
            newValue.NOHTAddress = { ...nohtValue, detail: getValues("NOHTChiTiet") };
        }
        if (step != 2)
            setStep(previewStep => previewStep + 1);
        else {
            loadingDispatch({ type: "OPEN_LOADING" })
            updateAndFetch(newValue);
        }
    }


    useEffect(() => {
        if (edit) {
            Object.keys(data).forEach(key => {
                function isEmpty(obj) {
                    return Object.keys(obj).length === 0;
                }
                if (dateArr.includes(key)) {
                    setValue(key, getDate(data[key]))
                } else if (key == "HinhAnh") {
                    setValue(key, { preview: data[key] })
                    setImageUpload({ preview: data[key] })
                    setFirstImage(data[key]);
                } else if (key == "NgoaiNgu") {
                    let arr = [];
                    data[key].map((el, index) => {
                        setValue(`MaNgoaiNgu${index}`, el.MaNgoaiNgu)
                        setValue(`MaTrinhDo${index}`, el.MaTrinhDo)
                        arr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo });
                    })
                    setFlArray(arr);
                } else if (key == "DiaChi") {
                    const getProvinceArr = async () => {
                        const resQQP = await axios.get('https://provinces.open-api.vn/api/')
                        const resQQD = await axios.get(`https://provinces.open-api.vn/api/p/${data["DiaChi"].QueQuan.provinceValue}/?depth=2`)
                        const resQQW = await axios.get(`https://provinces.open-api.vn/api/d/${data["DiaChi"].QueQuan.districtValue}/?depth=2`)
                        const resDCTTP = await axios.get('https://provinces.open-api.vn/api/')
                        const resDCTTD = await axios.get(`https://provinces.open-api.vn/api/p/${data["DiaChi"].DiaChiThuongTru.provinceValue}/?depth=2`)
                        const resDCTTW = await axios.get(`https://provinces.open-api.vn/api/d/${data["DiaChi"].DiaChiThuongTru.districtValue}/?depth=2`)
                        const resNOHTP = await axios.get('https://provinces.open-api.vn/api/')
                        const resNOHTD = await axios.get(`https://provinces.open-api.vn/api/p/${data["DiaChi"].NoiOHienTai.provinceValue}/?depth=2`)
                        const resNOHTW = await axios.get(`https://provinces.open-api.vn/api/d/${data["DiaChi"].NoiOHienTai.districtValue}/?depth=2`)
                        setQqArr({ ...qqArr, provinceArr: resQQP.data, districtArr: resQQD.data.districts, wardArr: resQQW.data.wards })
                        setDcttArr({ ...dcttArr, provinceArr: resDCTTP.data, districtArr: resDCTTD.data.districts, wardArr: resDCTTW.data.wards })
                        setNohtArr({ ...nohtArr, provinceArr: resNOHTP.data, districtArr: resNOHTD.data.districts, wardArr: resNOHTW.data.wards })
                        setQqValue({
                            ...qqValue,
                            provinceValue: data["DiaChi"].QueQuan.provinceValue,
                            districtValue: data["DiaChi"].QueQuan.districtValue,
                            wardValue: data["DiaChi"].QueQuan.wardValue,
                        })
                        setDcttValue({
                            ...dcttValue,
                            provinceValue: data["DiaChi"].DiaChiThuongTru.provinceValue,
                            districtValue: data["DiaChi"].DiaChiThuongTru.districtValue,
                            wardValue: data["DiaChi"].DiaChiThuongTru.wardValue,
                        })
                        setNohtValue({
                            ...nohtValue,
                            provinceValue: data["DiaChi"].NoiOHienTai.provinceValue,
                            districtValue: data["DiaChi"].NoiOHienTai.districtValue,
                            wardValue: data["DiaChi"].NoiOHienTai.wardValue,
                        })
                        setValue('QQTinh', data["DiaChi"].QueQuan.provinceValue)
                        setValue('QQHuyen', data["DiaChi"].QueQuan.districtValue)
                        setValue('QQXa', data["DiaChi"].QueQuan.wardValue)
                        setValue('QQChiTiet', data["DiaChi"].QueQuan.detail)
                        setValue('DCTTTinh', data["DiaChi"].DiaChiThuongTru.provinceValue)
                        setValue('DCTTHuyen', data["DiaChi"].DiaChiThuongTru.districtValue)
                        setValue('DCTTXa', data["DiaChi"].DiaChiThuongTru.wardValue)
                        setValue('DCTTChiTiet', data["DiaChi"].DiaChiThuongTru.detail)
                        setValue('NOHTTinh', data["DiaChi"].NoiOHienTai.provinceValue)
                        setValue('NOHTHuyen', data["DiaChi"].NoiOHienTai.districtValue)
                        setValue('NOHTXa', data["DiaChi"].NoiOHienTai.wardValue)
                        setValue('NOHTChiTiet', data["DiaChi"].NoiOHienTai.detail)
                    }
                    if (!isEmpty(data["DiaChi"]))
                        getProvinceArr();
                } else {
                    setValue(key, data[key])
                }
            })
        } else {
            const fetchAPI = async () => {
                const res = await axios.get('https://provinces.open-api.vn/api/')
                setQqArr({ ...qqArr, provinceArr: res.data })
                setDcttArr({ ...dcttArr, provinceArr: res.data })
                setNohtArr({ ...nohtArr, provinceArr: res.data })
                setLoading(false);
            }
            fetchAPI();
        }
    }, [])

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
        if (flArray.length > 0)
            setA();
    }, [flArray])

    useEffect(() => {
        if (imageUpload)
            setValue("HinhAnh", imageUpload);
    }, [imageUpload])

    return (
        <>
            {
                edit ?
                    <div className={classes.iconWrapper} onClick={handleOpen}>
                        <EditIcon className={classes.icon} />Chỉnh sửa
                    </div>
                    :
                    <MyButton onClick={handleOpen} success><AddIcon />Thêm</MyButton>
            }
            <Dialog PaperProps={{ style: { minWidth: '1100px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thêm Đảng viên</DialogTitle>
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
                    <div
                        role="tabpanel"
                        hidden={step !== 0}
                        id={`simple-tabpanel-0`}
                        aria-labelledby={`simple-tab-0`}
                    >
                        {step === 0 && (
                            <Box p={3}>
                                <InfoForm
                                    edit={edit}
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
                                    setNohtValue={setNohtValue}
                                    imageUpload={imageUpload}
                                    setImageUpload={setImageUpload}
                                />
                            </Box>
                        )}
                    </div>
                    <div
                        role="tabpanel"
                        hidden={step !== 1}
                        id={`simple-tabpanel-1`}
                        aria-labelledby={`simple-tab-1`}
                    >
                        {step === 1 && (
                            <Box p={3}>
                                <LevelForm
                                    control={control}
                                    errors={errors}
                                    setValue={setValue}
                                    flArray={flArray}
                                    setFlArray={setFlArray}
                                    levelArray={levelArray}
                                    setLevelArray={setLevelArray}
                                    edit={edit}
                                    clearErrors={clearErrors}
                                />
                            </Box>
                        )}
                    </div>
                    <div
                        role="tabpanel"
                        hidden={step !== 2}
                        id={`simple-tabpanel-2`}
                        aria-labelledby={`simple-tab-2`}
                    >
                        {step === 2 && (
                            <Box p={3}>
                                <PartyForm
                                    control={control}
                                    errors={errors}
                                    setValue={setValue}
                                    watch={watch}
                                    clearErrors={clearErrors}
                                />
                            </Box>
                        )}
                    </div>
                </form>
                {/* {...register("name", {
                            required: true,
                            pattern: /^[A-Za-z]+$/i,
                        })}
                        {...register("phone", {
                            required: true,
                            pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                        })}
                        {...register("email", {
                            required: true,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })} */}
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} success>
                        {step != 2 ? "Tiếp" : "Lưu"}
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddForm;