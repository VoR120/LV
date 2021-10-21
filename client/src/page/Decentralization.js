import MaterialTable from '@material-table/core';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import DecentralizationForm from '../component/DecentralizationForm';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';

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
    },
}))

const Decentralization = () => {
    const classes = useStyles();
    const [categoryField, setCategoryField] = useState("chibo");

    const handleChangeField = (e) => {
        setCategoryField(e.target.value);
    }

    const [rows] = useState([
        { id: 'CV1', name: 'Ủy viên BCH', fullPowers: true, update: true, createVotings: true },
        { id: 'CV2', name: 'Ủy viên BTV', fullPowers: true, update: true, createVotings: true },
        { id: 'CV3', name: 'Bí thư', fullPowers: true, update: true, createVotings: true },
        { id: 'CV4', name: 'Phó bí thư', fullPowers: false, createVotings: true },
        { id: 'CV5', name: 'Đảng viên chính thức ', fullPowers: false, },
        { id: 'CV6', name: 'Đảng viên dự bị', fullPowers: false },
    ])

    const [columns] = useState([
        { title: "Mã chức vụ", field: "id", maxWidth: 150 },
        { title: "Tên chức vụ", field: "name", },
        {
            title: "Toàn quyền", field: "fullPowers",
            headerStyle: { width: 150, minWidth: 150 },
            cellStyle: { width: 150, minWidth: 150, },
            render: (params) => {
                return (
                    <>
                        {params.fullPowers ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />}
                    </>
                )
            }
        },
        {
            title: "Sửa hồ sơ Đảng viên", field: "update",
            headerStyle: { width: 200, minWidth: 200 },
            cellStyle: { width: 200, minWidth: 200, },
            render: (params) => {
                return (
                    <>
                        {params.update ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />}
                    </>
                )
            }
        },
        {
            title: "Tạo biểu quyết", field: "createVotings",
            headerStyle: { width: 150, minWidth: 150 },
            cellStyle: { width: 150, minWidth: 150, },
            render: (params) => {
                return (
                    <>
                        {params.createVotings ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />}
                    </>
                )
            }
        },
        {
            title: "Phân quyền", field: "action",
            headerStyle: { width: 150, minWidth: 150 },
            cellStyle: { width: 150, minWidth: 150, },
            render: (params) => {
                console.log(params);
                return (
                    <>
                        <DecentralizationForm data={params} button />
                    </>
                )
            }
        },
    ])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Phân quyền
                    </Typography>
                </div>
                <TableContainer style={{ maxWidth: "1170px", }} >
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
                        title={"Phân quyền"}
                        columns={columns}
                        data={rows}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Decentralization;