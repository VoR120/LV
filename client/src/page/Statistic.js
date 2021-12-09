import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, MenuItem,
    Paper,
    TableContainer, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState, useContext } from 'react';
import ActionMenu from '../component/ActionMenu';
import Layout from '../component/Layout';
import PaperStatistic from '../component/PaperStatistic';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { allInfoColumn, downloadExcel, getDate, getExportData, getKeyField, getLocaleDate, pdfmakedownload } from '../utils/utils';
import { filterPartyMember, getAllPartyMember } from '../action/partyMemberAction';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { getAllCategory } from '../action/categoryAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import Loading from '../component/CustomLoadingOverlay'
import { InfoContext } from '../contextAPI/InfoContext';
import { CSVLink } from 'react-csv'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axios from '../helper/axios';
import { getStatistic } from '../action/statisticAction';

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
    const { info } = useContext(InfoContext);

    // State
    const [field, setField] = useState(info.info.Quyen["12"] == 1 ? "partycell" : "position");
    const [fieldKey, setFieldKey] = useState("partycell");
    const [fieldArr, setFieldArr] = useState([]);
    const [fieldValue, setFieldValue] = useState("");
    const [yearGradeArr, setYearGradeArr] = useState([]);
    const [yearGrade, setYearGrade] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(false);

    const [rows, setRows] = useState([])

    const [columns] = useState(allInfoColumn);

    const data = getExportData(rows, columns)

    // Variable
    const [genderS, setGenderS] = useState([]);
    const [partyCellS, setPartyCellS] = useState([])
    const [positionS, setPositionS] = useState([])
    const [ethnicS, setEthnicS] = useState([])
    const [religionS, setReligionS] = useState([])
    const [ageS, setAgeS] = useState([])
    const [itS, setItS] = useState([])
    const [politicsS, setPoliticsS] = useState([])

    // Handle Function
    const handleChangeField = (e) => {
        if (e.target.value == "age")
            setFieldValue("from18to30")
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
            f: "Nữ",
            u: "Khác"
        }
        return obj[gender];
    }

    const getCondition = () => {
        return info.info.Quyen["12"] == 1 ? "all" : info.info.MaChiBo
    }

    // playground requires you to assign document definition to a variable called dd

    let body = [
        [
            { text: 'STT', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Họ tên', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Mã số Đảng viên', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Giới tính', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Ngày sinh', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Nơi sinh', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Ngày vào Đảng', style: 'tableHeader', alignment: 'center', colSpan: 2 },
            { text: "" },
            { text: 'Nơi vào Đảng', style: 'tableHeader', alignment: 'center', colSpan: 2 },
            { text: "" },
            { text: 'Số thẻ', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Chức vụ', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Dân tộc', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
            { text: 'Tôn giáo', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
        ],
        ['', '', '', "", "", "", { text: "Lần đầu", style: 'tableHeader' }, { text: "Chính thức", style: 'tableHeader' }, { text: "Lần đầu", style: 'tableHeader' }, { text: "Chính thức", style: 'tableHeader' }, "", "", "", ""],
    ]

    rows.map((el, index) => {
        body.push([
            index, el.HoTen, el.MaSoDangVien, el.TenGioiTinh,
            getLocaleDate(el.NgaySinh), el.NoiSinh, getLocaleDate(el.NgayVaoDang), getLocaleDate(el.NgayChinhThuc), el.NoiVaoDangLanDau, el.NoiVaoDangChinhThuc, el.SoThe, el.TenChucVu, el.TenDanToc, el.TenTonGiao])
    })

    var dd = {
        pageOrientation: 'landscape',
        content: [
            {
                columns: [
                    {
                        text: [
                            'ĐẢNG BỘ ĐẠI HỌC CẦN THƠ \n',
                            'CHI BỘ KHOA CNTT&TT'
                        ],
                        alignment: 'center'
                    },
                    {
                        text: [
                        ],
                    },
                    [
                        {
                            text: 'ĐẢNG CỘNG SẢN VIỆT NAM \n',
                            alignment: 'center'
                        },
                        {
                            text: 'Ninh Kiều, ngày 5 tháng 12 năm 2021 \n',
                            alignment: 'center'
                        }
                    ]
                ],
            },
            {
                text: 'DANH SÁCH ĐẢNG VIÊN \n',
                alignment: 'center',
                style: 'header',
                bold: true,
                margin: [0, 24, 0, 24]
            },
            {
                style: 'tableExample',
                color: '#222',
                table: {
                    // widths: ['auto', 'auto', 'auto'],
                    headerRows: 2,
                    // keepWithHeaderRows: 1,
                    body: body
                }
            },
        ],
        styles: {
            header: {
                fontSize: 14,
                alignment: 'justify'
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            content: {
                margin: [0, 30, 0, 0],
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }

    }

    const handleExportPDF = () => {
        pdfmakedownload(dd);
    }

    // UseEffect
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
            const newres5 = Object.keys(res5[0]).map((el, ìndex) => {
                return ({ label: el, quantity: res5[0][el] })
            })
            setAgeS(newres5);
            const res6 = await getStatistic({ name: "it", condition: getCondition() })
            const newres6 = res6.map(el => ({ label: el.TenTinHoc, quantity: el.SoLuong }))
            setItS(newres6);
            const res7 = await getStatistic({ name: "politics", condition: getCondition() })
            const newres7 = res7.map(el => ({ label: el.TenChinhTri, quantity: el.SoLuong }))
            setPoliticsS(newres7);
        }
        fetchAPI();
        // getAllPartyMember(partyMemberDispatch);
    }, [])

    useEffect(() => {
        if (field != "age") {
            setLoading(true)
            getAllCategory(categoryDispatch, field)
            setFieldValue("")
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
        if (yearGradeArr.length > 0) {
            setYearGrade(yearGradeArr[yearGradeArr.length - 1].Nam)
            setFieldArr(yearGradeArr[yearGradeArr.length - 1].Data)
        }
    }, [yearGradeArr])

    useEffect(() => {
        if (fieldArr.length > 0) {
            if (field != "grade") {
                setFieldValue(fieldArr.length > 0 ? fieldArr[0][fieldKey[0]] : "")
            } else
                setFieldValue(fieldArr.length > 0 ? fieldArr[0]["MaLoai"] : "")
            setLoading(false)
        }
    }, [fieldArr])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Báo cáo - thống kê
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
                        <Typography className={classes.heading}>Thống kê</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.paperWrapper}>
                            <PaperStatistic title={"Giới tính"} data={genderS} />
                            <PaperStatistic title={"Chi bộ"} data={partyCellS} />
                            <PaperStatistic title={"Chức vụ"} data={positionS} />
                            <PaperStatistic title={"Dân tộc"} data={ethnicS} />
                            <PaperStatistic title={"Tôn giáo"} data={religionS} />
                            <PaperStatistic title={"Tuổi"} data={ageS} />
                            <PaperStatistic title={"TĐ Tin học"} data={itS} />
                            <PaperStatistic title={"TĐ Chính trị"} data={politicsS} />
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Paper variant="outlined" className={classes.paper}>
                    <MySelect
                        nameTitle={"Loại báo cáo"}
                        onChange={handleChangeField}
                        value={field}
                        autowidth
                    >
                        {info.info.Quyen["12"] == 1 &&
                            <MenuItem value="partycell">Chi bộ</MenuItem>
                        }
                        <MenuItem value="position">Chức vụ</MenuItem>
                        <MenuItem value="grade">Xếp Loại</MenuItem>
                        <MenuItem value="age">Tuổi</MenuItem>
                        <MenuItem value="ethnic">Dân tộc</MenuItem>
                        <MenuItem value="religion">Tôn giáo</MenuItem>
                    </MySelect>
                    {!loading &&
                        (field == "grade" ?
                            <>
                                <Typography className={classes.inputSelect}>Năm</Typography>
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
                            :
                            field == "age"
                                ?
                                <MySelect
                                    style={{ marginLeft: '16px' }}
                                    value={fieldValue}
                                    autowidth
                                    onChange={handleChangeFieldValue}
                                >
                                    <MenuItem value="from18to30">Từ 18 đến 30 tuổi</MenuItem>
                                    <MenuItem value="from31to40">Từ 31 đến 40 tuổi</MenuItem>
                                    <MenuItem value="from41to50">Từ 41 đến 50 tuổi</MenuItem>
                                    <MenuItem value="from51to60">Từ 51 đến 60 tuổi</MenuItem>
                                    <MenuItem value="over60">Trên 61 tuổi</MenuItem>
                                </MySelect>
                                :
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
                        )
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
                        title={"Báo cáo"}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense'
                        }}
                        isLoading={loadingTable}
                    />
                </TableContainer>
            </Layout>
            <Loading loading={loading} />
        </>
    );
};

export default Statistic;