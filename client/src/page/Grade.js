import MaterialTable from '@material-table/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
    MenuItem,
    Paper,
    TableContainer, TextField, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useForm } from 'react-hook-form';
import { getAllCategory } from '../action/categoryAction';
import { getEvaluated } from '../action/evaluateAction';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { gradePDF } from '../utils/pdf';
import { getExportData, pdfmakedownload } from '../utils/utils';

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

const Grade = () => {
    const classes = useStyles();

    // ContextAPI
    const { partyMember, partyMemberDispatch } = useContext(PartyMemberContext);
    const { info } = useContext(InfoContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)

    // State
    const [type, setType] = useState("year");
    const [id, setId] = useState("")
    const [yearGradeArr, setYearGradeArr] = useState([]);
    const [yearGrade, setYearGrade] = useState("");
    const [loading, setLoading] = useState(false);

    const [rows, setRows] = useState([])

    const [columns] = useState([
        { title: "M?? ?????ng vi??n", field: "MaSoDangVien", maxWidth: 150 },
        { title: "H??? t??n", field: "HoTen", minWidth: 200 },
        { title: "Chi b???", field: "TenChiBo", },
        { title: "T??n lo???i", field: "TenLoai", },
        { title: "N??m", field: "Nam", },
    ]);

    const data = getExportData(rows, columns)

    const {
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    // Handle Function

    const handleChangeYear = (e) => {
        setYearGrade(e.target.value)
    }

    const onSubmit = () => {
        setLoading(true);
        const fetchAPI = async () => {
            let res = await getEvaluated({
                Nam: yearGrade,
                MaChiBo: info.info.Quyen['12'] == 1 ? null : info.info.MaChiBo,
                MaSoDangVien: id
            })
            console.log(res);
            if (res.error) {
                setRows([])
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: `${res.error}`,
                        type: "error"
                    }
                })
            } else
                setRows(res.data);
            setLoading(false);
        }
        fetchAPI();
    }

    const handleExportPDF = () => {
        const dd = gradePDF(rows, "DANH S??CH X???P LO???I ?????NG VI??N");
        pdfmakedownload(dd);
    }

    // UseEffect

    useEffect(() => {
        getAllCategory(categoryDispatch, "grade")
    }, [])

    useEffect(() => {
        setYearGradeArr(category.categories.grade)
    }, [category])

    useEffect(() => {
        if (yearGradeArr.length > 0) {
            // setYearGrade(yearGradeArr[yearGradeArr.length - 1].Nam)
            setYearGrade((new Date()).getFullYear());
        }
    }, [yearGradeArr])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Lo???i ?????ng vi??n
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <MySelect
                        value={type}
                        autowidth
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="year">Theo n??m</MenuItem>
                        <MenuItem value="id" >Theo M?? ?????ng vi??n</MenuItem>
                    </MySelect>
                    {type == "year" ?
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
                        </> :
                        <>
                            <Typography className={classes.inputSelect}>M?? s??? ?????ng vi??n</Typography>
                            <TextField
                                onChange={(e) => setId(e.target.value)}
                                size="small"
                                variant="outlined"
                            />
                        </>
                    }
                </Paper>
                <MyButton onClick={handleSubmit(onSubmit)} primary>Xem</MyButton>
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
                        title={"Lo???i ?????ng vi??n"}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense'
                        }}
                        isLoading={loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Grade;