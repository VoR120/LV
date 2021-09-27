import { Grid, MenuItem, Paper, TextField, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { useState } from 'react';
import ActionMenu from '../component/ActionMenu';
import Layout from '../component/Layout';
import MySelect from '../component/UI/MySelect';
import MyButton from '../component/UI/MyButton'

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: (props) => ({
        height: props.rows.length > 0 ? 400 : 200,
        width: '100%',
        backgroundColor: 'white',
        marginTop: '20px'
    }),
    deleteBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        margin: '0 4px',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
    }
}))

const Search = () => {

    const [rowData] = useState([
        { id: 1, name: 'Nguyễn Văn A', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 2, name: 'Trần Văn B', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017', },
        { id: 3, name: 'Nguyễn Trần Thị C', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 4, name: 'Đặng Hoài D', partyCell: 'Sinh viên', birth: '01/01/1999', dayIn: '12/12/2017' },
        { id: 5, name: 'Nguyễn Văn E', partyCell: 'Giảng viên', birth: null, dayIn: '12/12/2017' },
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
                // console.log(params.data);
                return <ActionMenu data={params.data} />
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

    const classes = useStyles({ rows: rowData });
    const [gender, setGender] = useState('2');
    const handleChangeGender = (e) => {
        setGender(e.target.value)
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Tìm kiếm
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Chi bộ</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <MySelect
                                    // onChange={handleChangeGender}
                                    value={"sv"}
                                >
                                    <MenuItem value="sv">Sinh viên</MenuItem>
                                    <MenuItem value="gv">Giảng viên</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Trạng thái</Typography>
                            </Grid>
                            <Grid xs={7}>
                            <MySelect
                                    // onChange={handleChangeGender}
                                    value={"sv"}
                                >
                                    <MenuItem value="sv">Đang sinh hoạt</MenuItem>
                                    <MenuItem value="gv">Chuyển sinh hoạt tạm thời</MenuItem>
                                    <MenuItem value="gv">Chuyển sinh hoạt vĩnh viễn</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Họ tên</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <TextField fullWidth size="small" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Quê quán</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <TextField fullWidth size="small" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Dân tộc</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <TextField fullWidth size="small" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Tôn giáo</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <TextField type="date" fullWidth size="small" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid className={classes.inputItem} xs={4} container item alignItems="center">
                            <Grid xs={5}>
                                <Typography>Giới tính</Typography>
                            </Grid>
                            <Grid xs={7}>
                                <MySelect
                                    onChange={handleChangeGender}
                                    value={gender}
                                >
                                    <MenuItem value="2">Tất cả</MenuItem>
                                    <MenuItem value="male">Nam</MenuItem>
                                    <MenuItem value="female">Nữ</MenuItem>
                                </MySelect>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <MyButton primary >Xem</MyButton>
                <div className={`${classes.table} ag-theme-alpine`}>
                    <AgGridReact
                        gridOptions={gridOptions}
                    />
                </div>
            </Layout>
        </>
    );
};

export default Search;