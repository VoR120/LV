import { Button, Typography, Paper, TableContainer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import ActionMenu from '../component/ActionMenu';
import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadExcel } from '../utils/utils';

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
}))

const Move = () => {
    const classes = useStyles();
    const [typeMove, setTypeMove] = useState('in');
    const handleChangeList = (e) => {
        if (!e.target.value) {
            const btn = e.target.parentNode.value
            setTypeMove(btn);
        } else
            setTypeMove(e.target.value);
    }

    const active = (value) => {
        return typeMove === value ? "contained" : "outlined"
    }

    const [rows] = useState([
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
        { MaDangVien: "0001" },
    ])

    const [columns] = useState([
        { title: "Mã Đảng viên", field: "MaDangVien", maxWidth: 150 },
        { title: "Họ tên", field: "HoTen", },
        { title: "Ngày chuyển đi", field: "name", },
        { title: "Ngày chuyển đến", field: "name", },
        { title: "Nơi chuyển", field: "NoiChuyen", },
        { title: "Ghi chú", field: "GhiChu", sorting: false },
        {
            title: "Chức năng", field: "action", sorting: false,
            render: (params) => {
                console.log(params);
                return <ActionMenu data={params} />
            }
        },
    ])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Danh sách Đảng viên chuyển sinh hoạt
                    </Typography>
                </div>
                <Button value="in" onClick={handleChangeList} style={{ marginRight: '8px', }} variant={active("in")} color="primary">Chuyển đến</Button>
                <Button value="out" onClick={handleChangeList} variant={active("out")} color="primary">Chuyển đi</Button>
                <TableContainer style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) => <Paper
                                {...props}
                                className={classes.table}
                                variant="outlined"
                            />
                        }}
                        title={"Chuyển sinh hoạt"}
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
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Move;