import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Divider,
    FormControl,
    Grid,
    IconButton,
    MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import InputGrid from './InputGrid';

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
        marginTop: theme.spacing(3)
    },
    removeIcon: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.common.white
        }
    },
    addIcon: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
            color: theme.palette.common.white
        }
    }
}))

const LevelForm = (props) => {
    const classes = useStyles();
    const { control, errors, setValue, flArray, setFlArray, levelArray, setLevelArray, edit, clearErrors } = props
    const [loading, setLoading] = useState(false);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);

    const handleRemove = () => {

    }
    const handleUpload = () => {

    }
    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
        if (e.target.value != "0") {
            clearErrors(e.target.name)
        }
    }

    const handleChangeFLSelect = (e, index) => {
        const { name, value } = e.target
        let arr = [...flArray]
        setValue(name, value);
        setValue(`MaTrinhDo${index}`, "0");
        arr[index].MaNgoaiNgu = value;
        arr[index].MaTrinhDo = "0";
        setFlArray(arr);
        if (e.target.value != "0") {
            clearErrors(e.target.name)
            clearErrors(`MaTrinhDo${index}`)
        }
    }

    const handleChangeLevelSelect = (e, index) => {
        const { name, value } = e.target
        let arr = [...flArray]
        setValue(name, value);
        arr[index].MaTrinhDo = value;
        setFlArray(arr);
        if (e.target.value != "0") {
            clearErrors(e.target.name)
        }
    }

    const handleRemoveInput = (id, index) => {
        if (flArray.length == 1) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "B???n ph???i nh???p ??t nh???t 1 tr??nh ????? ngo???i ng???!",
                    type: "error"
                }
            })
            return;
        }
        let newData = [...flArray];
        newData.splice(index, 1);
        flArray.forEach((i, index) => {
            setValue(`MaNgoaiNgu${index}`, "0")
            setValue(`MaTrinhDo${index}`, "0")
        })
        setFlArray(newData);
    }

    const handleAddInput = () => {
        setFlArray([...flArray, { MaNgoaiNgu: "0", MaTrinhDo: "0" }])
    }

    return (
        <FormControl margin="dense" fullWidth>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`Ngh??? nghi???p`}
                        name={"NgheNghiep"}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        nameTitle={`Tr??nh ????? h???c v???n`}
                        name={"TrinhDoHocVan"}
                        defaultValue={""}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        select
                        onChange={handleChangeSelect}
                        defaultValue={"0"}
                        nameTitle={`Tr??nh ????? tin h???c`}
                        name={"MaTinHoc"}
                        control={control}
                        errors={errors}
                    >
                        <MenuItem value="0">Ch???n tr??nh ????? tin h???c </MenuItem>
                        {category.categories.it.length > 0 &&
                            category.categories.it.map(el =>
                                <MenuItem key={el.MaTinHoc} value={el.MaTinHoc}>{el.TenTinHoc}</MenuItem>
                            )
                        }
                    </InputGrid>
                    <Divider className={classes.divider} />
                </Grid>
                <Grid item xs={6}>
                    <InputGrid
                        select
                        onChange={handleChangeSelect}
                        defaultValue={"0"}
                        nameTitle={`Tr??nh ????? ch??nh tr???`}
                        name={"MaChinhTri"}
                        control={control}
                        errors={errors}
                    >
                        <MenuItem value="0">Ch???n tr??nh ????? ch??nh tr??? </MenuItem>
                        {category.categories.politics.length > 0 &&
                            category.categories.politics.map(el =>
                                <MenuItem key={el.MaChinhTri} value={el.MaChinhTri}>{el.TenChinhTri}</MenuItem>
                            )
                        }
                    </InputGrid>
                    <Divider className={classes.divider} />
                </Grid>
                <>
                    {
                        flArray.length > 0 &&
                        flArray.map((i, index) =>
                            <Grid key={index} item container>
                                <Grid item xs={1}>
                                    <IconButton onClick={(e) => handleRemoveInput(i.MaNgoaiNgu, index)} size="small" className={classes.removeIcon}><RemoveIcon /></IconButton>
                                </Grid>
                                <Grid container item xs={11} spacing={1}>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            select
                                            onChange={(e) => { handleChangeFLSelect(e, index) }}
                                            nameTitle={"Ngo???i ng???"}
                                            name={`MaNgoaiNgu${index}`}
                                            defaultValue={"0"}
                                            rules={{
                                                validate: value => {
                                                    if (value == "0") return "Vui l??ng nh???p tr?????ng n??y!";
                                                }
                                            }}
                                            control={control}
                                            errors={errors}
                                        >
                                            <MenuItem value="0">Ch???n ngo???i ng???</MenuItem>
                                            {category.categories.flanguage.length > 0 &&
                                                category.categories.flanguage.map(fl =>
                                                    <MenuItem key={fl.MaNgoaiNgu} value={fl.MaNgoaiNgu}>{fl.TenNgoaiNgu}</MenuItem>
                                                )}
                                        </InputGrid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            select
                                            onChange={(e) => { handleChangeLevelSelect(e, index) }}
                                            nameTitle={"Tr??nh ????? ngo???i ng???"}
                                            name={`MaTrinhDo${index}`}
                                            defaultValue={"0"}
                                            rules={{
                                                validate: value =>
                                                    value != "0" || "Vui l??ng nh???p tr?????ng n??y!"
                                            }}
                                            control={control}
                                            errors={errors}
                                        >
                                            <MenuItem value="0">Ch???n tr??nh ?????</MenuItem>
                                            {
                                                levelArray.length > 0 &&
                                                levelArray.map((arr, i) => {
                                                    if (i == index)
                                                        return arr.map(fl =>
                                                            <MenuItem key={fl.MaTrinhDo} value={fl.MaTrinhDo}>{fl.TenTrinhDo}</MenuItem>
                                                        )
                                                })
                                            }
                                        </InputGrid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )

                    }
                    <Grid item>
                        <IconButton size="small" onClick={handleAddInput} className={classes.addIcon} > <AddIcon /></IconButton>
                    </Grid>
                </>
            </Grid>
        </FormControl>
    );
};

export default LevelForm;