import MaterialTable from '@material-table/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button, Grid, MenuItem, Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useForm } from 'react-hook-form';
import { getAllCategory, getAllCategoryPM } from '../action/categoryAction';
import { filterPartyMember, mailing, removePartyMember } from '../action/partyMemberAction';
import InputGrid from '../component/InputGrid';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import axios from '../helper/axios';
import { partyMemberPDF } from '../utils/pdf';
import { allInfoColumn, fileColumn, getExportData, pdfmakedownload } from '../utils/utils';
import RedoIcon from '@mui/icons-material/Redo';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoveForm from '../component/MoveForm';
import RewardDisciplineForm from '../component/RewardDisciplineForm';
import DeleteForm from '../component/DeleteForm';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { LoadingContext } from '../contextAPI/LoadingContext';

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

    const classes = useStyles({ rows: rows });
    const [gender, setGender] = useState('2');
    const [loadingTable, setLoadingTable] = useState(false);
    const [provinceArr, setProvinceArr] = useState([]);

    const { partyMember, partyMemberDispatch } = useContext(PartyMemberContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const { loadingDispatch } = useContext(LoadingContext);
    const { info } = useContext(InfoContext);
    const [dataSelect, setDataSelect] = useState([]);
    const [moveForm, setMoveForm] = useState(false);
    const [rewardForm, setRewardForm] = useState(false);
    const [disciplineForm, setDisciplineForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);

    const {
        handleSubmit,
        control,
        setValue,
        clearErrors,
        getValues,
        reset,
        formState: { errors }
    } = useForm();

    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }

    const onSubmit = async (data) => {
        if (info.info.Quyen["12"] != 1)
            data.partycell = info.info.MaChiBo
        setLoadingTable(true)
        const res = await filterPartyMember(data)
        setRows(res);
        setLoadingTable(false)
    }

    const handleReset = () => {
        setValue("partycell", "0")
        setValue("status", "0")
        setValue("name", "")
        setValue("ethnic", "0")
        setValue("religion", "0")
        setValue("gender", "0")
        setValue("province", "0")
    }

    const handleMailing = (e, email) => {
        const fetchMail = async () => {
            loadingDispatch({ type: 'OPEN_LOADING' })
            let mailList = typeof email == "string" ? new Array(email) : email;
            const res = await mailing(mailList)
            if (res.error) {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: res.error.message,
                        type: "error"
                    }
                })
            } else {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: res.msg,
                        type: "success"
                    }
                })
                setRows(rows.map(el => mailList.includes(el.Email) ? { ...el, DaXacNhan: 1 } : el))
            }
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
        fetchMail();
    }

    const handleRemove = async (e, id) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        const idArr = typeof id == "object" ? id : new Array(id)
        const res = await removePartyMember({ id: idArr })
        if (res.error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "???? x???y ra l???i!",
                    type: "error"
                }
            })
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "???? c???p nh???t!",
                    type: "success"
                }
            })
            setRows(rows.filter(el => !idArr.includes(el.MaSoDangVien)))
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

    const handleExportPDF = () => {
        const dd = partyMemberPDF(rows);
        pdfmakedownload(dd);
    }

    const [columns, setColumns] = useState(fileColumn(rows, setRows, handleMailing, handleRemove, fetch))

    const data = getExportData(rows, columns)

    useEffect(() => {
        setColumns(fileColumn(rows, setRows, handleMailing, handleRemove, fetch));
    }, [rows])

    useEffect(() => {
        getAllCategoryPM(categoryDispatch);
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
                        T??m ki???m
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container spacing={2}>
                        {
                            info.info.Quyen["12"] == 1 &&
                            <Grid item xs={4}>
                                <InputGrid
                                    select
                                    onChange={handleChangeSelect}
                                    nameTitle={"Chi b???"}
                                    name="partycell"
                                    defaultValue="0"
                                    control={control}
                                    errors={errors}
                                >
                                    <MenuItem value="0">T???t c???</MenuItem>
                                    {
                                        category.categories["partycell"].map(el =>
                                            <MenuItem key={el.MaChiBo} value={el.MaChiBo} >{el.TenChiBo}</MenuItem>
                                        )
                                    }
                                </InputGrid>
                            </Grid>
                        }
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Ch???c v???"}
                                name="position"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                {
                                    category.categories["position"].map(el =>
                                        <MenuItem key={el.MaChucVu} value={el.MaChucVu} >{el.TenChucVu}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Tr???ng th??i"}
                                name="status"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                <MenuItem value="1">??ang sinh ho???t</MenuItem>
                                <MenuItem value="2">???? chuy???n sinh ho???t</MenuItem>
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                nameTitle={"H??? t??n"}
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
                                nameTitle={"D??n t???c"}
                                name="ethnic"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
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
                                nameTitle={"T??n gi??o"}
                                name="religion"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
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
                                nameTitle={"Tr??nh ????? tin h???c"}
                                name="it"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                {
                                    category.categories["it"].map(el =>
                                        <MenuItem key={el.MaTinHoc} value={el.MaTinHoc} >{el.TenTinHoc}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Tr??nh ????? ch??nh tr???"}
                                name="politics"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                {
                                    category.categories["politics"].map(el =>
                                        <MenuItem key={el.MaChinhTri} value={el.MaChinhTri} >{el.TenChinhTri}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Ngo???i ng???"}
                                name="flanguage"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                {
                                    category.categories["flanguage"].map(el =>
                                        <MenuItem key={el.MaNgoaiNgu} value={el.MaNgoaiNgu} >{el.TenNgoaiNgu}</MenuItem>
                                    )
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Gi???i t??nh"}
                                name="gender"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                <MenuItem value="m">Nam</MenuItem>
                                <MenuItem value="f">N???</MenuItem>
                                <MenuItem value="u">Kh??c</MenuItem>
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Qu?? qu??n"}
                                name="province"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                {
                                    provinceArr.length > 0 &&
                                    provinceArr.map((pro =>
                                        <MenuItem value={pro.code} key={pro.code}>{pro.name}</MenuItem>
                                    ))
                                }
                            </InputGrid>
                        </Grid>
                        <Grid item xs={4}>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"K???t n???p m???i"}
                                name="isnew"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">T???t c???</MenuItem>
                                <MenuItem value="yes">?????ng vi??n K???t n???p m???i</MenuItem>
                                <MenuItem value="no">Kh??ng</MenuItem>
                            </InputGrid>
                        </Grid>
                    </Grid>
                </Paper>

                <MyButton primary onClick={handleSubmit(onSubmit)} >Xem</MyButton>
                <Button variant="outlined" sx={{ ml: 1 }} onClick={handleReset} >reset</Button>
                {data.data.length > 0 &&
                    <>
                        <CSVLink data={data.data} headers={data.headers} filename={"export.csv"}>
                            <MyButton style={{ marginLeft: 8 }} success>
                                <FileDownloadIcon style={{ marginRight: 4 }} />Excel
                            </MyButton>
                        </CSVLink>
                        <MyButton onClick={handleExportPDF} sx={{ ml: 1, backgroundColor: "#e95340", '&:hover': { backgroundColor: '#e95340' } }}>
                            <FileDownloadIcon sx={{ mr: 0.5 }} />pdf
                        </MyButton>
                    </>
                }
                <TableContainer className="search-table" style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={"H??? s?? ?????ng vi??n"}
                        columns={columns}
                        data={rows}
                        actions={[
                            {
                                // isFreeAction: true,
                                icon: () => <RedoIcon color='info' />,
                                tooltip: 'Chuy???n sinh ho???t',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setMoveForm(true)
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: () => <ThumbUpAltIcon color='info' />,
                                tooltip: 'Khen th?????ng',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setRewardForm(true)
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: () => <ThumbDownAltIcon color='info' />,
                                tooltip: 'K??? lu???t',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setDisciplineForm(true)
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: 'mail',
                                iconProps: { color: 'warning' },
                                tooltip: 'K??ch ho???t (ch??? g???i ?????n nh???ng email ch??a k??ch ho???t)',
                                onClick: (event, rowData) => {
                                    handleMailing(event, rowData.map(el => el.Email))
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: 'delete',
                                iconProps: { color: 'error' },
                                tooltip: 'X??a',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setDeleteForm(true)
                                },
                            },
                        ]}
                        options={{
                            padding: 'dense',
                            selection: true,
                            search: true,
                        }}
                        isLoading={loadingTable}
                    />
                </TableContainer>
                {moveForm &&
                    <MoveForm openForm={moveForm} setOpenForm={setMoveForm} dataSelect={dataSelect} fetch={fetch} />
                }
                {(rewardForm || disciplineForm) &&
                    <RewardDisciplineForm
                        openForm={rewardForm || disciplineForm}
                        setOpenForm={setRewardForm || setDisciplineForm}
                        dataSelect={dataSelect}
                        reward={rewardForm}
                    />
                }
                {deleteForm &&
                    <DeleteForm
                        noBtn
                        openForm={deleteForm}
                        setOpenForm={setDeleteForm}
                        handleSubmit={e => handleRemove(e, dataSelect.map(el => el.MaSoDangVien))}
                        content={`B???n c?? mu???n x??a nh???ng ?????ng vi??n n??y?`}
                    />
                }
                {/* <Loading loading={loading} /> */}
            </Layout>
        </>
    );
};

export default Search;