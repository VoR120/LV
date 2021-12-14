import MaterialTable from '@material-table/core';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Checkbox, FormControlLabel, Grid, Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { getAllCategoryPM } from '../action/categoryAction';
import { filterPartyMember, getAllPartyMember, mailing, removePartyMember } from '../action/partyMemberAction';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { PartyMemberContext } from '../contextAPI/PartyMemberContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { partyMemberPDF } from '../utils/pdf';
import { allInfoColumn, fileColumn, getExportData, pdfmakedownload } from '../utils/utils';
import RedoIcon from '@mui/icons-material/Redo';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoveForm from '../component/MoveForm';
import RewardDisciplineForm from '../component/RewardDisciplineForm';
import DeleteForm from '../component/DeleteForm';


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
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const { loadingDispatch } = useContext(LoadingContext);
    const { info } = useContext(InfoContext);
    const [status, setStatus] = useState({ all: false, living: true, moving: false });
    const [loading, setLoading] = useState(false)
    const [dataSelect, setDataSelect] = useState([]);
    const [moveForm, setMoveForm] = useState(false);
    const [rewardForm, setRewardForm] = useState(false);
    const [disciplineForm, setDisciplineForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);

    const [rows, setRows] = useState([])

    const handleClick = (e) => {
        const name = e.target.name
        console.log(name);
        const newStatus = { all: false, living: false, moving: false }
        setStatus({ ...newStatus, [name]: true })
    }

    const handleMailing = (e, email) => {
        const fetchMail = async () => {
            loadingDispatch({ type: 'OPEN_LOADING' })
            let mailList = typeof email == "string" ? new Array(email) : email;
            const res = await mailing(mailList)
            if (res.error) {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: res.error.message,
                        type: "error"
                    }
                })
            } else {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: res.msg,
                        type: "success"
                    }
                })
                setRows(rows.map(el => mailList.includes(el.Email) ? { ...el, DaXacNhan: 1 } : el))
            }
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
        fetchMail();
    }

    const handleRemove = async (e, id) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        const idArr = typeof id == "object" ? id : new Array(id)
        const res = await removePartyMember({ id: idArr })
        if (res.error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã xảy ra lỗi!",
                    type: "error"
                }
            })
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
            setRows(rows.filter(el => !idArr.includes(el.MaSoDangVien)))
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

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

    const fetch = () => {
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
    }


    const [columns, setColumns] = useState(fileColumn(rows, setRows, handleMailing, handleRemove, fetch))

    const data = getExportData(rows, columns)

    const handleExportPDF = () => {
        const dd = partyMemberPDF(rows);
        pdfmakedownload(dd);
    }
    useEffect(() => {
        setColumns(fileColumn(rows, setRows, handleMailing, handleRemove, fetch));
    }, [rows])

    useEffect(() => {
        getAllCategoryPM(categoryDispatch);
        info.info.Quyen["12"] == 1
            ? fetchAPI({ status: 1 })
            : fetchAPI({ status: 1, partycell: info.info.MaChiBo });
    }, [])

    useEffect(() => {
        fetch()
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
                        {data.data.length > 0 &&
                            <>
                                <CSVLink data={data.data} headers={data.headers} filename={"export.csv"}>
                                    <MyButton style={{ marginLeft: 8 }} success>
                                        <FileDownloadIcon style={{ marginRight: 4 }} />Excel
                                    </MyButton>
                                </CSVLink>
                                <MyButton onClick={handleExportPDF} sx={{ ml: 1, backgroundColor: "#e95340", '&:hover': { backgroundColor: '#e95340' } }}>
                                    <FileDownloadIcon sx={{ mr: 0.5 }} />pdf
                                </MyButton>
                            </>
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
                        actions={[
                            {
                                // isFreeAction: true,
                                icon: () => <RedoIcon color='info' />,
                                tooltip: 'Chuyển sinh hoạt',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setMoveForm(true)
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: () => <ThumbUpAltIcon color='info' />,
                                tooltip: 'Khen thưởng',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setRewardForm(true)
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: () => <ThumbDownAltIcon color='info' />,
                                tooltip: 'Kỷ luật',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setDisciplineForm(true)
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: 'mail',
                                iconProps: { color: 'warning' },
                                tooltip: 'Kích hoạt (chỉ gửi đến những email chưa kích hoạt)',
                                onClick: (event, rowData) => {
                                    handleMailing(event, rowData.map(el => el.Email))
                                },
                            },
                            {
                                // isFreeAction: true,
                                icon: 'delete',
                                iconProps: { color: 'error' },
                                tooltip: 'Xóa',
                                onClick: (event, rowData) => {
                                    setDataSelect(rowData)
                                    setDeleteForm(true)
                                },
                            },
                        ]}
                        options={{
                            padding: 'dense',
                            selection: true,
                            search: true,
                        }}
                        isLoading={partyMember.loading || loading}
                    />
                </TableContainer>
                {moveForm &&
                    <MoveForm openForm={moveForm} setOpenForm={setMoveForm} dataSelect={dataSelect} fetch={fetch} />
                }
                {(rewardForm || disciplineForm) &&
                    <RewardDisciplineForm
                        openForm={rewardForm || disciplineForm}
                        setOpenForm={setRewardForm || setDisciplineForm}
                        dataSelect={dataSelect}
                        reward={rewardForm}
                    />
                }
                {deleteForm &&
                    <DeleteForm
                        noBtn
                        openForm={deleteForm}
                        setOpenForm={setDeleteForm}
                        handleSubmit={e => handleRemove(e, dataSelect.map(el => el.MaSoDangVien))}
                        content={`Bạn có muốn xóa những Đảng viên này?`}
                    />
                }
            </Layout>
        </>
    );
};

export default File;