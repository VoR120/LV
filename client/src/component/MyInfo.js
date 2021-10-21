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

    const { disable, control, errors, setValue } = props
    const [provinceArr, setProvinceArr] = useState([]);
    const [districtArr, setDistrictArr] = useState([]);
    const [wardArr, setWardArr] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const classes = useStyles();

    useEffect(() => {
        getAllCategory(categoryDispatch, "ethnic");
        getAllCategory(categoryDispatch, "religion");
        const fetchApi = async () => {
            const res = await axios.get('https://provinces.open-api.vn/api/')
            setProvinceArr(res.data);
        }
        fetchApi();
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`https://provinces.open-api.vn/api/p/${province}/?depth=2`)
            setDistrictArr(res.data.districts);
        }
        if (province != '') {
            // setValue("QQTinh", province)
            // setValue("QQHuyen", "0");
            // setValue("QQXa", "0");
            fetchApi();
        }
    }, [province])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`https://provinces.open-api.vn/api/d/${district}/?depth=2`)
            setWardArr(res.data.wards);
        }
        if (district != '') {
            // setValue("Huyen", district)
            // setValue("Xa", "0")
            fetchApi();
        }
    }, [district])

    // useEffect(() => {
    //     if (ward != '')
    //         setValue("Xa", ward);
    // }, [ward])

    return (
        <Grid container className={classes.input} spacing={1}>
            <Grid item xs={6}>
                <InputGrid
                    select
                    nameTitle={"Dân tộc"}
                    name={"MaDanToc"}
                    defaultValue={"0001"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                    onChange={e => setValue("MaDanToc", e.target.value)}
                >
                    {category.categories.ethnic.map(eth =>
                        <MenuItem key={eth.MaDanToc} value={eth.MaDanToc}>{eth.TenDanToc}</MenuItem>
                    )}
                </InputGrid>
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    select
                    nameTitle={"Tôn giáo"}
                    name={"MaTonGiao"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                    defaultValue={"0"}
                    onChange={e => setValue("MaTonGiao", e.target.value)}
                >
                    <MenuItem value={"0"}>Không</MenuItem>
                    {category.categories.religion.map(rel =>
                        <MenuItem key={rel.MaTonGiao} value={rel.MaTonGiao}>{rel.TenTonGiao}</MenuItem>
                    )}
                </InputGrid>
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    type="date"
                    value="2012-12-12"
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
            <Grid item xs={12} container>
                <Grid item xs={4}></Grid>
            </Grid>
            {/* <Grid item xs={12} container className={classes.inputItem} alignItems="center">
                <Grid item style={{ width: '150px' }}>
                    <Typography>Quê quán</Typography>
                </Grid>
                <Grid item flex={1} container spacing={1}>
                    <Grid item xs={4}>
                        <MySelectReactHookForm
                            nameTitle={"Tỉnh"}
                            name={"QQTinh"}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={e => setProvince(e.target.value)}
                        >
                            <MenuItem value="0">Tỉnh</MenuItem>
                            {provinceArr.map(pro =>
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
                            onChange={e => setDistrict(e.target.value)}

                        >
                            <MenuItem value="0">Huyện</MenuItem>
                            {districtArr.map(dis =>
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
                            onChange={e => setWard(e.target.value)}
                        >
                            <MenuItem value="0">Xã</MenuItem>
                            {wardArr.map(w =>
                                <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                            )}
                        </MySelectReactHookForm>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} container className={classes.inputItem}>
                <Grid item style={{ width: '150px' }}>
                    <Typography>Địa chỉ thường trú</Typography>
                </Grid>
                <Grid item flex={1} container spacing={1}>
                    <Grid item xs={4}>
                        <MySelectReactHookForm
                            nameTitle={"Tỉnh"}
                            name={"TTTinh"}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={e => setProvince(e.target.value)}
                        >
                            <MenuItem value="0">Tỉnh</MenuItem>
                            {provinceArr.map(pro =>
                                <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                            )}
                        </MySelectReactHookForm>
                    </Grid>
                    <Grid item xs={4}>
                        <MySelectReactHookForm
                            nameTitle={"Huyện"}
                            name={"TTHuyen"}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={e => setDistrict(e.target.value)}

                        >
                            <MenuItem value="0">Huyện</MenuItem>
                            {districtArr.map(dis =>
                                <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                            )}
                        </MySelectReactHookForm>
                    </Grid>
                    <Grid item xs={4}>
                        <MySelectReactHookForm
                            nameTitle={"Xã"}
                            name={"TTXa"}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={e => setWard(e.target.value)}
                        >
                            <MenuItem value="0">Xã</MenuItem>
                            {wardArr.map(w =>
                                <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                            )}
                        </MySelectReactHookForm>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name={"TTDiaChiCuThe"}
                            render={({ field }) => (
                                <TextField
                                placeholder={"Số nhà, đường"}
                                    {...field}
                                    className={classes.inputItem}
                                    disabled={disable}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={!!errors["DiaChiCuThe"]}
                                    helperText={errors["DiaChiCuThe"]?.message}
                                />)
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} container className={classes.inputItem}>
                <Grid item style={{ width: '150px' }}>
                    <Typography>Nơi ở hiện tại</Typography>
                </Grid>
                <Grid item flex={1} container spacing={1}>
                    <Grid item xs={4}>
                        <MySelectReactHookForm
                            nameTitle={"Tỉnh"}
                            name={"HTTinh"}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={e => setProvince(e.target.value)}
                        >
                            <MenuItem value="0">Tỉnh</MenuItem>
                            {provinceArr.map(pro =>
                                <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                            )}
                        </MySelectReactHookForm>
                    </Grid>
                    <Grid item xs={4}>
                        <MySelectReactHookForm
                            nameTitle={"Huyện"}
                            name={"HTHuyen"}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={e => setDistrict(e.target.value)}

                        >
                            <MenuItem value="0">Huyện</MenuItem>
                            {districtArr.map(dis =>
                                <MenuItem value={dis.code} key={dis.code}>{dis.name}</MenuItem>
                            )}
                        </MySelectReactHookForm>
                    </Grid>
                    <Grid item xs={4}>
                        <MySelectReactHookForm
                            nameTitle={"Xã"}
                            name={"HTXa"}
                            defaultValue={"0"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                            onChange={e => setWard(e.target.value)}
                        >
                            <MenuItem value="0">Xã</MenuItem>
                            {wardArr.map(w =>
                                <MenuItem value={w.code} key={w.code}>{w.name}</MenuItem>
                            )}
                        </MySelectReactHookForm>
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name={"HTDiaChiCuThe"}
                            render={({ field }) => (
                                <TextField
                                placeholder={"Số nhà, đường"}
                                    {...field}
                                    className={classes.inputItem}
                                    disabled={disable}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    error={!!errors["DiaChiCuThe"]}
                                    helperText={errors["DiaChiCuThe"]?.message}
                                />)
                            }
                        />
                    </Grid>
                </Grid>
            </Grid> */}
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
        </Grid>
    );
};

export default MyInfo;