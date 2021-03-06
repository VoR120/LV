import DeleteIcon from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
import {
    FormControl, Grid, IconButton, MenuItem, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import axios from '../helper/axios';
import InputGrid from './InputGrid';
import MySelectReactHookForm from './UI/MySelectReactHookForm';

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
        imageUpload, setImageUpload } = props
    const classes = useStyles();

    // State
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState('');

    // ContextAPI
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { info } = useContext(InfoContext);
    const isDePer = info.info.Quyen["12"] == 1;

    // Function
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
    let positionArr = isDePer
        ? category.categories.position
        : category.categories.position.filter(el => [2, 3, 4].includes(el.MaChucVu))
    return (
        <FormControl margin="dense" fullWidth>
            <Grid container spacing={1}>
                <Grid item container xs={9} spacing={1}>
                    <Grid item xs={6}>
                        <InputGrid
                            key={1}
                            nameTitle={`H??? t??n`}
                            name={"HoTen"}
                            defaultValue={""}
                            control={control}
                            errors={errors}
                            rules={{ required: "Vui l??ng nh???p tr?????ng n??y!" }}
                        />
                        <InputGrid
                            nameTitle={`M?? ?????ng vi??n`}
                            name={"MaSoDangVien"}
                            defaultValue={""}
                            control={control}
                            errors={errors}
                            disabled={edit}
                        />
                        <InputGrid
                            type="date"
                            nameTitle={`Ng??y sinh`}
                            defaultValue={""}
                            name={"NgaySinh"}
                            control={control}
                            errors={errors}
                        />
                        <InputGrid
                            nameTitle={`N??i sinh`}
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
                            nameTitle={`S??? th???`}
                            defaultValue={""}
                            name={"SoThe"}
                            rules={{
                                pattern: {
                                    value: /^\d+$/,
                                    message: "S??? th??? kh??ng h???p l???!"
                                },
                                validate: value =>
                                    ("" + value).length <= 8 || "S??? th??? kh??ng h???p l???"
                            }}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            select
                            onChange={handleChangeSelect}
                            nameTitle={"Chi b???"}
                            name={`MaChiBo`}
                            defaultValue={isDePer ? "0" : info.info.MaChiBo}
                            disabled={!isDePer}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                            }}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value="0">Ch???n chi b???</MenuItem>
                            {category.categories.partycell.length > 0 &&
                                category.categories.partycell.map(el =>
                                    <MenuItem key={el.MaChiBo} value={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                                )
                            }
                        </InputGrid>
                        <InputGrid
                            select
                            onChange={handleChangePosition}
                            nameTitle={"Ch???c v???"}
                            name={`MaChucVu`}
                            defaultValue={"0"}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                            }}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value="0">Ch???n ch???c v???</MenuItem>
                            {category.categories.position.length > 0 &&
                                positionArr.map(el =>
                                    <MenuItem key={el.MaChucVu} value={el.MaChucVu}>{el.TenChucVu}</MenuItem>
                                )
                            }
                        </InputGrid>
                        <InputGrid
                            select
                            onChange={handleChangeSelect}
                            nameTitle={"Gi???i t??nh"}
                            name={`GioiTinh`}
                            defaultValue={"0"}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                            }}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value="0">Ch???n gi???i t??nh</MenuItem>
                            <MenuItem value="m">Nam</MenuItem>
                            <MenuItem value="f">N???</MenuItem>
                            <MenuItem value="u">Kh??c</MenuItem>
                        </InputGrid>
                        <InputGrid
                            select
                            onChange={handleChangeSelect}
                            nameTitle={"D??n t???c"}
                            name={`MaDanToc`}
                            rules={{
                                validate: value =>
                                    value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                            }}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                        >
                            <MenuItem value={"0"}>Ch???n d??n t???c</MenuItem>
                            {category.categories.ethnic.length > 0 &&
                                category.categories.ethnic.map(el =>
                                    <MenuItem key={el.MaDanToc} value={el.MaDanToc}>{el.TenDanToc}</MenuItem>
                                )
                            }
                        </InputGrid>
                        <InputGrid
                            select
                            onChange={handleChangeSelect}
                            nameTitle={"T??n gi??o"}
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
                        <InputGrid
                            nameTitle={`Qu???c t???ch`}
                            defaultValue={"Vi???t Nam"}
                            name={"QuocTich"}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.imageWrapper} >
                        <>
                            {imageUpload?.preview ?
                                <>
                                    <img className={classes.fileUpload} style={{ height: '100%' }}
                                        src={imageUpload.preview}
                                        alt=""
                                    />
                                    <IconButton className={classes.closeBtn} size="small" onClick={handleRemove}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                                :
                                <>
                                    <input type="file" multiple className={classes.fileUpload} onChange={handleUpload} />
                                    {/* <FormHelperText error style={{ position: "absolute" }}>Vui l??ng ch???n ???nh!</FormHelperText> */}
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
                            defaultValue={""}
                            control={control}
                            errors={errors}
                            rules={{
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "S??? ??i???n tho???i kh??ng h???p l???!"
                                }
                            }}
                        />
                        <Grid item xs={12}>
                            <Typography>S??? ??i???n tho???i</Typography>
                        </Grid>
                        <InputGrid
                            noTitle
                            name={"SoDienThoai"}
                            defaultValue={""}
                            control={control}
                            errors={errors}
                            rules={{
                                pattern: {
                                    value: /^\d+$/,
                                    message: "S??? ??i???n tho???i kh??ng h???p l???!"
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid container item xs={9}>
                    <Grid item style={{ width: '150px' }}>
                        <Typography>Qu?? qu??n</Typography>
                    </Grid>
                    <Grid item container flex={1} spacing={1}>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"T???nh"}
                                name={"QQTinh"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeProvince(e, "qq")}
                            >
                                <MenuItem value="0">T???nh</MenuItem>
                                {qqArr.provinceArr.map(pro =>
                                    <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Huy???n"}
                                name={"QQHuyen"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeDistrict(e, "qq")}

                            >
                                <MenuItem value="0">Huy???n</MenuItem>
                                {qqArr.districtArr.map(dis =>
                                    <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"X??"}
                                name={"QQXa"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeWard(e, "qq")}
                            >
                                <MenuItem value="0">X??</MenuItem>
                                {qqArr.wardArr.map(w =>
                                    <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={12}>
                            <InputGrid
                                onChange={handleChangeInput}
                                placeholder={"S??? nh??, ???????ng..."}
                                noTitle
                                name={"QQChiTiet"}
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            // rules={{ required: "Vui l??ng nh???p tr?????ng n??y!" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={9}>
                    <Grid item style={{ width: '150px' }}>
                        <Typography>?????a ch??? th?????ng tr??</Typography>
                    </Grid>
                    <Grid item container flex={1} spacing={1}>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"T???nh"}
                                name={"DCTTTinh"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeProvince(e, "dctt")}
                            >
                                <MenuItem value="0">T???nh</MenuItem>
                                {dcttArr.provinceArr.map(pro =>
                                    <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Huy???n"}
                                name={"DCTTHuyen"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeDistrict(e, "dctt")}

                            >
                                <MenuItem value="0">Huy???n</MenuItem>
                                {dcttArr.districtArr.map(dis =>
                                    <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"X??"}
                                name={"DCTTXa"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeWard(e, "dctt")}
                            >
                                <MenuItem value="0">X??</MenuItem>
                                {dcttArr.wardArr.map(w =>
                                    <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={12}>
                            <InputGrid
                                onChange={handleChangeInput}
                                placeholder={"S??? nh??, ???????ng..."}
                                noTitle
                                name={"DCTTChiTiet"}
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            // rules={{ required: "Vui l??ng nh???p tr?????ng n??y!" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={9}>
                    <Grid item style={{ width: '150px' }}>
                        <Typography>N??i ??? hi???n t???i</Typography>
                    </Grid>
                    <Grid item container flex={1} spacing={1}>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"T???nh"}
                                name={"NOHTTinh"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeProvince(e, "noht")}
                            >
                                <MenuItem value="0">T???nh</MenuItem>
                                {nohtArr.provinceArr.map(pro =>
                                    <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"Huy???n"}
                                name={"NOHTHuyen"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeDistrict(e, "noht")}

                            >
                                <MenuItem value="0">Huy???n</MenuItem>
                                {nohtArr.districtArr.map(dis =>
                                    <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={4}>
                            <MySelectReactHookForm
                                nameTitle={"X??"}
                                name={"NOHTXa"}
                                defaultValue={"0"}
                                control={control}
                                errors={errors}
                                rules={{
                                    validate: value =>
                                        value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                }}
                                onChange={e => handleChangeWard(e, "noht")}
                            >
                                <MenuItem value="0">X??</MenuItem>
                                {nohtArr.wardArr.map(w =>
                                    <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                                )}
                            </MySelectReactHookForm>
                        </Grid>
                        <Grid item xs={12}>
                            <InputGrid
                                onChange={handleChangeInput}
                                placeholder={"S??? nh??, ???????ng..."}
                                noTitle
                                name={"NOHTChiTiet"}
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            // rules={{ required: "Vui l??ng nh???p tr?????ng n??y!" }}
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
                                            label="H??? T??n"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="Nguy???n V??n A"
                                        />
                                        {errors?.name?.type === "required" &&
                                            <FormHelperText error>Vui l??ng nh???p tr?????ng n??y!</FormHelperText>
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
                                            label="Ng??y sinh"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />
                                        {errors?.birth?.type === "required" &&
                                            <FormHelperText error>Vui l??ng nh???p tr?????ng n??y!</FormHelperText>
                                        }
                                    </Grid>

                                    <Grid className={classes.input} item xs={12}>
                                        <TextField
                                            {...register("address", {
                                                required: true,
                                                pattern: /^[A-Za-z]+$/i,
                                            })}
                                            fullWidth
                                            label="?????a ch??? c??? th???"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="S??? nh??..., ???????ng..., qu???n..."

                                        />
                                        {errors?.address?.type === "required" &&
                                            <FormHelperText error>Vui l??ng nh???p tr?????ng n??y!</FormHelperText>
                                        }
                                    </Grid>
                                    <Grid className={classes.input} item xs={6}>
                                        <TextField
                                            {...register("phone", {
                                                required: true,
                                                pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                            })}
                                            fullWidth
                                            label="S??? ??i???n tho???i"
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="0123456789"

                                        />
                                        {errors?.phone?.type === "required" &&
                                            <FormHelperText error>Vui l??ng nh???p s??? ??i???n tho???i!</FormHelperText>
                                        }
                                        {errors?.phone?.type === "pattern" &&
                                            <FormHelperText error>S??? ??i???n tho???i kh??ng h???p l???!</FormHelperText>
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
                                            <FormHelperText error>Vui l??ng nh???p email!</FormHelperText>
                                        }
                                        {errors?.email?.type === "pattern" &&
                                            <FormHelperText error>Email kh??ng h???p l???!</FormHelperText>
                                        }
                                    </Grid>
                                </Grid>*/