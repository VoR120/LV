import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    MenuItem,
    Chip,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import InputGrid from '../component/InputGrid';
import { useHistory } from 'react-router';
import { CategoryContext } from '../contextAPI/CategoryContext';
import AddCandidateForm from '../component/AddCandidateForm';
import AddVoterForm from '../component/AddVoterForm';
import DeleteVotingForm from '../component/DeleteVotingForm';
import { getAllPoll, getNoVoting, getResult, getVotes, mailing, updatePoll } from '../action/votingAction';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { getDateStatus, getDateTime, getLocaleDateTime, getStatus, getExportData, pdfmakedownload } from '../utils/utils';
import { getAllCategory } from '../action/categoryAction';
import MaterialTable from '@material-table/core';
import SaveResult from '../component/SaveResult';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import DoneIcon from '@mui/icons-material/Done';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from 'react-csv';
import { votingResultConfidencePDF, votingResultPDF } from '../utils/pdf';
import DoughnutChart from '../component/DoughnutChart';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
        marginTop: '20px',
        // width: 'fit-content'
    },
    paperForm: {
        padding: '16px',
        marginBottom: '16px',
        marginTop: '20px',
        width: '900px',
        margin: '0 auto'
    },
    title: {
        marginBottom: '14px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    },
    table: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px',
    },
}))

