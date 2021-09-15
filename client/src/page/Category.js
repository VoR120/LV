import { Button, InputLabel, makeStyles, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import ActionMenu from '../component/ActionMenu';
import EditForm from '../component/EditForm';
import DeleteForm from '../component/DeleteForm';
import AddFormCategory from '../component/AddFormCategory';
import EditFormCategory from '../component/EditFormCategory';
import DeleteFormCategory from '../component/DeleteFormCategory';
import MySelect from '../component/UI/MySelect';


const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: {
        height: '450px',
        width: '100%',
        backgroundColor: 'white',
        marginTop: '20px',
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
    paper: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        marginBottom: '16px',
    },
    inputSelect: {
        marginRight: '20px',
    }
}))

const Category = () => {
    const classes = useStyles();
    const [categoryField, setCategoryField] = useState("dantoc");

    const handleChangeField = (e) => {
        setCategoryField(e.target.value);
    }

    const [rowData] = useState([
        { cId: 'CB1', name: 'Sinh viên', quantity: "200" },
        { cId: 'CB2', name: 'Giảng viên', quantity: "40" },
    ])

    const [columnDefs] = useState([
        { headerName: "Mã Chi bộ", field: "cId", width: '100px', },
        { headerName: "Tên chi bộ", field: "name", },
        { headerName: "Số đảng viên", field: "quantity", },
        {
            headerName: "Chức năng", field: "action", sortable: false, width: '200px',
            cellRendererFramework: (params) => {
                const { cId, name } = params.data
                return (
                    <>
                        <EditFormCategory
                            header={"Cập nhật Chi bộ"}
                            idTitle={"Mã Đảng viên"}
                            idValue={cId}
                            nameTitle={"Tên Chi bộ"}
                            nameValue={name}
                        />
                        <DeleteFormCategory />
                    </>
                )
            }
        },
    ])

    const gridOptions = {
        rowData: rowData,
        columnDefs: columnDefs,
        defaultColDef: {
            sortable: true,
        },
        pagination: true,
        paginationPageSize: "10",
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Danh mục
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Typography className={classes.inputSelect}>Danh mục</Typography>
                    <MySelect
                        onChange={handleChangeField}
                        value={categoryField}
                        autoWidth
                    >
                        <MenuItem value="dantoc">Dân tộc</MenuItem>
                        <MenuItem value="tongiao">Tôn giáo</MenuItem>
                        <MenuItem value="chucvu">Chức vụ</MenuItem>
                        <MenuItem value="ngoaingu">Ngoại ngữ</MenuItem>
                        <MenuItem value="tinhoc">Tin học</MenuItem>
                    </MySelect>
                </Paper>
                <AddFormCategory
                    header={"Cập nhật Chi bộ"}
                    idTitle={"Mã Đảng viên"}
                    idValue={"CB3"}
                    nameTitle={"Tên Chi bộ"}
                />
                <div className={`${classes.table} ag-theme-alpine`}>
                    <AgGridReact
                        gridOptions={gridOptions}
                    />
                </div>
            </Layout>
        </>
    );
};

export default Category;