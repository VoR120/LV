import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { updatePermissionPM, updatePermissionPosition } from '../action/permissionAction';
import { CategoryContext } from '../contextAPI/CategoryContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import '../public/css/Form.scss';
import MyButton from './UI/MyButton';


const useStyles = makeStyles(theme => ({
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main
        }
    },
    icon: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
        fontSize: '1.2rem'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
}))


const DecentralizationForm = (props) => {
    const { value, setRows, pm, partycell, id, permission } = props
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
    const { category } = useContext(CategoryContext)
    const [quyen, setQuyen] = useState({});

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const checkAllPermission = (obj) => {
        let isAll = true
        Object.keys(obj).forEach(el => {
            if (obj[el] == 0)
                isAll = false
        })
        return isAll
    }

    const handleChangeCheckBox = (e) => {
        setQuyen({ ...quyen, [e.target.name]: Number(e.target.checked) })
    };

    const handleSelectAll = (e) => {
        let obj = { ...quyen }
        Object.keys(quyen).map(el => {
            e.target.checked
                ? obj[el] = 1
                : obj[el] = 0
        })
        setQuyen(obj)
    }

    const handleSubmit = () => {
        const setRow = async () => {
            let newData = { ...quyen };
            Object.keys(quyen).map(el => newData[el] = Number(quyen[el]));
            const res = await updatePermissionPosition({ MaChucVu: value.MaChucVu, data: newData }, openSnackbarDispatch)
            let newRes = [...res];
            res.map((obj, index) => {
                newRes[index]["all"] = checkAllPermission(obj) ? 1 : 0
            })
            if (res) {
                setRows(newRes);
                setOpen(false)
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "Đã cập nhật!",
                        type: "success"
                    }
                })
            } else {
                setOpen(false)
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "Đã xảy ra lỗi!",
                        type: "error"
                    }
                })
            }
        }
        const setRole = async () => {
            let newData = { ...quyen };
            Object.keys(quyen).map(el => newData[el] = Number(quyen[el]));
            const res = await updatePermissionPM({ MaSoDangVien: id, data: newData })
            if (res) {
                openSnackbarDispatch({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "Đã cập nhật!",
                        type: "success"
                    }
                })
            }
            setOpen(false)
        }
        if (value)
            setRow();
        if (id)
            setRole()

    }

    useEffect(() => {
        if (pm) {
            setQuyen(permission);
        }
        if (value) {
            let obj = {}
            Object.keys(value).map(el => {
                if (el != "MaChucVu" && el != "TenChucVu" && el != "tableData" && el != "all") {
                    obj[el] = value[el]
                }
            })
            setQuyen(obj)
        }
    }, [])

    return (
        <>
            {props.button ? (
                <MyButton onClick={handleOpen} info>Phân quyền</MyButton>
            ) :
                <div className={classes.iconWrapper} onClick={handleOpen}>
                    <PlaylistAddCheckIcon className={classes.icon} />Phân quyền
                </div>
            }

            <Dialog PaperProps={{ style: { minWidth: '500px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Phân quyền</DialogTitle>
                <DialogContent>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!checkAllPermission(quyen)}
                                    onChange={handleSelectAll}
                                    color="primary"
                                    name={"all"}
                                />}
                            label={"Toàn quyền'"}
                        />
                        {category.categories["permission"].length > 0 &&
                            category.categories["permission"].map(el =>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!quyen[el.MaQuyen]}
                                            onChange={handleChangeCheckBox}
                                            color="primary"
                                            name={el.MaQuyen + ''}
                                        />}
                                    label={el.TenQuyen}
                                    key={el.MaQuyen}
                                />
                            )}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <MyButton onClick={handleSubmit} info>
                        Lưu
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DecentralizationForm;