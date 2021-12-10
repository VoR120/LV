import MaterialTable from '@material-table/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { getAllCategory } from '../action/categoryAction';
import CategoryForm from '../component/CategoryForm';
import DeleteFormCategory from '../component/DeleteFormCategory';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { partycellPDF } from '../utils/pdf';
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
    editBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.info.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.info.dark
        },
    },
    deleteBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        },
    },
}))

const PartyCell = () => {
    const classes = useStyles();

    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)

    const { category, categoryDispatch } = useContext(CategoryContext);

    const [columns] = useState([
        { title: "Mã Chi bộ", field: "MaChiBo", },
        { title: "Tên chi bộ", field: "TenChiBo", },
        { title: "Bí thư", field: "BiThu", },
        { title: "Phó bí thư", field: "PhoBiThu", },
        { title: "Số đảng viên", field: "SoDangVien", },
        {
            title: "Chức năng",
            field: "action",
            render: (params) => {
                console.log(params)
                return (
                    <>
                        <CategoryForm
                            edit={true}
                            categoryName={"Chi bộ"}
                            dataArr={{ "MaChiBo": params.MaChiBo, "TenChiBo": params.TenChiBo }}
                            categoryField={"partycell"}
                            keyField={["MaChiBo", "TenChiBo", "SoDangVien"]}
                        />
                        <DeleteFormCategory
                            title={"chi bộ"}
                            id={params.MaChiBo}
                            name={params.TenChiBo}
                            categoryField={"partycell"}
                        />
                    </>
                )
            }
        }
    ])

    const data = getExportData(rows, columns)
    console.log(data);

    const handleExportPDF = () => {
        const dd = partycellPDF(rows, "DANH SÁCH THÔNG TIN CHI BỘ");
        pdfmakedownload(dd);
    }

    useEffect(() => {
        if (category.categories["partycell"].length > 0) {
            setRows(category.categories["partycell"]);
        }
    }, [category])

    useEffect(() => {
        getAllCategory(categoryDispatch, "partycell");
    }, [])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Hồ sơ Đảng viên
                    </Typography>
                </div>
                <CategoryForm
                    categoryName={"Chi bộ"}
                    categoryField={"partycell"}
                    keyField={["MaChiBo", "TenChiBo", "SoDangVien"]}
                />
                <>
                    <CSVLink data={data.data} headers={data.headers} filename={"export.csv"}>
                        <MyButton sx={{ ml: 1 }} success>
                            <FileDownloadIcon sx={{ mr: 0.5 }} />Excel
                        </MyButton>
                    </CSVLink>
                    <MyButton onClick={handleExportPDF} sx={{ ml: 1, backgroundColor: "#e95340", '&:hover': { backgroundColor: '#e95340' } }}>
                        <FileDownloadIcon sx={{ mr: 0.5 }} />pdf
                    </MyButton>
                </>
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
                        title={"Chi bộ"}
                        columns={columns}
                        data={rows}
                        isLoading={loading}
                        options={{
                            padding: 'dense'
                        }}
                        isLoading={category.loading}

                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default PartyCell;