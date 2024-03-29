import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid, List,
    ListItem, ListItemIcon, ListItemText, MenuItem, Paper
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { filterPartyMember } from '../action/partyMemberAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { InfoContext } from '../contextAPI/InfoContext';
import { LoadingContext } from '../contextAPI/LoadingContext';
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

const AddVoterForm = (props) => {
    const classes = useStyles();
    const { setVoter } = props;
    const [open, setOpen] = useState(false);

    const { category, categoryDispatch } = useContext(CategoryContext);
    const { info } = useContext(InfoContext);
    const isDeP = info.info.Quyen["12"] == 1;
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const { loadingDispatch } = useContext(LoadingContext);

    const [includeReserve, setIncludeReserve] = useState(true)
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
                    msg: "Phải có ít nhất 2 người tham gia",
                    type: "error"
                }
            })
        } else {
            setOpen(false);
            setVoter(right.map(el => ({ HoTen: el.HoTen, MaNguoiThamGia: el.MaSoDangVien })))
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const onSubmit = async (data) => {
        // setRight([]);
        loadingDispatch({ type: 'OPEN_LOADING' })
        data.notreserve = includeReserve
        const res = await filterPartyMember(data);
        setLeft(res)
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
        const sum = right.concat(left)
        var result = sum.reduce((unique, o) => {
            if (!unique.some(obj => obj.MaSoDangVien == o.MaSoDangVien)) {
                unique.push(o);
            }
            return unique;
        }, []);

        setRight(result);
        setLeft([]);
    };

    const handleCheckedRight = () => {
        const sum = right.concat(leftChecked)
        var result = sum.reduce((unique, o) => {
            if (!unique.some(obj => obj.MaSoDangVien === o.MaSoDangVien)) {
                unique.push(o);
            }
            return unique;
        }, []);

        setRight(result);
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
                <DialogTitle id="form-dialog-title">Thêm đơn vị biểu quyết</DialogTitle>
                <DialogContent>
                    <InputGrid
                        select
                        onChange={handleChangeSelect}
                        nameTitle={"Chi bộ"}
                        name="partycell"
                        defaultValue={isDeP ? "0" : info.info.MaChiBo}
                        disabled={!isDeP}
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
                        nameTitle={"Chức vụ"}
                        name="position"
                        defaultValue="0"
                        control={control}
                        errors={errors}
                    >
                        <MenuItem value="0">Tất cả</MenuItem>
                        {
                            category.categories["position"].map(el =>
                                <MenuItem key={el.MaChucVu} value={el.MaChucVu} >{el.TenChucVu}</MenuItem>
                            )
                        }
                    </InputGrid>
                    <Grid container>
                        <Grid item style={{ width: '150px' }}>

                        </Grid>
                        <Grid item flex={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={includeReserve}
                                        onChange={() => setIncludeReserve(!includeReserve)}

                                    />}
                                label="Không hiển thị Đảng viên dự bị"
                            />
                        </Grid>
                    </Grid>
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

export default AddVoterForm;