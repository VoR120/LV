import MaterialTable from '@material-table/core';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import DecentralizationForm from '../component/DecentralizationForm';
import Layout from '../component/Layout';
import { getAllCategory } from '../action/categoryAction'
import MyButton from '../component/UI/MyButton';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { getPermissionPosition } from '../action/permissionAction';

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
    const { category, categoryDispatch } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false);
    const handleChangeField = (e) => {
        setCategoryField(e.target.value);
    }

    const [rows, setRows] = useState([])

    const [columns, setColumns] = useState([])
    // <DecentralizationForm data={params} button />

    useEffect(() => {
        setLoading(true)
        getAllCategory(categoryDispatch, "position");
        getAllCategory(categoryDispatch, "permission")
    }, [])

    const checkAllPermission = (obj) => {
        let isAll = true
        Object.keys(obj).forEach(el => {
            if (obj[el] == 0)
                isAll = false
        })
        return isAll
    }

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getPermissionPosition();
            let newRes = [...res];
            res.map((obj, index) => {
                newRes[index]["all"] = checkAllPermission(obj) ? 1 : 0
            })
            setRows(newRes);
            setLoading(false)
        }
        let newColumn = [
            { title: "Chức vụ", field: "TenChucVu", minWidth: 150 },
            {
                title: "Toàn quyền",
                field: "all",
                render: (params) =>
                    checkAllPermission(params) ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />
            }
        ]
        category.categories["permission"].map(el => {
            newColumn.push({
                title: el.TenQuyen,
                field: el.MaQuyen + "",
                render: (params) =>
                    params[el.MaQuyen] == 1 ? <CheckIcon className={classes.checkIcon} /> : <ClearIcon color="error" />
            })
        })
        newColumn.push({
            title: "Phân quyền",
            field: "PhanQuyen",
            render: (params) =>
                <DecentralizationForm
                    dataName={category.categories["permission"]}
                    value={params} button
                    setRows={setRows}
                />
        })
        setColumns(newColumn)
        fetchAPI();
    }, [category.categories])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Phân quyền
                    </Typography>
                </div>
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
                        title={"Phân quyền"}
                        columns={columns}
                        data={rows}
                        isLoading={loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Decentralization;