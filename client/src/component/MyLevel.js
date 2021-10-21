import { Grid, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import InputGrid from './InputGrid';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { getAllCategory } from '../action/categoryAction';
import { InfoContext } from '../contextAPI/InfoContext';

const useStyles = makeStyles(theme => ({
}))

const MyLevel = (props) => {
    const classes = useStyles();
    const { disable, control, errors, setValue } = props
    const [levelArray, setLevelArray] = useState([]);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { info } = useContext(InfoContext);

    useEffect(() => {
        getAllCategory(categoryDispatch, "flanguage");
        getAllCategory(categoryDispatch, "it");
        getAllCategory(categoryDispatch, "politics");
    }, [])

    useEffect(() => {
        if (info.info) {
            // Set Level Array
        }
    }, [info])

    return (
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
                    name={"TDHocVan"}
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
                    {category.categories.it.map(it =>
                        <MenuItem key={it.MaTinHoc} value={it.MaTinHoc}>{it.TenTinHoc}</MenuItem>
                    )}
                </InputGrid>
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
                    {category.categories.politics.map(pol =>
                        <MenuItem key={pol.MaChinhTri} value={pol.MaChinhTri}>{pol.TenChinhTri}</MenuItem>
                    )}
                </InputGrid>
            </Grid>
            {info.info.NgoaiNgu.map((i, index) =>
                <>
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
                            {category.categories.flanguage.map(fl =>
                                <MenuItem key={fl.MaNgoaiNgu} value={fl.MaNgoaiNgu}>{fl.TenNgoaiNgu}</MenuItem>
                            )}
                        </InputGrid>
                    </Grid>
                    <Grid item xs={6}>
                        <InputGrid
                            select
                            nameTitle={"Trình độ ngoại ngữ"}
                            name={`MaTrinhDo${index}`}
                            defaultValue={"0001"}
                            control={control}
                            errors={errors}
                            disabled={disable}
                        >
                            <MenuItem value="0001">...</MenuItem>
                            {/* {levelArray.length > 0 &&
                                levelArray[index].map(fl =>
                                    <MenuItem key={fl.MaTrinhDo} value={fl.MaTrinhDo}>{fl.TenTrinhDo}</MenuItem>
                                )} */}
                        </InputGrid>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default MyLevel;