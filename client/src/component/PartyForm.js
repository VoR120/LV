import { Divider, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useRef, useState } from 'react';
import MySelect from './UI/MySelect';
import InputGrid from './InputGrid';
import { getDate } from '../utils/utils';
import { CategoryContext } from '../contextAPI/CategoryContext';

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
    },
    divider: {
        marginTop: '20px'
    }
}))

const PartyForm = (props) => {
    const classes = useStyles();
    const { disable, control, errors, setValue, watch, clearErrors } = props
    const [imageUpload, setImageUpload] = useState('');
    const [loading, setLoading] = useState(false);
    const [addType, setAddType] = useState(0);

    const { category, categoryDispatch } = useContext(CategoryContext);

    const hanleChangeType = (e) => {
        setValue(e.target.name, e.target.value)
        setAddType(e.target.value)
    }

    const handleChangeSelect = (e) => {
        if (e.target.value != "0") {
            clearErrors(e.target.name)
        }
        setValue(e.target.name, e.target.value)
    }

    const NgayVaoDang = useRef({});
    NgayVaoDang.current = watch("NgayVaoDang", "");

    return (
        <FormControl margin="dense" fullWidth>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <MySelect
                        nameTitle={"Hình thức thêm"}
                        name={"HinhThucThem"}
                        value={addType}
                        onChange={hanleChangeType}
                    >
                        <MenuItem value="0">Không</MenuItem>
                        <MenuItem value="1">Kết nạp mới</MenuItem>
                        <MenuItem value="3">Chuyển sinh hoạt tạm thời</MenuItem>
                        <MenuItem value="4">Chuyển sinh hoạt chính thức</MenuItem>
                    </MySelect>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
            {
                (addType == "3" || addType == "4") && (
                    <>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <InputGrid
                                    nameTitle={`Chuyển từ Đảng bộ`}
                                    name={"ChuyenTuDangBo"}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    nameTitle={`Chuyển từ Chi bộ`}
                                    name={"ChuyenTuChiBo"}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    nameTitle={`Chuyển đến Đảng bộ`}
                                    name={"ChuyenDenDangBo"}
                                    defaultValue="DHCT"
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    select
                                    onChange={handleChangeSelect}
                                    nameTitle={"Chuyển đến chi bộ"}
                                    name={`ChuyenDenChiBo`}
                                    defaultValue={'0'}
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
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    type="date"
                                    nameTitle={`Ngày chuyển`}
                                    name={"NgayChuyenDen"}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputGrid
                                    nameTitle={`Ghi chú`}
                                    name={"GhiChu"}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                    </>
                )
            }
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <InputGrid
                        type="date"
                        nameTitle={`Ngày vào Đoàn TNCSHCM`}
                        name={"NgayVaoDoan"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`Nơi vào Đoàn TNCSHCM`}
                        name={"NoiVaoDoan"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        type="date"
                        nameTitle={`Ngày vào Đảng lần đầu`}
                        name={"NgayVaoDang"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`Nơi vào Đảng lần đầu`}
                        name={"NoiVaoDangLanDau"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        type="date"
                        nameTitle={`Ngày vào Đảng chính thức`}
                        name={"NgayChinhThuc"}
                        control={control}
                        errors={errors}
                        rules={{
                            validate: value => {
                                const isTrue = new Date(value).getMonth() == new Date(NgayVaoDang.current).getMonth()
                                    && new Date(value).getDate() == new Date(NgayVaoDang.current).getDate()
                                    && (new Date(value).getFullYear() - 1) == new Date(NgayVaoDang.current).getFullYear()
                                return isTrue || "Ngày chính thức không hợp lệ!"
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`Nơi vào Đảng chính thức`}
                        name={"NoiVaoDangChinhThuc"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`Người giới thiệu`}
                        name={"NguoiGioiThieu"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default PartyForm;