import { Divider, FormControl, Grid, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useRef, useState } from 'react';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import InputGrid from './InputGrid';
import MySelect from './UI/MySelect';

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
    const { disable, control, errors, setValue, watch, clearErrors, addType, setAddType } = props
    const [imageUpload, setImageUpload] = useState('');
    const [loading, setLoading] = useState(false);
    // const [addType, setAddType] = useState(0);

    const { category, categoryDispatch } = useContext(CategoryContext);
    const { info } = useContext(InfoContext);
    const isDePer = info.info.Quyen["12"] == 1;

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
                        nameTitle={"H??nh th???c th??m"}
                        name={"HinhThucThem"}
                        value={addType}
                        onChange={hanleChangeType}
                    >
                        <MenuItem value="0">Kh??ng</MenuItem>
                        <MenuItem value="1">K???t n???p m???i</MenuItem>
                        <MenuItem value="3">Chuy???n sinh ho???t t???m th???i</MenuItem>
                        <MenuItem value="4">Chuy???n sinh ho???t ch??nh th???c</MenuItem>
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
                                    nameTitle={`Chuy???n t??? ?????ng b???`}
                                    name={"ChuyenTuDangBo"}
                                    control={control}
                                    defaultValue={""}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    nameTitle={`Chuy???n t??? Chi b???`}
                                    name={"ChuyenTuChiBo"}
                                    defaultValue={""}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    nameTitle={`Chuy???n ?????n ?????ng b???`}
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
                                    nameTitle={"Chuy???n ?????n chi b???"}
                                    name={`ChuyenDenChiBo`}
                                    defaultValue={isDePer ? "0" : info.info.MaChiBo}
                                    disabled={!isDePer}
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
                            </Grid>
                            <Grid item xs={6}>
                                <InputGrid
                                    type="date"
                                    nameTitle={`Ng??y chuy???n`}
                                    name={"NgayChuyenDen"}
                                    defaultValue={""}
                                    control={control}
                                    errors={errors}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputGrid
                                    nameTitle={`Ghi ch??`}
                                    defaultValue={""}
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
                        nameTitle={`Ng??y v??o ??o??n TNCSHCM`}
                        defaultValue={""}
                        name={"NgayVaoDoan"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`N??i v??o ??o??n TNCSHCM`}
                        defaultValue={""}
                        name={"NoiVaoDoan"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        type="date"
                        nameTitle={`Ng??y v??o ?????ng l???n ?????u`}
                        defaultValue={""}
                        name={"NgayVaoDang"}
                        control={control}
                        errors={errors}
                        rules={{
                            required: "Vui l??ng nh???p tr?????ng n??y!",
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`N??i v??o ?????ng l???n ?????u`}
                        defaultValue={""}
                        name={"NoiVaoDangLanDau"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        type="date"
                        nameTitle={`Ng??y v??o ?????ng ch??nh th???c`}
                        defaultValue={""}
                        name={"NgayChinhThuc"}
                        control={control}
                        errors={errors}
                        rules={{
                            required: "Vui l??ng nh???p tr?????ng n??y!",
                            validate: value => {
                                const isTrue = new Date(value).getMonth() == new Date(NgayVaoDang.current).getMonth()
                                    && new Date(value).getDate() == new Date(NgayVaoDang.current).getDate()
                                    && (new Date(value).getFullYear() - 1) == new Date(NgayVaoDang.current).getFullYear()
                                return isTrue || "Ng??y ch??nh th???c kh??ng h???p l???!"
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`N??i v??o ?????ng ch??nh th???c`}
                        defaultValue={""}
                        name={"NoiVaoDangChinhThuc"}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`Ng?????i gi???i thi???u`}
                        name={"NguoiGioiThieu"}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    />
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default PartyForm;