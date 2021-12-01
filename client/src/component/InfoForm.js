import React, { Fragment, useContext, useEffect } from 'react';
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
    Radio,
    FormControlLabel,
    RadioGroup,
    MenuItem,
    Divider,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputGrid from './InputGrid';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { getAllCategory } from '../action/categoryAction';
import MySelectReactHookForm from './UI/MySelectReactHookForm';
import axios from '../helper/axios';

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
    inputItem: {
        marginBottom: theme.spacing(2),
    },
    inputRadioItem: {
        marginBottom: theme.spacing(2),
        maxHeight: '40px',
        flexWrap: 'nowrap'
    }
}))

const InfoForm = (props) => {
    const { control, errors, setValue, setError, clearErrors, getValues,
        open, setOpen, setMessage, edit,
        qqArr, setQqArr,
        dcttArr, setDcttArr,
        nohtArr, setNohtArr,
        qqValue, setQqValue,
        dcttValue, setDcttValue,
        nohtValue, setNohtValue,
        setImageUpload } = props
    const classes = useStyles();

    // State
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState('');

    // ContextAPI
    const { category, categoryDispatch } = useContext(CategoryContext);

    // Function
    const handleRemove = () => {
        setValue("HinhAnh", "");
        setImageUpload('');
    }
    const handleUpload = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file)
        console.log(file);
        setValue("HinhAnh", file);
        setImageUpload(file);
    }
    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
        if (e.target.value != "0") {
            clearErrors(e.target.name)
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
    }
    const handleChangePosition = (e) => {
        const { name, value } = e.target;
        if (name != "0") {
            clearErrors(name)
        }
        setValue(name, value);
    }

    const handleChangeProvince = (e, type) => {
        const { name, value } = e.target;
        setValue(name, value);
        if (value != "0") {
            clearErrors(e.target.name)
        }
        switch (type) {
            case "qq":
                setQqValue({ ...qqValue, provinceValue: value });
                const fetchApiSetQq = async () => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/p/${value}/?depth=2`)
                    setQqArr({ ...qqArr, districtArr: res.data.districts })
                }
                if (value != '0') {
                    fetchApiSetQq();
                } else
                    setQqArr({ ...qqArr, districtArr: [], wardArr: [] });
                setValue("QQHuyen", "0");
                setValue("QQXa", "0");
                break;
            case "dctt":
                setDcttValue({ ...dcttValue, provinceValue: value });
                const fetchApiSetDctt = async () => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/p/${value}/?depth=2`)
                    setDcttArr({ ...dcttArr, districtArr: res.data.districts })
                }
                if (value != '0') {
                    fetchApiSetDctt();
                } else
                    setDcttArr({ ...dcttArr, districtArr: [], wardArr: [] });
                setValue("DCTTHuyen", "0");
                setValue("DCTTXa", "0");
                break;
            case "noht":
                setNohtValue({ ...nohtValue, provinceValue: value });
                const fetchApiSetNoht = async () => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/p/${value}/?depth=2`)
                    setNohtArr({ ...nohtArr, districtArr: res.data.districts })
                }
                if (value != '0') {
                    fetchApiSetNoht();
                } else
                    setNohtArr({ ...nohtArr, districtArr: [], wardArr: [] });
                setValue("NOHTHuyen", "0");
                setValue("NOHTXa", "0");
            default:
                break;
        }
    }

    const handleChangeDistrict = (e, type) => {
        const { name, value } = e.target;
        setValue(name, value);
        if (value != "0") {
            clearErrors(e.target.name)
        }
        switch (type) {
            case "qq":
                setQqValue({ ...qqValue, districtValue: value });
                const fetchApiSetQq = async () => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/d/${value}/?depth=2`)
                    setQqArr({ ...qqArr, wardArr: res.data.wards })
                }
                if (value != '0') {
                    fetchApiSetQq();
                } else
                    setQqArr({ ...qqArr, wardArr: [] })
                setValue("QQXa", "0")
                break;
            case "dctt":
                setDcttValue({ ...dcttValue, districtValue: value });
                const fetchApiSetDctt = async () => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/d/${value}/?depth=2`)
                    setDcttArr({ ...dcttArr, wardArr: res.data.wards })
                }
                if (value != '0') {
                    fetchApiSetDctt();
                } else
                    setDcttArr({ ...dcttArr, wardArr: [] })
                setValue("DCTTXa", "0")
                break;
            case "noht":
                setNohtValue({ ...nohtValue, districtValue: value });
                const fetchApiSetNoht = async () => {
                    const res = await axios.get(`https://provinces.open-api.vn/api/d/${value}/?depth=2`)
                    setNohtArr({ ...nohtArr, wardArr: res.data.wards })
                }
                if (value != '0') {
                    fetchApiSetNoht();
                } else
                    setNohtArr({ ...nohtArr, wardArr: [] })
                setValue("NOHTXa", "0")
                break;
            default:
                break;
        }
    }

    const handleChangeWard = (e, type) => {
        const { name, value } = e.target;
        setValue(name, value);
        if (value != "0") {
            clearErrors(e.target.name)
        }
        switch (type) {
            case "qq":
                if (value != 0)
                    setQqValue({ ...qqValue, wardValue: value });
                break;
            case "dctt":
                if (value != 0)
                    setDcttValue({ ...dcttValue, wardValue: value });
                break;
            case "noht":
                if (value != 0)
                    setNohtValue({ ...nohtValue, wardValue: value });
            default:
                break;
        }
    }

    // useEffect

    // useEffect(() => {
    //     if (getValues("HinhAnh")) {
    //         let file = {};
    //         file.preview = getValues("HinhAnh");
    //         setValue("HinhAnh", file)
    //     }
    // }, [])
    // useEffect(() => {
    //     return () => {
    //         if (!getValues("HinhAnh")) {
    //             imageUpload && URL.revokeObjectURL(imageUpload.preview)
    //         }
    //     }
    // }, [imageUpload])

    return (
        <FormControl margin="dense" fullWidth>
            <Grid container spacing={1}>
                <Grid item container xs={9} spacing={1}>
                    <Grid item xs={6}>
                        <InputGrid
                            key={1}
                            nameTitle={`Họ tên`}
                            name={"HoTen"}
                            defaultValue={""}
                            control={control}
                            errors={errors}
                            rules={{ required: "Vui lòng nhập trường này!" }}
                        />
                        <InputGrid
                            nameTitle={`Mã Đảng viên`}
                            name={"MaSoDangVien"}
                            defaultValue={""}
                            control={control}
                            errors={errors}
                            disabled={edit}
                        />
                        <InputGrid
                            type="date"
                            nameTitle={`Ngày sinh`}
                            name={"NgaySinh"}
                            control={control}
                            errors={errors}
                        />
                        <InputGrid
                            nameTitle={`Nơi sinh`}
                            name={"NoiSinh"}
                            control={control}
                            errors={errors}
                        />
                        <InputGrid
                            nameTitle={`CMND`}
                            name={"CMND"}
                            defaultValue={""}
                            control={control}
                            errors={errors}
                        />
                        <InputGrid
                            nameTitle={`Quốc tịch`}
                            defaultValue={"Việt Nam"}
                            name={"QuocTich"}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            select
                            onChange={handleChangeSelect}
                            nameTitle={"Chi bộ"}
                            name={`MaChiBo`}
                            defaultValue={"0"}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui lòng nhập trường này!"
                            }}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value="0">Chọn chi bộ</MenuItem>
                            {category.categories.partycell.length > 0 &&
                                category.categories.partycell.map(el =>
                                    <MenuItem key={el.MaChiBo} value={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                                )
                            }
                        </InputGrid>
                        <InputGrid
                            select
                            onChange={handleChangePosition}
                            nameTitle={"Chức vụ"}
                            name={`MaChucVu`}
                            defaultValue={"0"}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui lòng nhập trường này!"
                            }}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value="0">Chọn chức vụ</MenuItem>
                            {category.categories.position.length > 0 &&
                                category.categories.position.map(el =>
                                    <MenuItem key={el.MaChucVu} value={el.MaChucVu}>{el.TenChucVu}</MenuItem>
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
                        >
                            <MenuItem value="0">Chọn giới tính</MenuItem>
                            <MenuItem value="m">Nam</MenuItem>
                            <MenuItem value="f">Nữ</MenuItem>
                            <MenuItem value="u">Khác</MenuItem>
                        </InputGrid>
                        <InputGrid
                            select
                            onChange={handleChangeSelect}
                            nameTitle={"Dân tộc"}
                            name={`MaDanToc`}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui lòng nhập trường này!"
                            }}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value={"0"}>Chọn dân tộc</MenuItem>
                            {category.categories.ethnic.length > 0 &&
                                category.categories.ethnic.map(el =>
                                    <MenuItem key={el.MaDanToc} value={el.MaDanToc}>{el.TenDanToc}</MenuItem>
                                )
                            }
                        </InputGrid>
                        <InputGrid
                            select
                            onChange={handleChangeSelect}
                            nameTitle={"Tôn giáo"}
                            name={`MaTonGiao`}
                            defaultValue={"1"}
                            control={control}
                            errors={errors}
                        >
                            {category.categories.religion.length > 0 &&
                                category.categories.religion.map(el =>
                                    <MenuItem key={el.MaTonGiao} value={el.MaTonGiao}>{el.TenTonGiao}</MenuItem>
                                )
                            }
                        </InputGrid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.imageWrapper} >
                        <>
                            {getValues("HinhAnh") ?
                                <>
                                    <img className={classes.fileUpload} style={{ height: '100%' }}
                                        src={getValues("HinhAnh").preview}
                                        alt=""
                                    />
                                    <IconButton className={classes.closeBtn} size="small" onClick={handleRemove}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                                :
                                <>
                                    <input type="file" multiple className={classes.fileUpload} onChange={handleUpload} />
                                    {/* <FormHelperText error style={{ position: "absolute" }}>Vui lòng chọn ảnh!</FormHelperText> */}
                                </>
                            }
                        </>
                    </div>
                    <Grid className={classes.inputItem} direction="column" container>
                        <Grid item xs={12}>
                            <Typography>Email</Typography>
                        </Grid>
                        <InputGrid
                            noTitle
                            name={"Email"}
                            control={control}
                            errors={errors}
                        />
                        <Grid item xs={12}>
                            <Typography>Số điện thoại</Typography>
                        </Grid>
                        <InputGrid
                            noTitle
                            name={"SoDienThoai"}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid container item xs={9}>
                    <Grid item style={{ width: '150px' }}>
                        <Typography>Quê quán</Typography>
                    </Grid>
                    <Grid item container flex={1} spacing={1}>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Tỉnh"}
                                name={"QQTinh"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeProvince(e, "qq")}
                            >
                                <MenuItem value="0">Tỉnh</MenuItem>
                                {qqArr.provinceArr.map(pro =>
                                    <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Huyện"}
                                name={"QQHuyen"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeDistrict(e, "qq")}

                            >
                                <MenuItem value="0">Huyện</MenuItem>
                                {qqArr.districtArr.map(dis =>
                                    <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Xã"}
                                name={"QQXa"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeWard(e, "qq")}
                            >
                                <MenuItem value="0">Xã</MenuItem>
                                {qqArr.wardArr.map(w =>
                                    <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={12}>
                            <InputGrid
                                onChange={handleChangeInput}
                                placeholder={"Số nhà, Đường..."}
                                noTitle
                                name={"QQChiTiet"}
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            // rules={{ required: "Vui lòng nhập trường này!" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={9}>
                    <Grid item style={{ width: '150px' }}>
                        <Typography>Địa chỉ thường trú</Typography>
                    </Grid>
                    <Grid item container flex={1} spacing={1}>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Tỉnh"}
                                name={"DCTTTinh"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeProvince(e, "dctt")}
                            >
                                <MenuItem value="0">Tỉnh</MenuItem>
                                {dcttArr.provinceArr.map(pro =>
                                    <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Huyện"}
                                name={"DCTTHuyen"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeDistrict(e, "dctt")}

                            >
                                <MenuItem value="0">Huyện</MenuItem>
                                {dcttArr.districtArr.map(dis =>
                                    <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Xã"}
                                name={"DCTTXa"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeWard(e, "dctt")}
                            >
                                <MenuItem value="0">Xã</MenuItem>
                                {dcttArr.wardArr.map(w =>
                                    <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={12}>
                            <InputGrid
                                onChange={handleChangeInput}
                                placeholder={"Số nhà, Đường..."}
                                noTitle
                                name={"DCTTChiTiet"}
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            // rules={{ required: "Vui lòng nhập trường này!" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={9}>
                    <Grid item style={{ width: '150px' }}>
                        <Typography>Nơi ở hiện tại</Typography>
                    </Grid>
                    <Grid item container flex={1} spacing={1}>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Tỉnh"}
                                name={"NOHTTinh"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeProvince(e, "noht")}
                            >
                                <MenuItem value="0">Tỉnh</MenuItem>
                                {nohtArr.provinceArr.map(pro =>
                                    <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Huyện"}
                                name={"NOHTHuyen"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeDistrict(e, "noht")}

                            >
                                <MenuItem value="0">Huyện</MenuItem>
                                {nohtArr.districtArr.map(dis =>
                                    <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Xã"}
                                name={"NOHTXa"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui lòng nhập trường này!"
                                }}
                                onChange={e => handleChangeWard(e, "noht")}
                            >
                                <MenuItem value="0">Xã</MenuItem>
                                {nohtArr.wardArr.map(w =>
                                    <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={12}>
                            <InputGrid
                                onChange={handleChangeInput}
                                placeholder={"Số nhà, Đường..."}
                                noTitle
                                name={"NOHTChiTiet"}
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            // rules={{ required: "Vui lòng nhập trường này!" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default InfoForm;

/* <Grid className={classes.input} item xs={6}>
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
                                </Grid>*/