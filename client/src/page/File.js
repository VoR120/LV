import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { getAllCategory, getAllCategoryPM } from '../action/categoryAction';
import { filterPartyMember, getAllPartyMember } from '../action/partyMemberAction';
import AddForm from '../component/AddForm';
import CustomizedSnackbars from '../component/CustomizedSnackbars';
import Layout from '../component/Layout';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { allInfoColumn, downloadExcel, getExportData } from '../utils/utils';
import MyButton from '../component/UI/MyButton';
import { CSVLink } from 'react-csv'
import SaveAltIcon from '@mui/icons-material/SaveAlt';


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

const File = () => {
    const classes = useStyles();

    const { partyMember, partyMemberDispatch } = useContext(PartyMemberContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { info } = useContext(InfoContext);
    const [status, setStatus] = useState({ all: false, living: true, moving: false });
    const [loading, setLoading] = useState(false)

    const [rows, setRows] = useState([])

    const handleClick = (e) => {
        const name = e.target.name
        console.log(name);
        const newStatus = { all: false, living: false, moving: false }
        setStatus({ ...newStatus, [name]: true })
    }

    const [columns, setColumns] = useState(allInfoColumn(rows, setRows))

    const data = getExportData(rows, columns)

    useEffect(() => {
        setColumns(allInfoColumn(rows, setRows));
    }, [rows])

    const fetchAPI = async (data) => {
        setLoading(true)
        const res = await filterPartyMember(data)
        setRows(res)
        setLoading(false);
    }

    const fetchAPIAll = async (data) => {
        setLoading(true);
        const res = await getAllPartyMember(data)
        setRows(res);
        setLoading(false);
    }

    useEffect(() => {
        getAllCategoryPM(categoryDispatch);
        info.info.Quyen["12"] == 1
            ? fetchAPI({ status: 1 })
            : fetchAPI({ status: 1, partycell: info.info.MaChiBo });
    }, [])

    useEffect(() => {
        console.log(status);
        if (status.all)
            info.info.Quyen["12"] == 1
                ? fetchAPIAll()
                : fetchAPIAll(info.info.MaChiBo);
        if (status.living)
            info.info.Quyen["12"] == 1
                ? fetchAPI({ status: 1 })
                : fetchAPI({ status: 1, partycell: info.info.MaChiBo });
        if (status.moving)
            info.info.Quyen["12"] == 1
                ? fetchAPI({ status: 2 })
                : fetchAPI({ status: 2, partycell: info.info.MaChiBo });
    }, [status])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Hồ sơ Đảng viên
                    </Typography>
                </div>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <AddForm rows={rows} setRows={setRows} />
                        {data.length > 0 &&
                            <CSVLink data={data} filename={"export.csv"}>
                                <MyButton style={{ marginLeft: 8 }} success>
                                    <SaveAltIcon style={{ marginRight: 4 }} />Excel
                                </MyButton>
                            </CSVLink>
                        }
                    </Grid>
                    <Grid item>
                        <FormControlLabel control={<Checkbox name="all" checked={status.all} onClick={handleClick} />} label="Tất cả" />
                        <FormControlLabel control={<Checkbox name="living" checked={status.living} onClick={handleClick} />} label="Đảng viên đang sinh hoạt" />
                        <FormControlLabel control={<Checkbox name="moving" checked={status.moving} onClick={handleClick} />} label="Đảng viên đã chuyển sinh hoạt" />
                    </Grid>
                </Grid>
                <TableContainer className="file-table" style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={"Hồ sơ Đảng viên"}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense',
                        }}
                        isLoading={partyMember.loading || loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default File;