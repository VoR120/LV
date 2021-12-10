import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import InputGrid from './InputGrid';

const useStyles = makeStyles(theme => ({
}))

const MyParty = (props) => {
    const classes = useStyles()
    const { disable, control, errors, setValue } = props

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <InputGrid
                    type="date"
                    nameTitle={`Ngày vào Đoàn`}
                    name={"NgayVaoDoan"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                />
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    nameTitle={`Nơi vào Đoàn`}
                    name={"NoiVaoDoan"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                />
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    type="date"
                    nameTitle={`Ngày vào Đảng lần đầu`}
                    name={"NgayVaoDang"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                />
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    nameTitle={`Nơi vào Đảng lần đầu`}
                    name={"NoiVaoDangLanDau"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                />
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    type="date"
                    nameTitle={`Ngày vào Đảng chính thức`}
                    name={"NgayChinhThuc"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                />
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    nameTitle={`Nơi vào Đảng chính thức`}
                    name={"NoiVaoDangChinhThuc"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                />
            </Grid>
            <Grid item xs={6}>
                <InputGrid
                    nameTitle={`Người giới thiệu`}
                    name={"NguoiGioiThieu"}
                    control={control}
                    errors={errors}
                    disabled={disable}
                />
            </Grid>
        </Grid>
    );
};

export default MyParty;