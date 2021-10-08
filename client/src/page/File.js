import { Button, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import ActionMenu from '../component/ActionMenu';


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
}))

const File = () => {
    const classes = useStyles();

    const [rowData] = useState([
        { id: 1, name: 'Nguyễn Văn A', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 2, name: 'Trần Văn B', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017', },
        { id: 3, name: 'Nguyễn Trần Thị C', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 4, name: 'Đặng Hoài D', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 5, name: 'Nguyễn Văn E', partyCell: 'Giảng viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 6, name: 'Nguyễn Văn F', partyCell: 'Giảng viên', birth: '01/01/1999', dayIn: '01/12/2017' },
        { id: 7, name: 'Nguyễn Văn G', partyCell: 'Giảng viên', birth: '01/01/1999', dayIn: '01/12/2014' },
        { id: 8, name: 'Nguyễn Văn H', partyCell: 'Giảng viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 9, name: 'Nguyễn Văn A', partyCell: 'Giảng viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 10, name: 'Nguyễn Văn A', partyCell: 'Giảng viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 11, name: 'Nguyễn Văn A', partyCell: 'Giảng viên', birth: '01/01/1999', dayIn: '12/12/2017' },
    ])

    const [columnDefs] = useState([
        { headerName: "ID", field: "id", pinned: 'left', width: '50px', },
        { headerName: "Họ tên", field: "name", pinned: 'left', },
        { headerName: "Chi bộ", field: "partyCell", },
        { headerName: "Ngày sinh", field: "birth", },
        { headerName: "Ngày vào Đảng", field: "dayIn", },
        { headerName: "Ngày vào Đảng", field: "dayIn", },
        { headerName: "Ngày vào Đảng", field: "dayIn", },
        { headerName: "Ngày vào Đảng", field: "dayIn", },
        { headerName: "Ngày vào Đảng", field: "dayIn", },
        {
            headerName: "Chức năng", field: "action", pinned: 'right', sortable: false, width: '110px',
            cellRendererFramework: (params) => {
                return <ActionMenu data={params.data} />
            }
        },
    ])

    const gridOptions = {
        defaultColDef: {
            resizable: true,
        },
        columnDefs: columnDefs,
        rowData: rowData,
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
                        Hồ sơ Đảng viên
                    </Typography>
                </div>
                <AddForm />
                <div className={`${classes.table} ag-theme-alpine`}>
                    <AgGridReact
                        gridOptions={gridOptions}
                    />
                </div>
            </Layout>
        </>
    );
};

export default File;