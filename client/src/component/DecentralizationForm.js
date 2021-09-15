import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [fullPowers, setFullPowers] = useState(props.data.fullPowers);
    const [createVotings, setCreateVotings] = useState(props.data.createVotings);
    const [update, setUpdate] = useState(props.data.update);
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
    const handleOpen = () => {
        setOpen(true)
    }
    const onSubmit = () => {
        alert("abc")
    }
    const handleChangeCheckBox = () => {

    };
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
                            control={<Checkbox checked={fullPowers} onChange={handleChangeCheckBox} color="primary" name="fullPowers" />}
                            label="Toàn quyền"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={update} onChange={handleChangeCheckBox} color="primary" name="update" />}
                            label="Chỉnh sửa hồ sơ Đảng viên"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={createVotings} onChange={handleChangeCheckBox} color="primary" name="createVotings" />}
                            label="Tạo biểu quyết"
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                    </Button>
                    <MyButton onClick={handleSubmit(onSubmit)} success>
                        Add
                    </MyButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DecentralizationForm;