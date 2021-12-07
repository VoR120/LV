import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, List,
    ListItem, ListItemIcon, ListItemText, MenuItem, Paper, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { filterPartyMember } from '../action/partyMemberAction';
import { getPollByTime, getResult } from '../action/votingAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import InputGrid from './InputGrid';
import MyButton from './UI/MyButton';
import MySelect from './UI/MySelect';

const useStyles = makeStyles(theme => ({
    inputItem: {
        marginBottom: theme.spacing(2),
    },
    inputWrapper: {
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: theme.palette.common.white,
        cursor: 'pointer'
    },
}))

const AddCandidateForm = (props) => {
    const classes = useStyles();
    const { setCandidate } = props;
    const [open, setOpen] = useState(false);

    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const { loadingDispatch } = useContext(LoadingContext);

    const [gradeArr, setGradeArr] = useState([])
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [fieldArr, setFieldArr] = useState([]);
    const [fieldValue, setFieldValue] = useState("0");
    const [yearGradeArr, setYearGradeArr] = useState([]);
    const [yearGrade, setYearGrade] = useState("0");
    const [pollArr, setPollArr] = useState([]);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors }
    } = useForm();

    const handleClose = () => {
        setOpen(false)
    }

    const handleAdd = () => {
        if (right.length < 2) {
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: "Phải có ít nhất 2 ứng cử viên",
                    type: "error"
                }
            })
        } else {
            setOpen(false);
            setCandidate(right.map(el => ({ HoTen: el.HoTen, MaUngCuVien: el.MaSoDangVien })))
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const onSubmit = async (data) => {
        data.grade = fieldValue;
        // setRight([]);
        loadingDispatch({ type: 'OPEN_LOADING' })
        const res = await filterPartyMember(data);
        setLeft(res)
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

    const onSubmitByPoll = async (data) => {
        loadingDispatch({ type: 'OPEN_LOADING' })
        const res = await getResult({ id: data.poll })
        if (res) {
            console.log(res.Data);
            setLeft(res.Data)
        }
        loadingDispatch({ type: 'CLOSE_LOADING' })
    }

    const handleChangeSelect = (e) => {
        setValue(e.target.name, e.target.value)
    }

    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const handleReset = () => {
        setLeft([]);
        setRight([]);
    }

    const handleChangeFieldValue = (e) => {
        setFieldValue(e.target.value)
    }

    const handleChangeYear = (e) => {
        setYearGrade(e.target.value)
        if (e.target.value == 0) {
            setFieldArr([]);
            setFieldValue(0)
        } else {
            yearGradeArr.forEach(el => {
                if (el.Nam == e.target.value) {
                    setFieldArr(el.Data);
                    setFieldValue(0)
                }
            })
        }
    }

    const handleSubmitDate = async () => {
        const TuNgay = getValues("TuNgay");
        const DenNgay = getValues("DenNgay");
        console.log(TuNgay, DenNgay)
        const res = await getPollByTime({ TuNgay, DenNgay });
        console.log(res);
        if (res) {
            setPollArr(res);
        }
    }

    useEffect(() => {
        setYearGradeArr(category.categories.grade)
    }, [category])

    const customList = (items) => (
        <Paper variant="outlined" sx={{ width: 330, height: 300, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value, index) => {
                    const labelId = `transfer-list-item-${index}-label`;

                    return (
                        <ListItem
                            key={index}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            {value.SoPhieu ?
                                <ListItemText id={labelId} primary={value.HoTen + " - " + value.MaSoDangVien + " - " + value.SoPhieu} />
                                :
                                <ListItemText id={labelId} primary={value.HoTen + " - " + value.MaSoDangVien} />
                            }
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    )

    return (
        <>
            <MyButton onClick={handleOpen} success><AddIcon />Thêm</MyButton>
            <Dialog PaperProps={{ style: { minWidth: '1200px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thêm ứng cử viên</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>* Tra cứu theo thông tin</Typography>
                            <InputGrid
                                select
                                onChange={handleChangeSelect}
                                nameTitle={"Chi bộ"}
                                name="partycell"
                                defaultValue="0"
                                control={control}
                                errors={errors}
                            >
                                <MenuItem value="0">Tất cả</MenuItem>
                                {
                                    category.categories["partycell"].map(el =>
                                        <MenuItem key={el.MaChiBo} value={el.MaChiBo} >{el.TenChiBo}</MenuItem>
                                    )
                                }
                            </InputGrid>
                            <Grid container sx={{ marginTop: 2 }}>
                                <Grid item style={{ width: '150px' }}>
                                    <Typography>Loại</Typography>
                                </Grid>
                                <Grid item container flex={1} spacing={2}>
                                    <Grid container item>
                                        <Grid item>
                                            <Typography sx={{ width: '50px' }}>Năm</Typography>
                                        </Grid>
                                        <Grid item flex={1}>
                                            <MySelect
                                                value={yearGrade}
                                                onChange={handleChangeYear}
                                            >
                                                <MenuItem value="0">Không</MenuItem>
                                                {yearGradeArr.map(el =>
                                                    <MenuItem key={el.Nam} value={el.Nam}>{el.Nam}</MenuItem>
                                                )}
                                            </MySelect>
                                        </Grid>
                                    </Grid>
                                    <Grid container item>
                                        <Grid item >
                                            <Typography sx={{ width: '50px' }}>Loại</Typography>
                                        </Grid>
                                        <Grid item flex={1}>
                                            <MySelect
                                                value={fieldValue}
                                                onChange={handleChangeFieldValue}
                                            >
                                                <MenuItem value="0">Tất cả</MenuItem>
                                                {
                                                    fieldArr.map(el =>
                                                        <MenuItem key={el["MaLoai"]} value={el["MaLoai"]}>{el["TenLoai"]}</MenuItem>
                                                    )
                                                }
                                            </MySelect>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid style={{ width: '100%', textAlign: 'center', marginTop: 16 }}>
                                <MyButton onClick={handleSubmit(onSubmit)} style={{ margin: '0 auto' }} info >Liệt kê</MyButton>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>* Tra cứu theo kết quả biểu quyết</Typography>

                            <Grid container spacing={2}>
                                <Grid item style={{ width: '150px', marginTop: '16px' }}>
                                    <Typography>Thời gian</Typography>
                                </Grid>
                                <Grid item container flex={1} alignItems="center" spacing={2}>
                                    <Grid item>
                                        <InputGrid
                                            noTitle
                                            type="date"
                                            name="TuNgay"
                                            defaultValue=""
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                    <Grid item>

                                        <InputGrid
                                            noTitle
                                            type="date"
                                            name="DenNgay"
                                            defaultValue=""
                                            control={control}
                                            errors={errors}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ marginTop: 2 }}>
                                <Grid item style={{ width: '150px' }}>
                                </Grid>
                                <MyButton onClick={handleSubmitDate} sx={{ margin: '2px 0px' }} info>Tra cứu</MyButton>
                            </Grid>
                            <Grid item>
                                <InputGrid
                                    select
                                    onChange={handleChangeSelect}
                                    nameTitle={"Cuộc biểu quyết"}
                                    name="poll"
                                    defaultValue="0"
                                    control={control}
                                    errors={errors}
                                >
                                    <MenuItem value="0">Không</MenuItem>
                                    {pollArr.length &&
                                        pollArr.map((el, index) =>
                                            <MenuItem key={index} value={el.MaBieuQuyet}>{el.TenBieuQuyet + " - " + el.PhamVi}</MenuItem>
                                        )
                                    }
                                </InputGrid>
                            </Grid>
                            <Grid style={{ width: '100%', textAlign: 'center', marginTop: 16 }}>
                                <MyButton onClick={handleSubmit(onSubmitByPoll)} style={{ margin: '0 auto' }} info >Liệt kê</MyButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid sx={{ marginTop: '2px' }} container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>{customList(left)}</Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllRight}
                                    disabled={left.length === 0}
                                    aria-label="move all right"
                                >
                                    ≫
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleAllLeft}
                                    disabled={right.length === 0}
                                    aria-label="move all left"
                                >
                                    ≪
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleReset}
                                    disabled={false}
                                    aria-label="move all left"
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>{customList(right)}</Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleAdd} success>
                        Thêm
                    </MyButton>
                </DialogActions>
            </Dialog >
        </>
    );
};

export default AddCandidateForm;