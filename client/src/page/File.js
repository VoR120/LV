import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import { Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { getAllCategory } from '../action/categoryAction';
import { getAllPartyMember } from '../action/partyMemberAction';
import AddForm from '../component/AddForm';
import CustomizedSnackbars from '../component/CustomizedSnackbars';
import Layout from '../component/Layout';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { allInfoColumn, downloadExcel } from '../utils/utils';


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
    const [rows, setRows] = useState([])

    const [columns] = useState(allInfoColumn)

    useEffect(() => {
        getAllCategory(categoryDispatch, "ethnic")
        getAllCategory(categoryDispatch, "religion")
        getAllCategory(categoryDispatch, "partycell")
        getAllCategory(categoryDispatch, "position")
        getAllCategory(categoryDispatch, "flanguage");
        getAllCategory(categoryDispatch, "flanguagelevel");
        getAllCategory(categoryDispatch, "politics");
        getAllCategory(categoryDispatch, "it");
        getAllCategory(categoryDispatch, "grade");
        if (partyMember.partyMembers.length == 0)
            getAllPartyMember(partyMemberDispatch);
    }, [])

    useEffect(() => {
        setRows(partyMember.partyMembers)
    }, [partyMember])

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Hồ sơ Đảng viên
                    </Typography>
                </div>
                <AddForm data={rows} />
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
                        title={"Hồ sơ Đảng viên"}
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
                        isLoading={partyMember.loading}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default File;