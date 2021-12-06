import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { getAllCategory } from '../action/categoryAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import axios from '../helper/axios';
import InputGrid from './InputGrid';
import MySelectReactHookForm from './UI/MySelectReactHookForm';

const useStyles = makeStyles(theme => ({
    inputItem: {
        marginTop: theme.spacing(2),
    },
    input: {
        '& .Mui-disabled': {
            backgroundColor: '#f7f8f8',
            '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.9)'
        }
    }
}))

const MyInfo = (props) => {
    const { category, categoryDispatch } = useContext(CategoryContext);

    const { disable, control, errors, setValue, loading, setError, clearErrors, getValues,
        qqArr, setQqArr,
        dcttArr, setDcttArr,
        nohtArr, setNohtArr,
        qqValue, setQqValue,
        dcttValue, setDcttValue,
        nohtValue, setNohtValue, } = props

    const classes = useStyles();

    const handleChangeInput = (e) => {
        setValue(e.target.name, e.target.value)
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

    return (
        <>
            {loading ||
                <Grid container className={classes.input} spacing={1}>
                    <Grid item xs={6}>
                        <InputGrid
                            select
                            nameTitle={"Dân tộc"}
                            name={"MaDanToc"}
                            defaultValue=""
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={handleChangeInput}
                        >
                            {category.categories.ethnic.length > 0 &&
                                category.categories.ethnic.map(eth =>
                                    <MenuItem key={eth.MaDanToc} value={eth.MaDanToc}>{eth.TenDanToc}</MenuItem>
                                )
                            }
                        </InputGrid>
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            select
                            nameTitle={"Tôn giáo"}
                            name={"MaTonGiao"}
                            defaultValue=""
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={handleChangeInput}
                        >
                            {category.categories.religion.length > 0 &&
                                category.categories.religion.map(rel =>
                                    <MenuItem key={rel.MaTonGiao} value={rel.MaTonGiao}>{rel.TenTonGiao}</MenuItem>
                                )
                            }
                        </InputGrid>
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            type="date"
                            nameTitle={`Ngày sinh`}
                            name={"NgaySinh"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            nameTitle={`Quốc tịch`}
                            name={"QuocTich"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            nameTitle={`Số điện thoại`}
                            name={"SoDienThoai"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            nameTitle={`Email`}
                            name={"Email"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        />
                    </Grid>
                    <Grid container item xs={12} className={classes.inputItem}>
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
                                    disabled={disable}
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
                                    disabled={disable}
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
                                    disabled={disable}
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
                                    disabled={disable}
                                // rules={{ required: "Vui lòng nhập trường này!" }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} className={classes.inputItem}>
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
                                    disabled={disable}
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
                                    disabled={disable}
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
                                    disabled={disable}
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
                                    disabled={disable}
                                // rules={{ required: "Vui lòng nhập trường này!" }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} className={classes.inputItem}>
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
                                    disabled={disable}
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
                                    disabled={disable}
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
                                    disabled={disable}
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
                                    disabled={disable}
                                    control={control}
                                    errors={errors}
                                // rules={{ required: "Vui lòng nhập trường này!" }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default MyInfo;