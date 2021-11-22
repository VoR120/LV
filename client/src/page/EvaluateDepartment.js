import {
    Button,
    MenuItem,
    Paper,
    TableContainer, Typography
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategory } from '../action/categoryAction';
import { evaluate } from '../action/evaluateAction';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import MaterialTable from '@material-table/core';
import axios from '../helper/axios';
import { getExportData } from '../utils/utils';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

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
        padding: '16px',
        marginBottom: '16px',
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '20px 0'
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
        flexWrap: 'wrap',
    },
    status: {
        cursor: "default",
        '&:hover': {
            backgroundColor: theme.palette.common.white
        }
    }
}))

const EvaluateDepartment = () => {
    const classes = useStyles();

    // ContextAPI
    const { info, infoDispatch } = useContext(InfoContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)

    // State
    const columns = [
        { title: "Mã số Đảng viên", field: "MaSoDangVien", },
        { title: "Họ tên", field: "HoTen", },
        { title: "Cá nhân đánh giá", field: "TenDanhGiaCaNhan", },
        { title: "Bộ môn đánh giá", field: "TenDanhGiaBoMon", },
        {
            title: "Khoa đánh giá", field: "action",
            render: (params) => {
                return (
                    <MySelect
                        value={params.DanhGiaKhoa || "0"}
                        onChange={(e) => handleChange(e, params.MaSoDangVien)}
                    >
                        <MenuItem value="0">Chọn loại</MenuItem>
                        {
                            gradeArr.length > 0 &&
                            gradeArr.map(el => <MenuItem key={el.MaLoai} value={el.MaLoai}>{el.TenLoai}</MenuItem>)
                        }
                    </MySelect>
                )
            }
        }
    ]

    const [rows, setRows] = useState([])

    const [year, setYear] = useState("2021");
    const [grade, setGrade] = useState("0");
    const [gradeArr, setGradeArr] = useState([]);
    const [isEvaluate, setIsEvaluate] = useState(false);
    const [loading, setLoading] = useState(false)
    const [field, setField] = useState('all')

    // Handle Function

    const handleChangeField = (e) => {
        setField(e.target.value);
    }

    const handleChange = async (e, id) => {
        try {
            setLoading(true)
            const res = await axios.post('/api/evaluate/create', {
                MaSoDangVien: id,
                Nam: year,
                MaLoai: e.target.value,
                MaDVDG: 3
            })
            if (res.status == 201) {
                fetchAPI();
            }
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã đánh giá!",
                    type: "success"
                }
            })
            setLoading(false)
        } catch (error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: error.response.data.msg,
                    type: "error"
                }
            })
        }
    }

    const fetchAPI = async () => {
        try {
            let res;
            if (field == "all")
                res = await axios.get(`/api/evaluate/getbysubject?Nam=${year}`)
            else
                res = await axios.get(`/api/evaluate/getbysubject?MaChiBo=${field}&Nam=${year}`)
            console.log(res.data);
            if (res.status == 200) {
                setRows(res.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        fetchAPI()
    }

    // UseEffect
    useEffect(() => {
        setLoading(true)
        getAllCategory(categoryDispatch, "grade");
        getAllCategory(categoryDispatch, "partycell");
        fetchAPI();
    }, [])

    useEffect(() => {
        if (category.categories.grade.length > 0) {
            category.categories.grade.map(el => {
                el.Nam == year && setGradeArr(el.Data)
            })
        }
    }, [category.categories.grade])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Bộ môn đánh giá
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Typography style={{ textTransform: 'uppercase', marginBottom: 8 }}>Đánh giá Đảng viên cuối năm</Typography>
                    <MySelect
                        nameTitle="Chi bộ"
                        value={field}
                        onChange={handleChangeField}
                        autowidth
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        {
                            category.categories.partycell.map(el =>
                                <MenuItem value={el.MaChiBo} key={el.MaChiBo}>{el.TenChiBo}</MenuItem>
                            )
                        }
                    </MySelect>
                </Paper>
                <MyButton onClick={handleSubmit} primary>Xem</MyButton>
                <TableContainer className="decentralization-table" style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) => <Paper
                                {...props}
                                className={classes.table}
                                variant="outlined"
                            />
                        }}
                        options={{
                            padding: 'dense'
                        }}
                        title={"Bộ môn đánh giá"}
                        columns={columns}
                        data={rows}
                        isLoading={loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default EvaluateDepartment;