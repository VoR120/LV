import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Divider, Grid, IconButton, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { getFlanguageLevel } from '../action/categoryAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import InputGrid from './InputGrid';

const useStyles = makeStyles(theme => ({
    btn: {
        marginTop: theme.spacing(2)
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

const MyLevel = (props) => {
    const classes = useStyles();
    const { disable, control, errors, setValue, loading, flArray, levelArray, setFlArray, setLevelArray } = props;
    const { category, categoryDispatch } = useContext(CategoryContext);

    const handleChangeFLSelect = (e, index) => {
        const { name, value } = e.target
        let arr = [...flArray]
        setValue(name, value);
        setValue(`MaTrinhDo${index}`, "0");
        arr[index].MaNgoaiNgu = value;
        arr[index].MaTrinhDo = "0";
        setFlArray(arr);
    }

    const handleChangeLevelSelect = (e, index) => {
        const { name, value } = e.target
        let arr = [...flArray]
        setValue(name, value);
        arr[index].MaTrinhDo = value;
        setFlArray(arr);
    }

    const handleRemoveInput = (id, index) => {
        if (flArray.length == 1) {
            alert("Bạn phải nhập ít nhất 1 trình độ ngoại ngữ")
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
        <>
            {loading ||
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <InputGrid
                            nameTitle={`Nghề nghiệp`}
                            name={"NgheNghiep"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            nameTitle={`Trình độ học vấn`}
                            name={"TrinhDoHocVan"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            select
                            nameTitle={"Trình độ tin học"}
                            name={"MaTinHoc"}
                            defaultValue={"0001"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        >
                            {category.categories.it.length > 0 &&
                                category.categories.it.map(it =>
                                    <MenuItem key={it.MaTinHoc} value={it.MaTinHoc}>{it.TenTinHoc}</MenuItem>
                                )}
                        </InputGrid>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            select
                            nameTitle={"Trình độ chính trị"}
                            name={"MaChinhTri"}
                            defaultValue={"0001"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        >
                            {category.categories.politics.length > 0 &&
                                category.categories.politics.map(pol =>
                                    <MenuItem key={pol.MaChinhTri} value={pol.MaChinhTri}>{pol.TenChinhTri}</MenuItem>
                                )}
                        </InputGrid>
                        <Divider className={classes.divider} />
                    </Grid>
                    <>
                        {disable &&
                            flArray.map((i, index) =>
                                <Fragment key={index}>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            select
                                            nameTitle={"Ngoại ngữ"}
                                            name={`MaNgoaiNgu${index}`}
                                            defaultValue={"0001"}
                                            control={control}
                                            errors={errors}
                                            disabled={disable}
                                        >
                                            {category.categories.flanguage.length > 0 &&
                                                category.categories.flanguage.map(fl =>
                                                    <MenuItem key={fl.MaNgoaiNgu} value={fl.MaNgoaiNgu}>{fl.TenNgoaiNgu}</MenuItem>
                                                )}
                                        </InputGrid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputGrid
                                            select
                                            nameTitle={"Trình độ ngoại ngữ"}
                                            name={`MaTrinhDo${index}`}
                                            defaultValue={""}
                                            control={control}
                                            errors={errors}
                                            disabled={disable}
                                        >
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
                                </Fragment>
                            )}
                        {
                            !disable &&
                            flArray.length > 0 &&
                            flArray.map((i, index) =>
                                <Grid key={i.MaNgoaiNgu} container alignItems="center">
                                    <Grid item xs={1}>
                                        <IconButton onClick={(e) => handleRemoveInput(i.MaNgoaiNgu, index)} size="small" className={classes.removeIcon}><RemoveIcon /></IconButton>
                                    </Grid>
                                    <Grid container item xs={11}>
                                        <Grid item xs={6}>
                                            <InputGrid
                                                select
                                                onChange={(e) => { handleChangeFLSelect(e, index) }}
                                                nameTitle={"Ngoại ngữ"}
                                                name={`MaNgoaiNgu${index}`}
                                                defaultValue={"0"}
                                                rules={{
                                                    validate: value =>
                                                        value != "0" || "Vui lòng nhập trường này!"
                                                }}
                                                control={control}
                                                errors={errors}
                                                disabled={disable}
                                            >
                                                <MenuItem value="0">Chọn ngoại ngữ</MenuItem>
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
                                                nameTitle={"Trình độ ngoại ngữ"}
                                                name={`MaTrinhDo${index}`}
                                                defaultValue={"0"}
                                                rules={{
                                                    validate: value =>
                                                        value != "0" || "Vui lòng nhập trường này!"
                                                }}
                                                control={control}
                                                errors={errors}
                                                disabled={disable}
                                            >
                                                <MenuItem value="0">Chọn trình độ</MenuItem>
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
                        {disable ||
                            <IconButton size="small" onClick={handleAddInput} className={classes.addIcon} > <AddIcon /></IconButton>
                        }
                    </>
                </Grid>
            }
        </>
    );
};

export default MyLevel;