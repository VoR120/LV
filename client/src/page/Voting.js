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
    Chip,
    Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Bar } from "react-chartjs-2";
import { checkIsVoted, getAllPoll, getResult, getVotes, vote } from '../action/votingAction';
import Layout from '../component/Layout';
import MyButton from '../component/UI/MyButton';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { getDateStatus, getLocaleDateTime, getStatus } from '../utils/utils';
import image from '../public/image/not_found.webp'
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
    title: {
        marginBottom: '14px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    },
    votedBtn: {
        cursor: "default",
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
    // checkbox: {
    //     color: 'green !important',
    // }
}))

const Voting = () => {
    const classes = useStyles();
    const { loadingDispatch } = useContext(LoadingContext)
    const { info } = useContext(InfoContext);
    const [pollArr, setPollArr] = useState([]);
    const DePer = info.info.Quyen["12"];
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

    const fetchAllPoll = async () => {
        const res = DePer
            ? await getAllPoll()
            : await getAllPoll({ MaSoDangVien: info.info.MaSoDangVien });
        if (res) {
            setPollArr(res);
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
    }

    useEffect(() => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        fetchAllPoll();
    }, [])

    const handleToggle = (data, index) => {
        setEditOpen([]);
        setResultState(data);
        setIndexForm(index)
        let newOpen = [];
        newOpen[index] = !open[index]
        setOpen(newOpen);
    }
    const checkOpen = (index) => {
        return (open.length > 0 && index == indexForm) ? !open.every(el => el == false) : false
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
            loadingDispatch({ type: 'CLOSE_LOADING' })
        }
        if (resultState) {
            loadingDispatch({ type: 'OPEN_LOADING' })
            getResultAPI()
            getVotesAPI()
        }
    }, [resultState])


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

        const [rowsVote, setRowsVote] = useState([])

        const [columnsVote, setColumnsVote] = useState([])

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

                        options={{
                            sorting: false,
                            search: false,
                            paging: false,
                            padding: 'dense',
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
            </Paper >
        )
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Bi???u quy???t
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
                                            <VotingForm data={el} />
                                            {
                                                getStatus(el.ThoiGianBatDau, el.ThoiGianKetThuc) == 2 &&
                                                <MyButton onClick={() => handleToggle(el, index)} primary sx={{ marginLeft: 1 }}>
                                                    {open[index] ? '???n' : 'Xem k???t qu???'}
                                                </MyButton>

                                            }
                                        </Grid>
                                    </Paper>
                                </Grid>
                                {checkOpen(index) &&
                                    <Grid item xs={12}>
                                        <VotingResultForm />
                                    </Grid>
                                }
                            </React.Fragment>
                        )
                        :
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "calc( 50% + 127px )",
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                p: '30px 80px'
                            }}
                        >
                            <img src={image} alt="not-found"></img>
                            <Typography>Kh??ng c?? cu???c bi???u quy???t n??o</Typography>
                        </div>
                    }
                </Grid>
            </Layout>
        </>
    );
};

