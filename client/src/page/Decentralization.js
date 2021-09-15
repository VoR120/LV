import { makeStyles, MenuItem, Paper, Typography } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import DecentralizationForm from '../component/DecentralizationForm';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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
        flexWrap: 'wrap',
        padding: '16px',
        marginBottom: '16px',
    },
    inputSelect: {
        marginRight: '20px',
    },
    checkIcon: {
        color: theme.palette.success.main,
    }
}))

const Decentralization = () => {
    const classes = useStyles();
    const [categoryField, setCategoryField] = useState("chibo");

    const handleChangeField = (e) => {
        setCategoryField(e.target.value);
    }

    const [rowData] = useState([
        { cId: 'CV1', name: 'Ủy viên BCH', fullPowers: true, update: true, createVotings: true },
        { cId: 'CV2', name: 'Ủy viên BTV', fullPowers: true, update: true, createVotings: true },
        { cId: 'CV3', name: 'Bí thư', fullPowers: true, update: true, createVotings: true },
        { cId: 'CV4', name: 'Phó bí thư', fullPowers: false, createVotings: true },
        { cId: 'CV5', name: 'Đảng viên chính thức', fullPowers: false, },
        { cId: 'CV6', name: 'Đảng viên dự bị', fullPowers: false },
    ])

    const [columnDefs] = useState([
        { headerName: "Mã chức vụ", field: "cId", width: '120px', pinned: 'left' },
        { headerName: "Tên chức vụ", field: "name", pinned: 'left' },
        {
            headerName: "Toàn quyền", field: "fullPowers",
            cellRendererFramework: (params) => {
                return (
                    <>
                        {params.data.fullPowers ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />}
                    </>
                )
            }
        },
        {
            headerName: "Sửa hồ sơ Đảng viên", field: "update",
            cellRendererFramework: (params) => {
                return (
                    <>
                        {params.data.update ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />}
                    </>
                )
            }
        },
        {
            headerName: "Tạo biểu quyết", field: "createVotings",
            cellRendererFramework: (params) => {
                return (
                    <>
                        {params.data.createVotings ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />}
                    </>
                )
            }
        },
        {
            headerName: "Phân quyền", field: "action", sortable: false, width: '160px', pinned: 'right',
            cellRendererFramework: (params) => {
                console.log(params.data);
                return (
                    <>
                        <DecentralizationForm data={params.data} button/>
                    </>
                )
            }
        },
    ])

    const gridOptions = {
        rowData: rowData,
        columnDefs: columnDefs,
        defaultColDef: {
            resizable: true,
        },
        defaultColDef: {
            sortable: true,
        },
        pagination: true,
        paginationPageSize: "10",
    }
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
    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Phân quyền
                    </Typography>
                </div>
                <MyButton primary>Xem</MyButton>
                <div className={`${classes.table} ag-theme-alpine`}>
                    <AgGridReact
                        gridOptions={gridOptions}
                    />
                </div>
            </Layout>
        </>
    );
};

export default Decentralization;