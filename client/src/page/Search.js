import { Grid, MenuItem, Paper, TextField, Typography, Button, TableContainer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import ActionMenu from '../component/ActionMenu';
import Layout from '../component/Layout';
import MySelect from '../component/UI/MySelect';
import MyButton from '../component/UI/MyButton';
import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import xlsx from 'xlsx'
import { allInfoColumn, downloadExcel } from '../utils/utils';
import InputGrid from '../component/InputGrid';
import { useForm } from 'react-hook-form';
import { filterPartyMember } from '../action/partyMemberAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import axios from '../helper/axios';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: (props) => ({
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px'
    }),
    deleteBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
    }
}))

const Search = () => {

    const [rows, setRows] = useState([])
    const [columns] = useState(allInfoColumn)
    const classes = useStyles({ rows: rows });
    const [gender, setGender] = useState('2');
    const [loadingTable, setLoadingTable] = useState(false);
    const [provinceArr, setProvinceArr] = useState([]);

    const { category, categoryDispatch } = useContext(CategoryContext);

    const {
        handleSubmit,
        control,
        setValue,
        clearErrors,
        getValues,
        formState: { errors }
    } = useForm();

    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }

    const onSubmit = async (data) => {
        setLoadingTable(true)
        const res = await filterPartyMember(data)
        setRows(res);
        setLoadingTable(false)
    }

    useEffect(() => {
        const fetchAPISetArr = async () => {
            const res = await axios.get('https://provinces.open-api.vn/api/')
            setProvinceArr(res.data);
        }
        fetchAPISetArr();
    }, [])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Tìm kiếm
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Chi bộ"}
                                name="partycell"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">Tất cả</MenuItem>
                                {
                                    category.categories["partycell"].map(el =>
                                        <MenuItem key={el.MaChiBo} value={el.MaChiBo} >{el.TenChiBo}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Trạng thái"}
                                name="status"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">Tất cả</MenuItem>
                                <MenuItem value="1">Đang sinh hoạt</MenuItem>
                                <MenuItem value="2">Đã chuyển sinh hoạt</MenuItem>
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                nameTitle={"Họ tên"}
                                name="name"
                                defaultValue={""}
                                control={control}
                                errors={errors}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Dân tộc"}
                                name="ethnic"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">Tất cả</MenuItem>
                                {
                                    category.categories["ethnic"].map(el =>
                                        <MenuItem key={el.MaDanToc} value={el.MaDanToc} >{el.TenDanToc}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Tôn giáo"}
                                name="religion"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">Tất cả</MenuItem>
                                {
                                    category.categories["religion"].map(el =>
                                        <MenuItem key={el.MaTonGiao} value={el.MaTonGiao} >{el.TenTonGiao}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Giới tính"}
                                name="gender"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">Tất cả</MenuItem>
                                <MenuItem value="m">Nam</MenuItem>
                                <MenuItem value="f">Nữ</MenuItem>
                                <MenuItem value="u">Khác</MenuItem>
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Quê quán"}
                                name="province"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">Tất cả</MenuItem>
                                {
                                    provinceArr.length > 0 &&
                                    provinceArr.map((pro =>
                                        <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                    ))
                                }
                            </InputGrid>
                        </Grid>
                    </Grid>
                </Paper>
                <MyButton primary onClick={handleSubmit(onSubmit)} >Xem</MyButton>
                <TableContainer style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={"Tìm kiếm"}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense'
                        }}
                        actions={[
                            {
                                icon: () => <DownloadIcon />,
                                tooltip: "Export to excel",
                                onClick: () => downloadExcel(),
                                isFreeAction: true
                            }
                        ]}
                        isLoading={loadingTable}
                    />
                </TableContainer>
                {/* <Loading loading={loading} /> */}
            </Layout>
        </>
    );
};

export default Search;