const VotingForm = ({ data }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const [checkedValues, setCheckedValues] = useState([]);
    const { openSnackbarDispatch } = useContext(SnackbarContext)
    const { info } = useContext(InfoContext);
    const [isVoted, setIsVoted] = useState(false);
    const [check, setCheck] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const { control, getValues, setValue, register } = useForm();

    function handleSelect(e, checkedName) {
        const newNames = checkedValues?.includes(checkedName)
            ? checkedValues?.filter(name => name !== checkedName)
            : [...(checkedValues ?? []), checkedName];
        setCheckedValues(newNames);

        return newNames;
    }

    function handleRadioSelect(e) {
        const name = e.target.value.split("=")[0]
        const value = e.target.value.split("=")[1]
        setCheck(check.includes(name) ? check : [...check, name])
        let newNames = [];
        if (checkedValues?.includes(name)) {
            if (value == 0)
                newNames = checkedValues?.filter(n => n != name)
            else
                newNames = [...checkedValues]
        } else
            if (value == 0)
                newNames = [...checkedValues]
            else
                newNames = [...(checkedValues ?? []), name]

        // const newNames = (checkedValues?.includes(name) || value == 0)
        //     ? checkedValues?.filter(n => n != name)
        //     : [...(checkedValues ?? []), name];
        setCheckedValues(newNames);

    }

    const handleSubmit = async () => {
        if (checkedValues.length > data.SoPhieuToiDa && data.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??") {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `???????c ch???n nhi???u nh???t ${data.SoPhieuToiDa} ???ng c??? vi??n`,
                    type: "error"
                }
            })
        }
        else if (checkedValues.length == 0 && data.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??") {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `Ph???i ch???n ??t nh???t 1 ???ng c??? vi??n`,
                    type: "error"
                }
            })
        } else if (check.length < data.UngCuVien.length && data.LoaiBieuQuyet == "Bi???u quy???t t??n nhi???m") {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: `Ph???i ch???n t??n nhi???m ho???c kh??ng`,
                    type: "error"
                }
            })
        } else {
            const candidateArr = {};
            data.UngCuVien.map(el => {
                if (checkedValues.includes(el.MaUngCuVien))
                    candidateArr[el.MaUngCuVien] = 1
                else
                    candidateArr[el.MaUngCuVien] = 0
            })
            const votes = {
                MaBieuQuyet: data.MaBieuQuyet,
                MaNguoiThamGia: info.info.MaSoDangVien,
                UngCuVien: candidateArr,
            }
            const res = await vote(votes)
            if (res) {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: res.msg,
                        type: "success"
                    }
                })
                fetchCheck();
            }
            setOpen(false);
        }
    }

    const fetchCheck = async () => {
        const res = await checkIsVoted({
            MaBieuQuyet: data.MaBieuQuyet,
            MaNguoiThamGia: info.info.MaSoDangVien,
        });
        if (res) {
            console.log(res);
            setIsVoted(res.isVoted);
            if (res.isVoted) {
                setCheckedValues(Object.keys(res.Phieu).map(el => {
                    if (res.Phieu[el] == 1)
                        return el
                }))
                setCheck(Object.keys(res.Phieu))
            }
        }
    }

    useEffect(() => {
        fetchCheck();
    }, [])

    useEffect(() => {
        console.log("Check: ", check);
    }, [check])

    useEffect(() => {
        console.log("CheckArr: ", checkedValues);
    }, [checkedValues])

    return (
        <>
            {isVoted ?
                <>
                    <Button disableRipple disableElevation className={classes.votedBtn} variant="contained" color="success">???? bi???u quy???t</Button>
                    <Button onClick={handleOpen} sx={{ marginLeft: 1 }} variant="outlined">Xem</Button>
                </>
                :
                <MyButton
                    disabled={getStatus(data.ThoiGianBatDau, data.ThoiGianKetThuc) != 1}
                    onClick={handleOpen}
                    primary>
                    Bi???u quy???t
                </MyButton>
            }
            {/* {
                getStatus(data.ThoiGianBatDau, data.ThoiGianKetThuc) == 2 &&
                <MyButton onClick={() => handleToggle(el, index)} primary style={{ marginBottom: '20px', marginLeft: "8px" }}>
                    {open[index] ? '???n' : 'Xem k???t qu???'}
                </MyButton>

            } */}
            <Dialog PaperProps={{ style: { minWidth: "700px" } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Bi???u quy???t</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography className={classes.title} alignItems="center" variant="h5">
                        {data.TenBieuQuyet}
                    </Typography>
                    <Typography marginBottom="8px">
                        Th???i gian: <b>{getLocaleDateTime(data.ThoiGianBatDau)} - {getLocaleDateTime(data.ThoiGianKetThuc)}</b>
                    </Typography>
                    {
                        data.LoaiBieuQuyet == "Bi???u quy???t c?? s??? d??" ?
                            <>
                                <Typography marginBottom="8px">
                                    Lo???i bi???u quy???t: Bi???u quy???t c?? s??? d??
                                </Typography>
                                <Typography marginBottom="8px">
                                    S??? phi???u t???i ??a: <b>{data.SoPhieuToiDa}</b>
                                </Typography>
                                <FormGroup>
                                    {data.UngCuVien.map(el =>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="names"
                                                    render={({ props }) => {
                                                        return (
                                                            <Checkbox
                                                                sx={{
                                                                    '&.Mui-disabled': {
                                                                        pointerEvents: 'auto',
                                                                        cursor: 'not-allowed',
                                                                        '&:hover': {
                                                                            backgroundColor: 'transparent',
                                                                        },
                                                                        color: 'green !important',
                                                                        '& .MuiSvgIcon-root': {
                                                                            backgroundColor: '#eee',
                                                                        },
                                                                    },
                                                                }}
                                                                disabled={isVoted}
                                                                checked={checkedValues.includes(el.MaUngCuVien)}
                                                                onChange={(e) => handleSelect(e, el.MaUngCuVien)}
                                                            />
                                                        );
                                                    }}
                                                    control={control}
                                                />
                                            }
                                            key={el.MaUngCuVien}
                                            label={el.HoTen + " - " + el.MaUngCuVien}
                                        />
                                    )}
                                </FormGroup>
                            </>
                            :
                            <>
                                <Typography marginBottom="8px">
                                    Lo???i bi???u quy???t: {data.LoaiBieuQuyet}
                                </Typography>
                                <TableContainer variant="outlined" component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ width: '50%' }}>???ng c??? vi??n</TableCell>
                                                <TableCell align='center' sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                                                    <Typography>T??n nhi???m</Typography>
                                                    <Typography>Kh??ng t??n nhi???m</Typography>
                                                </TableCell>
                                                {/* <TableCell align='center' sx={{ width: '25%' }}>Kh??ng t??n nhi???m</TableCell> */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.UngCuVien.map(el =>
                                                <TableRow
                                                    key={el.MaUngCuVien}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>
                                                        {el.HoTen + " - " + el.MaUngCuVien}
                                                    </TableCell>
                                                    {/* <FormControlLabel
                                                            control={ */}
                                                    <Controller
                                                        name="names"
                                                        render={({ props }) => {
                                                            return (
                                                                <RadioGroup
                                                                    value={
                                                                        (check.length > 0 && check.includes(el.MaUngCuVien)) ?
                                                                            checkedValues.includes(el.MaUngCuVien)
                                                                                ? el.MaUngCuVien + "=1"
                                                                                : el.MaUngCuVien + "=0"
                                                                            :
                                                                            ""
                                                                    }
                                                                    onChange={handleRadioSelect}
                                                                >
                                                                    <TableCell align='center'>
                                                                        <FormControlLabel
                                                                            value={el.MaUngCuVien + "=1"}
                                                                            control={<Radio sx={{
                                                                                m: '0 50px',
                                                                                '&.Mui-disabled': {
                                                                                    pointerEvents: 'auto',
                                                                                    cursor: 'not-allowed',
                                                                                    '&:hover': {
                                                                                        backgroundColor: 'transparent',
                                                                                    },
                                                                                    color: 'green !important',
                                                                                },
                                                                            }} />}
                                                                            label=""
                                                                            disabled={isVoted}
                                                                        />
                                                                        <FormControlLabel
                                                                            value={el.MaUngCuVien + "=0"}
                                                                            control={<Radio sx={{
                                                                                m: '0 50px',
                                                                                '&.Mui-disabled': {
                                                                                    pointerEvents: 'auto',
                                                                                    cursor: 'not-allowed',
                                                                                    '&:hover': {
                                                                                        backgroundColor: 'transparent',
                                                                                    },
                                                                                    color: 'green !important',
                                                                                },
                                                                            }} />}
                                                                            label=""
                                                                            disabled={isVoted}
                                                                        />
                                                                    </TableCell>
                                                                </RadioGroup>
                                                            );
                                                        }}
                                                        control={control}
                                                    //     />
                                                    // }
                                                    />
                                                </TableRow>
                                            )}


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                    }

                </DialogContent>
                <DialogActions>
                    {
                        isVoted ?
                            <Button onClick={handleClose} >
                                Tho??t
                            </Button>
                            :
                            <>
                                <Button onClick={handleClose} >
                                    H???y
                                </Button>
                                <MyButton onClick={handleSubmit} success>
                                    ?????ng ??
                                </MyButton>
                            </>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Voting;