import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, List,
    ListItem, ListItemIcon, ListItemText, MenuItem, Paper
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { filterPartyMember } from '../action/partyMemberAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import InputGrid from './InputGrid';
import MyButton from './UI/MyButton';

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
    }
}))

const AddCandidateForm = (props) => {
    const classes = useStyles();
    const { setCandidate } = props;
    const [open, setOpen] = useState(false);

    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);

    const [gradeArr, setGradeArr] = useState([])
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    const {
        register,
        handleSubmit,
        control,
        setValue,
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
            console.log(right);
            setOpen(false);
            setCandidate(right.map(el => ({ HoTen: el.HoTen, MaUngCuVien: el.MaSoDangVien })))
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const onSubmit = async (data) => {
        // setLoading(true)
        // setRight([]);
        const res = await filterPartyMember(data);
        setLeft(res)
        // setLoading(false)
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

    const customList = (items) => (
        <Paper variant="outlined" sx={{ width: 250, height: 300, overflow: 'auto' }}>
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
                            <ListItemText id={labelId} primary={value.HoTen + " - " + value.MaSoDangVien} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    )

    useEffect(() => {
        category.categories.grade.length > 0 &&
            category.categories.grade.map(el => {
                if (el.Nam == (new Date()).getFullYear()) {
                    setGradeArr(el.Data)
                }
            })
    }, [category.categories.grade])

    return (
        <>
            <MyButton onClick={handleOpen} success><AddIcon />Thêm</MyButton>
            <Dialog PaperProps={{ style: { minWidth: '700px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thêm ứng cử viên</DialogTitle>
                <DialogContent>
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
                    <InputGrid
                        select
                        onChange={handleChangeSelect}
                        nameTitle={"Loại"}
                        name="grade"
                        defaultValue="0"
                        control={control}
                        errors={errors}
                    >
                        <MenuItem value="0">Tất cả</MenuItem>
                        {
                            gradeArr.map(el =>
                                <MenuItem key={el.MaLoai} value={el.MaLoai} >{el.TenLoai}</MenuItem>
                            )
                        }
                    </InputGrid>
                    <Grid style={{ width: '100%', textAlign: 'center', marginTop: 16 }}>
                        <MyButton onClick={handleSubmit(onSubmit)} style={{ margin: '0 auto' }} info >Liệt kê</MyButton>
                    </Grid>

                    <Grid container spacing={2} justifyContent="center" alignItems="center">
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
            </Dialog>
        </>
    );
};

export default AddCandidateForm;