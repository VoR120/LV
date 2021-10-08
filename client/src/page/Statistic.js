import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
import PaperStatistic from '../component/PaperStatistic';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    paperStatistic: {
        padding: '8px',
        margin: '0 8px',
    },
    paperWrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}))

const Statistic = () => {
    const classes = useStyles();
    const [categoryField, setCategoryField] = useState("chibo");

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
                        Báo cáo - thống kê
                    </Typography>
                </div>
                <Accordion
                    variant="outlined"
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Thống kê</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.paperWrapper}>
                            <PaperStatistic title={"Giới tính"} data={genderS} />
                            <PaperStatistic title={"Chi bộ"} data={partyCellS} />
                            <PaperStatistic title={"Dân tộc"} data={ethnicS} />
                            <PaperStatistic title={"Độ tuổi"} data={ageS} />
                            <PaperStatistic title={"Độ tuổi"} data={ageS} />
                            <PaperStatistic title={"Độ tuổi"} data={ageS} />
                            <PaperStatistic title={"Độ tuổi"} data={ageS} />
                            <PaperStatistic title={"Độ tuổi"} data={ageS} />
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Paper variant="outlined" className={classes.paper}>
                    <Typography className={classes.inputSelect}>Loại báo cáo</Typography>
                    <MySelect
                        onChange={handleChangeField}
                        value={categoryField}
                        autowidth
                    >
                        <MenuItem value="chibo">Chi bộ</MenuItem>
                        <MenuItem value="loaidv">Loại Đảng viên</MenuItem>
                        <MenuItem value="capbac">Cấp bậc</MenuItem>
                        <MenuItem value="tuoi">Tuổi</MenuItem>
                        <MenuItem value="khenthuong">Khen thưởng</MenuItem>
                        <MenuItem value="kyluat">Kỷ luật</MenuItem>
                    </MySelect>
                    <MySelect
                        style={{ marginLeft: '16px' }}
                        value={"sv"}
                        autowidth
                    >
                        <MenuItem value="sv">Sinh viên</MenuItem>
                        <MenuItem value="dv">Đảng viên</MenuItem>
                    </MySelect>
                </Paper>
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

export default Statistic;