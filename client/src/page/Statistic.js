import MaterialTable from '@material-table/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Grid, MenuItem,
    Paper,
    TableContainer, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { getAllCategory } from '../action/categoryAction';
import { filterPartyMember } from '../action/partyMemberAction';
import { getStatistic } from '../action/statisticAction';
import Loading from '../component/CustomLoadingOverlay';
import DoughnutChart from '../component/DoughnutChart';
import Layout from '../component/Layout';
import PaperStatistic from '../component/PaperStatistic';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { partyMemberPDF } from '../utils/pdf';
import { allInfoColumn, getExportData, getKeyField, pdfmakedownload } from '../utils/utils';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '16px',
        marginBottom: '16px',
    },
    inputSelect: {
        marginRight: '20px',
        marginLeft: '16px',
    },
    paperStatistic: {
        padding: '8px',
        margin: '0 8px',
    },
    paperWrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}))

const Statistic = () => {
    const classes = useStyles();

    // ContextAPI
    const { partyMember, partyMemberDispatch } = useContext(PartyMemberContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { loading, loadingDispatch } = useContext(LoadingContext);
    const { info } = useContext(InfoContext);

    // State
    const [field, setField] = useState(info.info.Quyen["12"] == 1 ? "partycell" : "position");
    const [fieldKey, setFieldKey] = useState("partycell");
    const [fieldArr, setFieldArr] = useState([]);
    const [fieldValue, setFieldValue] = useState("");
    const [yearGradeArr, setYearGradeArr] = useState([]);
    const [yearGrade, setYearGrade] = useState("");
    const [loadingTable, setLoadingTable] = useState(false);

    const [rows, setRows] = useState([])

    const col = allInfoColumn(rows, setRows);

    col.pop()

    const [columns, setColumns] = useState(col);

    const data = getExportData(rows, columns)

    const [genderS, setGenderS] = useState([]);
    const [partyCellS, setPartyCellS] = useState([])
    const [positionS, setPositionS] = useState([])
    const [ethnicS, setEthnicS] = useState([])
    const [religionS, setReligionS] = useState([])
    const [ageS, setAgeS] = useState([])
    const [itS, setItS] = useState([])
    const [politicsS, setPoliticsS] = useState([])
    const [flanguageS, setFlanguageS] = useState([])

    // Handle Function
    const handleChangeField = (e) => {
        if (e.target.value == "age")
            setFieldValue("from18to30")
        if (e.target.value == "gender")
            setFieldValue("m");
        setField(e.target.value);
    }

    const handleChangeFieldValue = (e) => {
        setFieldValue(e.target.value)
    }

    const handleChangeYear = (e) => {
        setYearGrade(e.target.value)
        yearGradeArr.forEach(el => {
            if (el.Nam == e.target.value) {
                setFieldArr(el.Data);
                setFieldValue(el.Data[0].MaLoai)
            }
        })
    }

    const handleSubmit = async () => {
        let filterObj = { [field]: fieldValue };
        if (info.info.Quyen["12"] != 1)
            filterObj.partycell = info.info.MaChiBo
        setLoadingTable(true)
        const res = await filterPartyMember(filterObj);
        setRows(res);
        setLoadingTable(false)
    }

    const getGender = (gender) => {
        const obj = {
            m: "Nam",
            f: "N???",
            u: "Kh??c"
        }
        return obj[gender];
    }

    const getCondition = () => {
        return info.info.Quyen["12"] == 1 ? "all" : info.info.MaChiBo
    }

    const handleExportPDF = () => {
        const dd = partyMemberPDF(rows);
        pdfmakedownload(dd);
    }

    // UseEffect

    useEffect(() => {
        setColumns(col);
    }, [rows])

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getStatistic({ name: "gender", condition: getCondition() })
            const newres = res.map(el => ({ label: getGender(el.GioiTinh), quantity: el.SoLuong }))
            setGenderS(newres);
            const res1 = await getStatistic({ name: "partycell", condition: getCondition() })
            const newres1 = res1.map(el => ({ label: el.TenChiBo, quantity: el.SoLuong }))
            setPartyCellS(newres1);
            const res2 = await getStatistic({ name: "position", condition: getCondition() })
            const newres2 = res2.map(el => ({ label: el.TenChucVu, quantity: el.SoLuong }))
            setPositionS(newres2);
            const res3 = await getStatistic({ name: "ethnic", condition: getCondition() })
            const newres3 = res3.map(el => ({ label: el.TenDanToc, quantity: el.SoLuong }))
            setEthnicS(newres3);
            const res4 = await getStatistic({ name: "religion", condition: getCondition() })
            const newres4 = res4.map(el => ({ label: el.TenTonGiao, quantity: el.SoLuong }))
            setReligionS(newres4);
            const res5 = await getStatistic({ name: "age", condition: getCondition() })
            const newres5 = Object.keys(res5[0]).map((el, ??ndex) => {
                return ({ label: el, quantity: res5[0][el] })
            })
            setAgeS(newres5);
            const res6 = await getStatistic({ name: "it", condition: getCondition() })
            const newres6 = res6.map(el => ({ label: el.TenTinHoc, quantity: el.SoLuong }))
            setItS(newres6);
            const res7 = await getStatistic({ name: "politics", condition: getCondition() })
            const newres7 = res7.map(el => ({ label: el.TenChinhTri, quantity: el.SoLuong }))
            setPoliticsS(newres7);
            const res8 = await getStatistic({ name: "flanguage", condition: getCondition() })
            const newres8 = res8.map(el => ({ label: el.TenNgoaiNgu, quantity: el.SoLuong }))
            setFlanguageS(newres8);
        }
        fetchAPI();
    }, [])

    useEffect(() => {
        if (field != "age" && field != "gender") {
            setFieldValue("")
            getAllCategory(categoryDispatch, field)
        }
    }, [field])

    useEffect(() => {
        if (field != "grade") {
            setFieldKey(getKeyField(field));
            setFieldArr(category.categories[field])
        } else {
            setYearGradeArr(category.categories[field])
        }
    }, [category])

    useEffect(() => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        if (yearGradeArr.length > 0) {
            setYearGrade(yearGradeArr[yearGradeArr.length - 1].Nam)
            setFieldArr(yearGradeArr[yearGradeArr.length - 1].Data)
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
    }, [yearGradeArr])

    useEffect(() => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        if (fieldArr.length > 0) {
            if (field != "grade") {
                setFieldValue(fieldArr.length > 0 ? fieldArr[0][fieldKey[0]] : "")
            } else
                setFieldValue(fieldArr.length > 0 ? fieldArr[0]["MaLoai"] : "")
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }, [fieldArr])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        B??o c??o - th???ng k??
                    </Typography>
                </div>
                <Accordion
                    variant="outlined"
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Th???ng k??</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <DoughnutChart label={"Gi???i t??nh"} data={genderS} />
                            </Grid>
                            {info.info.Quyen["12"] == 1 &&
                                <Grid item xs={3}>
                                    <DoughnutChart label={"Chi b???"} data={partyCellS} />
                                </Grid>
                            }
                            <Grid item xs={3}>
                                <DoughnutChart label={"Ch???c v???"} data={positionS} />
                            </Grid>
                            <Grid item xs={3}>
                                <DoughnutChart label={"D??n t???c"} data={ethnicS} />
                            </Grid>
                            <Grid item xs={3}>
                                <DoughnutChart label={"T??n gi??o"} data={religionS} />
                            </Grid>
                            <Grid item xs={3}>
                                <DoughnutChart label={"????? tu???i"} data={ageS} />
                            </Grid>
                            <Grid item xs={3}>
                                <DoughnutChart label={"T?? Tin h???c"} data={itS} />
                            </Grid>
                            <Grid item xs={3}>
                                <DoughnutChart label={"T?? Ch??nh tr???"} data={politicsS} />
                            </Grid>
                            <Grid item xs={3}>
                                <DoughnutChart label={"Ngo???i ng???"} data={flanguageS} />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Paper variant="outlined" className={classes.paper}>
                    <MySelect
                        nameTitle={"Lo???i b??o c??o"}
                        onChange={handleChangeField}
                        value={field}
                        autowidth
                    >
                        {info.info.Quyen["12"] == 1 &&
                            <MenuItem value="partycell">Chi b???</MenuItem>
                        }
                        <MenuItem value="position">Ch???c v???</MenuItem>
                        <MenuItem value="grade">X???p Lo???i</MenuItem>
                        <MenuItem value="age">Tu???i</MenuItem>
                        <MenuItem value="gender">Gi???i t??nh</MenuItem>
                        <MenuItem value="ethnic">D??n t???c</MenuItem>
                        <MenuItem value="religion">T??n gi??o</MenuItem>
                        <MenuItem value="it">Tr??nh ????? tin h???c</MenuItem>
                        <MenuItem value="politics">Tr??nh ????? ch??nh tr???</MenuItem>
                        <MenuItem value="flanguage">Ngo???i ng???</MenuItem>
                    </MySelect>
                    {
                        field == "age" &&
                        <MySelect
                            style={{ marginLeft: '16px' }}
                            value={fieldValue}
                            autowidth
                            onChange={handleChangeFieldValue}
                        >
                            <MenuItem value="from18to30">T??? 18 ?????n 30 tu???i</MenuItem>
                            <MenuItem value="from31to40">T??? 31 ?????n 40 tu???i</MenuItem>
                            <MenuItem value="from41to50">T??? 41 ?????n 50 tu???i</MenuItem>
                            <MenuItem value="from51to60">T??? 51 ?????n 60 tu???i</MenuItem>
                            <MenuItem value="over60">Tr??n 61 tu???i</MenuItem>
                        </MySelect>
                    }
                    {
                        field == "gender" &&
                        <MySelect
                            style={{ marginLeft: '16px' }}
                            value={fieldValue}
                            autowidth
                            onChange={handleChangeFieldValue}
                        >
                            <MenuItem value="m">Nam</MenuItem>
                            <MenuItem value="f">N???</MenuItem>
                            <MenuItem value="u">Kh??c</MenuItem>
                        </MySelect>
                    }
                    {
                        field == "grade" &&
                        <>
                            <Typography className={classes.inputSelect}>N??m</Typography>
                            <MySelect
                                value={yearGrade}
                                autowidth
                                onChange={handleChangeYear}
                            >
                                {yearGradeArr.map(el =>
                                    <MenuItem key={el.Nam} value={el.Nam}>{el.Nam}</MenuItem>
                                )}
                            </MySelect>
                            <MySelect
                                style={{ marginLeft: '16px' }}
                                value={fieldValue}
                                autowidth
                                onChange={handleChangeFieldValue}
                            >
                                {
                                    fieldArr.map(el =>
                                        <MenuItem key={el["MaLoai"]} value={el["MaLoai"]}>{el["TenLoai"]}</MenuItem>
                                    )
                                }
                            </MySelect>
                        </>
                    }
                    {
                        (field != "grade" && field != "age" && field != "gender") &&
                        <MySelect
                            style={{ marginLeft: '16px' }}
                            value={fieldValue}
                            autowidth
                            onChange={handleChangeFieldValue}
                        >
                            {fieldArr.length > 0 &&
                                fieldArr.map(el =>
                                    <MenuItem key={el[fieldKey[0]]} value={el[fieldKey[0]]}>{el[fieldKey[1]]}</MenuItem>
                                )
                            }
                        </MySelect>
                    }
                </Paper>
                <MyButton onClick={handleSubmit} primary>Xem</MyButton>
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

                <TableContainer className="statistic-table" style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={""}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense'
                        }}
                        isLoading={loadingTable}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Statistic;