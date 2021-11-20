import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../public/css/Form.scss';
import MyButton from './UI/MyButton';
import { SnackbarContext } from '../contextAPI/SnackbarContext';
import { updatePermissionPosition } from '../action/permissionAction';


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
    const { dataName, value, setRows } = props
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext)
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
        setRow();
    }

    useEffect(() => {
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
                        {dataName.length > 0 &&
                            dataName.map(el =>
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
                    <MyButton onClick={handleSubmit} success>
                        Add
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DecentralizationForm;