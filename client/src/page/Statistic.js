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
import { allInfoColumn, downloadExcel, getKeyField } from '../utils/utils';
import { filterPartyMember, getAllPartyMember } from '../action/partyMemberAction';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { getAllCategory } from '../action/categoryAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import Loading from '../component/CustomLoadingOverlay'

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

    // State
    const [field, setField] = useState("partycell");
    const [fieldKey, setFieldKey] = useState("partycell");
    const [fieldArr, setFieldArr] = useState([]);
    const [fieldValue, setFieldValue] = useState("");
    const [yearGradeArr, setYearGradeArr] = useState([]);
    const [yearGrade, setYearGrade] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingTable, setLoadingTable] = useState(false);

    const [rows, setRows] = useState([])

    const [columns] = useState(allInfoColumn);

    // Variable
    const genderS = [
        { label: 'Nam', quantity: '200' },
        { label: 'Nữ', quantity: '200' }
    ];
    const partyCellS = [
        { label: 'Sinh viên', quantity: '123' },
        { label: 'Đảng viên', quantity: '123' }
    ];
    const ethnicS = [
        { label: 'Kinh', quantity: '2000' },
        { label: 'Khmer', quantity: '500' },
        { label: 'Chăm', quantity: '50' },
        { label: 'Hoa', quantity: '30' },
    ];
    const ageS = [
        { label: '18 - 30', quantity: '200' },
        { label: ' 31 - 40', quantity: '200' },
        { label: ' 41 - 50', quantity: '200' },
        { label: ' 51 - 60', quantity: '200' },
        { label: ' Trên 60', quantity: '200' },
    ]

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
        setLoadingTable(true)
        const res = await filterPartyMember({ [field]: fieldValue });
        setRows(res);
        setLoadingTable(false)
    }

    // UseEffect
    useEffect(() => {
        getAllPartyMember(partyMemberDispatch);
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
                            <PaperStatistic title={"Dân tộc"} data={ethnicS} />
                            <PaperStatistic title={"Độ tuổi"} data={ageS} />
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
                        <MenuItem value="partycell">Chi bộ</MenuItem>
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
                        title={"Báo cáo"}
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
            </Layout>
            <Loading loading={loading} />
        </>
    );
};

export default Statistic;