const Voting = () => {
    const classes = useStyles();
    const history = useHistory();
    const [candidate, setCandidate] = useState([]);
    const [voter, setVoter] = useState([]);
    const [pollArr, setPollArr] = useState([]);
    const { loadingDispatch } = useContext(LoadingContext)
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const [open, setOpen] = useState([]);
    const [editOpen, setEditOpen] = useState([]);
    const [editState, setEditState] = useState(null);
    const [resultState, setResultState] = useState(null);
    const [label, setLabel] = useState([])
    const [quantity, setQuantity] = useState([]);
    const [quantityCurrent, setQuantityCurrent] = useState([]);
    const [quantityPer, setQuantityPer] = useState("")
    const [resultVoting, setResultVoting] = useState([])
    const [votesList, setVotesList] = useState([]);
    const [noVotingList, setNoVotingList] = useState([]);
    const [indexForm, setIndexForm] = useState("")
    const [type, setType] = useState("Bi???u quy???t c?? s??? d??");

    const {
        handleSubmit,
        control,
        setValue,
        setError,
        clearErrors,
        getValues,
        watch,
        formState: { errors }
    } = useForm();

    const ThoiGianBatDau = useRef({});
    ThoiGianBatDau.current = watch("ThoiGianBatDau", "");
    const SoPhut = useRef({});
    SoPhut.current = watch("ThoiGianNhacNho", 0)

    const handleChangeSelect = (e) => {
        if (e.target.value != 0) {
            clearErrors(e.target.name)
        }
        setValue(e.target.name, e.target.value)
    }

    const handleChangeType = (e) => {
        setValue(e.target.name, e.target.value)
        setType(e.target.value);
    }

    const handleToggle = (data, index) => {
        setEditOpen([]);
        setResultState(data);
        setIndexForm(index)
        let newOpen = [];
        newOpen[index] = !open[index]
        setOpen(newOpen);
    }

    const handleEditToggle = (data, index) => {
        setOpen([])
        setEditState(data);
        setIndexForm(index)
        let newEdit = [];
        newEdit[index] = !editOpen[index]
        setEditOpen(newEdit);
    }

    const fetchAllPoll = async () => {
        const res = await getAllPoll();
        if (res) {
            setPollArr(res);
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
    }

    useEffect(() => {
        const getResultAPI = async () => {
            const res = await getResult({ id: resultState.MaBieuQuyet })
            console.log(res);
            setResultVoting(res.Data)
            setLabel(res.Data.map(el => `${el.MaSoDangVien} - ${el.HoTen}`));
            setQuantity(res.Data.map(el => el.SoPhieu));
            setQuantityPer(res.SoLuongBieuQuyet + "/" + res.SoLuong)
            setQuantityCurrent(res.SoLuongBieuQuyet)
        }
        const getVotesAPI = async () => {
            const res = await getVotes({ id: resultState.MaBieuQuyet })
            console.log(res);
            setVotesList(res);
        }
        const getNoVotingAPI = async () => {
            const res = await getNoVoting({ id: resultState.MaBieuQuyet })
            console.log(res);
            setNoVotingList(res)
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
        if (resultState) {
            loadingDispatch({ type: 'OPEN_LOADING' })
            getResultAPI()
            getVotesAPI()
            getNoVotingAPI()
        }
    }, [resultState])

    const onSubmit = async (data) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        data.UngCuVien = candidate.map(el => el.MaUngCuVien);
        data.NguoiThamGia = voter.map(el => el.MaNguoiThamGia);
        const res = await updatePoll(data);
        if (res.error) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.error.msg,
                    type: "error"
                }
            })
        } else {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "???? c???p nh???t!",
                    type: "success"
                }
            })
            fetchAllPoll();
        }

        loadingDispatch({ type: 'CLOSE_LOADING' })
        setEditOpen([]);
    }

    const handleSendEmail = async (id) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        const res = await mailing({ id });
        if (res) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.msg,
                    type: "success"
                }
            })
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

    useEffect(() => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        fetchAllPoll();
    }, [])

    useEffect(() => {
        if (editState != null) {
            setValue("MaBieuQuyet", editState.MaBieuQuyet);
            setValue("MucDich", editState.MucDich);
            setValue("TenBieuQuyet", editState.TenBieuQuyet);
            setValue("ThoiGianNhacNho", editState.ThoiGianNhacNho);
            setValue("PhamVi", editState.PhamVi);
            setValue("LoaiBieuQuyet", editState.LoaiBieuQuyet);
            setType(editState.LoaiBieuQuyet);
            setValue("SoPhieuToiDa", editState.SoPhieuToiDa);
            setValue("ThoiGianBatDau", getDateTime(editState.ThoiGianBatDau))
            setValue("ThoiGianKetThuc", getDateTime(editState.ThoiGianKetThuc))
            setCandidate(editState.UngCuVien);
            setVoter(editState.NguoiThamGia)
        }
    }, [editState])

    useEffect(() => {
        getAllCategory(categoryDispatch, "partycell");
        getAllCategory(categoryDispatch, "position");
        getAllCategory(categoryDispatch, "grade");
    }, [])

    const VotingResultForm = () => {

        const [openResult, setOpenResult] = useState(false);
        const [data, setData] = useState([]);

        const getRate = (all, quan) => {
            return `${+(quan / all * 100).toFixed(2)}%`;
        }

        const columns = resultState.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??"
            ? [
                { title: "M?? s??? ?????ng vi??n", field: "MaSoDangVien", },
                { title: "H??? t??n", field: "HoTen", },
                { title: "S??? phi???u", field: "SoPhieu", },
                { title: "T??? l??? phi???u", field: "TiLe", },
            ]
            : [
                { title: "M?? s??? ?????ng vi??n", field: "MaSoDangVien", },
                { title: "H??? t??n", field: "HoTen", },
                { title: "S??? phi???u t??n nhi???m", field: "SoPhieuTinNhiem", },
                { title: "S??? phi???u kh??ng t??n nhi???m", field: "SoPhieuKhongTinNhiem", },
                { title: "T??? l??? phi???u t??n nhi???m", field: "TiLeTinNhiem", },
                { title: "T??? l??? phi???u kh??ng t??n nhi???m", field: "TiLeKhongTinNhiem", },
            ]

        const [rows, setRows] = useState(
            resultState.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??" ?
                resultVoting.map((el, index) => ({
                    id: index,
                    HoTen: el.HoTen,
                    MaSoDangVien: el.MaSoDangVien,
                    SoPhieu: el.SoPhieu,
                    TiLe: getRate(resultVoting.reduce((a, b) => a + b.SoPhieu, 0), el.SoPhieu)
                }))
                :
                resultVoting.map((el, index) => ({
                    id: index,
                    HoTen: el.HoTen,
                    MaSoDangVien: el.MaSoDangVien,
                    SoPhieuTinNhiem: el.SoPhieu,
                    SoPhieuKhongTinNhiem: quantityCurrent - el.SoPhieu,
                    TiLeTinNhiem: getRate(quantityCurrent, el.SoPhieu),
                    TiLeKhongTinNhiem: getRate(quantityCurrent, quantityCurrent - el.SoPhieu)
                }))
        );

        const [columnsVote, setColumnsVote] = useState([])

        const [rowsVote, setRowsVote] = useState([])

        const [columnsNoVote, setColumnsNoVote] = useState([
            { title: "STT", field: "id", width: 50 },
            { title: "M?? s??? ?????ng vi??n", field: "MaSoDangVien" },
            { title: "H??? t??n", field: "HoTen" },
            { title: "Email", field: "Email" },
            { title: "S??? ??i???n tho???i", field: "SoDienThoai" },
        ])

        const [rowsNoVote, setRowsNoVote] = useState([])

        const dataResult = useMemo(() => getExportData(rows, columns))

        const handleExportPDF = () => {
            let dd = resultState.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??"
                ? votingResultPDF(rows, resultState, rowsNoVote.length)
                : votingResultConfidencePDF(rows, resultState, rowsNoVote.length)
            pdfmakedownload(dd);
        }

        useEffect(() => {
            let column = [{ title: "S??? phi???u", field: "id", width: 50 }];
            resultVoting.map((el, index) => {
                column.push({
                    title: el.MaSoDangVien + " - " + el.HoTen,
                    field: el.MaSoDangVien,
                    align: 'center',
                    render: (params) => params[el.MaSoDangVien]
                        ? <HowToVoteIcon sx={{ width: '100%' }} color="success" />
                        : ""
                })
            })
            setColumnsVote(column)
            setRowsVote(votesList.map((el, index) => {
                let item = { id: index + 1 };
                Object.keys(el).map((i, index) => { item[i] = el[i] });
                return item
            }))
        }, [votesList])

        useEffect(() => {
            setRowsNoVote(noVotingList.map((el, index) => ({
                id: index + 1,
                MaSoDangVien: el.MaNguoiThamGia,
                HoTen: el.HoTen,
                Email: el.Email,
                SoDienThoai: el.SoDienThoai
            })));
        }, [noVotingList])

        return (
            <Paper className={classes.paper} variant="outlined">
                <Typography textAlign="center" style={{ marginBottom: '40px' }} variant="h5">
                    {resultState.TenBieuQuyet}
                </Typography>
                <Typography marginBottom="8px">Th???i gian: <b>{getLocaleDateTime(resultState.ThoiGianBatDau)} - {getLocaleDateTime(resultState.ThoiGianKetThuc)}</b></Typography>
                <Typography marginBottom="8px">H??nh th???c bi???u quy???t: <b>{resultState.LoaiBieuQuyet}</b></Typography>
                {resultState.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??" &&
                    <Typography marginBottom="8px">S??? phi???u t???i ??a: <b>{resultState.SoPhieuToiDa}</b></Typography>
                }
                <Typography marginBottom="8px">S??? ng?????i bi???u quy???t: <b>{quantityPer}</b></Typography>
                {
                    resultState.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??"
                        ?
                        <Bar
                            width="500px"
                            data={{
                                labels: label
                                ,
                                datasets: [
                                    {
                                        label: "S??? phi???u",
                                        backgroundColor: [
                                            "#EF5350",
                                            "#42A5F5",
                                            "#FFEE58",
                                            "#EC407A",
                                            "#7E57C2",
                                            "#66BB6A",
                                            "#26A69A",
                                            "#78909C",
                                            "#AB47BC",
                                            "#9CCC65",
                                            "#FFA726",
                                            "#5C6BC0",
                                            "#8D6E63",
                                        ],
                                        data: quantity
                                    }
                                ]
                            }}
                            options={{
                                legend: { display: true },
                                title: {
                                    display: true,
                                    text: "Predicted world population (millions) in 2050"
                                },
                            }}
                        />
                        :
                        <Grid container spacing={2}>
                            {resultVoting.map(el =>
                                <Grid item xs={3} key={el.MaSoDangVien}>
                                    <DoughnutChart
                                        label={el.HoTen + " - " + el.MaSoDangVien}
                                        data={[
                                            { label: "T??n nhi???m", quantity: el.SoPhieu },
                                            { label: "Kh??ng t??n nhi???m", quantity: quantityCurrent - el.SoPhieu },
                                        ]}
                                        twoColor
                                    />
                                </Grid>
                            )}
                        </Grid>
                }

                <TableContainer sx={{ width: '1000px', margin: '0 auto', mt: 5, mb: 5 }} variant="outlined">
                    {dataResult.data.length > 0 &&
                        <>
                            <CSVLink data={dataResult.data} headers={dataResult.headers} filename={`${resultState.TenBieuQuyet}.csv`}>
                                <MyButton style={{ marginLeft: 8 }} success>
                                    <FileDownloadIcon style={{ marginRight: 4 }} />Excel
                                </MyButton>
                            </CSVLink>
                            <MyButton onClick={handleExportPDF} sx={{ ml: 1, backgroundColor: "#e95340", '&:hover': { backgroundColor: '#e95340' } }}>
                                <FileDownloadIcon sx={{ mr: 0.5 }} />pdf
                            </MyButton>
                        </>
                    }
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={
                            <Grid container alignItems="center">
                                <Typography variant="button">B???ng k???t qu???</Typography>
                                {
                                    resultState.LuuKetQua == 1 &&
                                    <Chip
                                        sx={{ marginLeft: 3 }}
                                        size="small"
                                        varian="outlined"
                                        color="success"
                                        label={"???? l??u"}
                                        icon={<DoneIcon />}
                                    />
                                }
                            </Grid>
                        }
                        columns={columns}
                        data={rows}

                        actions={[
                            (resultState.LuuKetQua == 0 && resultState.MucDich != "Kh??c") &&
                            {
                                // isFreeAction: true,
                                icon: 'save',
                                tooltip: 'L??u',
                                onClick: (event, rowData) => {
                                    setData(rowData);
                                    setOpenResult(true)
                                },
                            },
                        ]}

                        options={{
                            sorting: false,
                            search: false,
                            paging: false,
                            padding: 'dense',
                            selection: resultState.LuuKetQua == 0 && resultState.MucDich != "Kh??c"
                        }}
                    />
                </TableContainer>
                <SaveResult
                    open={openResult}
                    setOpen={setOpenResult}
                    data={data}
                    resultState={resultState}
                    setResultState={setResultState}
                />
                {resultState.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??" &&
                    <TableContainer sx={{ width: '1000px', margin: '0 auto', mb: 5 }} variant="outlined">
                        <MaterialTable
                            components={{
                                Container: (props) =>
                                    <Paper
                                        {...props}
                                        className={classes.table}
                                        variant="outlined"
                                    />
                            }}
                            title={<Typography variant="button">B???ng th???ng k?? phi???u</Typography>}
                            columns={columnsVote}
                            data={rowsVote}

                            options={{
                                sorting: false,
                                search: false,
                                paging: false,
                                padding: 'dense',
                            }}
                        />
                    </TableContainer>
                }

                <TableContainer sx={{ width: '1000px', margin: '0 auto', mb: 5 }} variant="outlined">
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={"B???ng li???t k?? ?????ng vi??n kh??ng bi???u quy???t"}
                        columns={columnsNoVote}
                        data={rowsNoVote}

                        options={{
                            sorting: false,
                            search: false,
                            paging: false,
                            padding: 'dense',
                        }}
                    />
                </TableContainer>
            </Paper >
        )
    }

    const checkEditOpen = (index) => {
        return (editOpen.length > 0 && index == indexForm) ? !editOpen.every(el => el == false) : false
    }
    const checkOpen = (index) => {
        return (open.length > 0 && index == indexForm) ? !open.every(el => el == false) : false
    }
    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Qu???n l?? Bi???u quy???t
                    </Typography>
                </div>
                <Grid style={{ width: '100%' }} container spacing={2}>
                    {pollArr.length > 0 ?
                        pollArr.map((el, index) =>
                            <React.Fragment key={el.MaBieuQuyet}>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper} variant="outlined">
                                        <Grid container justifyContent="space-between" marginBottom="40px">
                                            <Typography variant="button">
                                                {getLocaleDateTime(el.ThoiGianBatDau)} - {getLocaleDateTime(el.ThoiGianKetThuc)}
                                            </Typography>
                                            <Typography color="gray" variant="button">{getDateStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc)}</Typography>
                                        </Grid>
                                        <Typography textAlign="center" className={classes.title} variant="h5">
                                            {el.TenBieuQuyet}
                                        </Typography>
                                        <Typography textAlign="center" className={classes.title}>
                                            Ph???m vi: <b>{el.PhamVi}</b>
                                        </Typography>
                                        {
                                            el.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??" ?
                                                <Typography textAlign="center" className={classes.title}>
                                                    S??? phi???u t???i ??a: <b>{el.SoPhieuToiDa}</b>
                                                </Typography>
                                                :
                                                <Typography textAlign="center" className={classes.title}>
                                                    {el.LoaiBieuQuyet}
                                                </Typography>
                                        }
                                        <Grid container justifyContent="center">
                                            {getStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc) == 2 &&
                                                <MyButton onClick={() => handleToggle(el, index)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                    {open[index] ? '???n' : 'Xem k???t qu???'}
                                                </MyButton>
                                            }
                                            {/* {getStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc) == 1 &&
                                                <>
                                                    {editOpen[index] ?
                                                        <Button onClick={() => handleEditToggle(el, index)} variant='outlined' style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                            H???y
                                                        </Button>
                                                        :
                                                        <MyButton onClick={() => handleEditToggle(el, index)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                            Ch???nh s???a
                                                        </MyButton>
                                                    }
                                                </>
                                            } */}
                                            {getStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc) != 2 &&
                                                <>
                                                    {
                                                        getStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc) == 0 &&
                                                        (
                                                            editOpen[index] ?
                                                                <Button onClick={() => handleEditToggle(el, index)} variant='outlined' style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                                    H???y
                                                                </Button>
                                                                :
                                                                <MyButton onClick={() => handleEditToggle(el, index)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                                    Ch???nh s???a
                                                                </MyButton>
                                                        )
                                                    }
                                                    <MyButton onClick={() => handleSendEmail(el.MaBieuQuyet)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                                                        G???i mail
                                                    </MyButton>
                                                </>
                                            }
                                            <DeleteVotingForm data={el} fetchAllPoll={fetchAllPoll} />
                                        </Grid>

                                    </Paper>
                                </Grid>
                                {checkOpen(index) &&
                                    <Grid item xs={12}>
                                        <VotingResultForm />
                                    </Grid>
                                }
                                {checkEditOpen(index) &&
                                    <Grid item xs={12}>
                                        <Paper className={classes.paperForm} variant="outlined">
                                            <Typography style={{ textTransform: 'uppercase', marginBottom: 30 }}>Ch???nh s???a bi???u quy???t</Typography>
                                            <Grid container className={classes.inputItem} alignItems="center">
                                                <Grid item xs={4}>
                                                    <Typography>T??n bi???u quy???t</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        noTitle
                                                        name="TenBieuQuyet"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            required: "Vui l??ng nh???p tr?????ng n??y!",
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.inputItem} alignItems="center">
                                                <Grid item xs={4}>
                                                    <Typography>M???c ????ch</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        select
                                                        noTitle
                                                        onChange={handleChangeSelect}
                                                        name="MucDich"
                                                        defaultValue="0"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            validate: value =>
                                                                value != 0 || "Vui l??ng nh???p tr?????ng n??y!"
                                                        }}
                                                    >
                                                        <MenuItem value="0">Ch???n</MenuItem>
                                                        <MenuItem value="Khen th?????ng">Khen th?????ng</MenuItem>
                                                        <MenuItem value="K??? lu???t">K??? lu???t</MenuItem>
                                                        <MenuItem value="Kh??c">Kh??c</MenuItem>
                                                    </InputGrid>
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.inputItem} alignItems="center">
                                                <Grid item xs={4}>
                                                    <Typography>Lo???i bi???u quy???t</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        select
                                                        noTitle
                                                        onChange={handleChangeType}
                                                        name="LoaiBieuQuyet"
                                                        defaultValue="Bi???u quy???t c?? s??? d??"
                                                        control={control}
                                                        errors={errors}
                                                    >
                                                        <MenuItem value="Bi???u quy???t c?? s??? d??">Bi???u quy???t c?? s??? d??</MenuItem>
                                                        <MenuItem value="Bi???u quy???t t??n nhi???m">Bi???u quy???t t??n nhi???m</MenuItem>
                                                    </InputGrid>
                                                </Grid>
                                            </Grid>
                                            {
                                                type == "Bi???u quy???t c?? s??? d??" &&
                                                <Grid container className={classes.inputItem} alignItems="center" >
                                                    <Grid item xs={4}>
                                                        <Typography>S??? phi???u t???i ??a</Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <InputGrid
                                                            noTitle
                                                            type="number"
                                                            defaultValue="1"
                                                            name="SoPhieuToiDa"
                                                            control={control}
                                                            errors={errors}
                                                            InputProps={{ inputProps: { min: 1 } }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            }
                                            <Grid container className={classes.inputItem} alignItems="center">
                                                <Grid item xs={4}>
                                                    <Typography>Th???i gian b???t ?????u</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        noTitle
                                                        type="datetime-local"
                                                        name="ThoiGianBatDau"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            required: "Vui l??ng nh???p tr?????ng n??y!",
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.inputItem} alignItems="center">
                                                <Grid item xs={4}>
                                                    <Typography>Th???i gian k???t th??c</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        noTitle
                                                        type="datetime-local"
                                                        name="ThoiGianKetThuc"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            required: "Vui l??ng nh???p tr?????ng n??y!",
                                                            validate: value => {
                                                                if (new Date(value) < new Date(ThoiGianBatDau.current))
                                                                    return "Th???i gian k???t th??c ph???i l???n h??n th???i gian b???t ?????u"
                                                                if (new Date(value) < new Date())
                                                                    return "Th???i gian k???t th??c ph???i h??n th???i gian hi???n t???i"
                                                                let date = new Date(value);
                                                                date.setMinutes(date.getMinutes() - SoPhut.current);
                                                                if (date < new Date()) {
                                                                    return "???? qu?? th???i gian nh???c nh???"
                                                                }
                                                                return true
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.inputItem} alignItems="center" >
                                                <Grid item xs={4}>
                                                    <Typography>Ph???m vi</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        noTitle
                                                        name="PhamVi"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            required: "Vui l??ng nh???p tr?????ng n??y!",
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container className={classes.inputItem} alignItems="center" >
                                                <Grid item xs={4}>
                                                    <Typography>Th???i gian nh???c nh??? (ph??t)</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <InputGrid
                                                        noTitle
                                                        type="number"
                                                        InputProps={{ inputProps: { min: 10 } }}
                                                        defaultValue="10"
                                                        name="ThoiGianNhacNho"
                                                        control={control}
                                                        errors={errors}
                                                        rules={{
                                                            required: "Vui l??ng nh???p tr?????ng n??y!",
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ marginTop: '16px' }} >
                                                <Grid item xs={4}>
                                                    <Typography>???ng c??? vi??n</Typography>
                                                </Grid>
                                                <Grid item container xs={8}>
                                                    {
                                                        candidate.length > 0 &&
                                                        candidate.map(el =>
                                                            <Grid key={el.MaUngCuVien} item xs={12}>
                                                                <Chip style={{ marginBottom: '12px' }}
                                                                    size="medium"
                                                                    varian="outlined"
                                                                    label={el.HoTen + " - " + el.MaUngCuVien}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                    <Grid item xs={12}>
                                                        <AddCandidateForm setCandidate={setCandidate} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ marginTop: '16px' }} >
                                                <Grid item xs={4}>
                                                    <Typography>????n v??? tham gia</Typography>
                                                </Grid>
                                                <Grid item container xs={8}>
                                                    <Grid item xs={12}>
                                                        {
                                                            voter.length > 0 &&
                                                            voter.map(el =>
                                                                <Chip key={el.MaNguoiThamGia} style={{ marginBottom: '12px', marginRight: '4px' }}
                                                                    size="small"
                                                                    varian="outlined"
                                                                    label={el.HoTen + " - " + el.MaNguoiThamGia}
                                                                />
                                                            )
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <AddVoterForm setVoter={setVoter} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{ marginTop: '16px' }} >
                                                <Grid item xs={4}>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <MyButton onClick={handleSubmit(onSubmit)} info>L??u</MyButton>
                                                    <Button onClick={() => handleEditToggle(el, index)} variant='outlined' style={{ marginLeft: "8px" }}>
                                                        H???y
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                }
                            </React.Fragment>
                        )
                        :
                        <Typography>Kh??ng c?? cu???c bi???u quy???t n??o ??ang di???n ra</Typography>
                    }
                </Grid>
            </Layout>
        </>
    );
};

export default Voting;