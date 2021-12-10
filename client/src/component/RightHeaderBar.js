import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { changePassword, logout } from '../action/infoAction';
import InputGrid from '../component/InputGrid';
import MyButton from '../component/UI/MyButton';
import { InfoContext } from '../contextAPI/InfoContext';
import { SnackbarContext } from '../contextAPI/SnackbarContext';

const useStyles = makeStyles(theme => ({
    profileChip: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        transition: 'all .2s ease-in-out',
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: theme.palette.primary.main + '!important',
            color: theme.palette.primary.light,
        }
    },
}))

const RightHeaderBar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(null);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)
    const { info, infoDispatch } = useContext(InfoContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext);

    const {
        handleSubmit,
        control,
        reset,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const handleClose = () => {
        setOpen(null)
    }

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleChangePasswordOpen = (e) => {
        setChangePasswordOpen(true);
        setOpen(false)
    }

    const onSubmit = async (data) => {
        const res = await changePassword({
            password: data.password,
            newPassword: data.newPassword,
            MaSoDangVien: info.info.MaSoDangVien
        });
        if (res.error) {
            setError(res.type, {
                type: "manual",
                message: res.error
            })
        } else {
            reset({
                password: "",
                newPassword: "",
                confirmPassword: ""
            });
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.msg,
                    type: "success"
                }
            })
            setChangePasswordOpen(false)
        }
    }

    const handleCancer = () => {
        clearErrors(["password", "newPassword", "confirmPassword"])
        setChangePasswordOpen(false);
    }

    const handleLogout = () => {
        logout(infoDispatch)
        openSnackbarDispatch({
            type: 'SET_OPEN',
            payload: {
                msg: "Đăng xuất thành công!",
                type: "success"
            }
        })
    }
    return (
        <>
            <Chip
                onClick={handleOpen}
                className={classes.profileChip}
                icon={<AccountCircleIcon fontSize="large" />}
                label={`${info.info.HoTen}`}
            />
            <Menu
                className={classes.menu}
                id="action-menu"
                open={Boolean(open)}
                keepMounted
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                MenuListProps={{ className: classes.menuList }}
            >
                <MenuItem onClick={handleChangePasswordOpen}>Đổi mật khẩu</MenuItem>
                <Dialog
                    PaperProps={{ style: { minWidth: '600px' } }}
                    open={changePasswordOpen}
                    onClose={() => setChangePasswordOpen(false)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{`Đổi mật khẩu`}</DialogTitle>
                    <DialogContent>
                        <InputGrid
                            type="password"
                            nameTitle={"Mật khẩu hiện tại"}
                            name={"password"}
                            control={control}
                            rules={{ required: "Vui lòng nhập trường này!" }}
                            errors={errors}
                        />
                        <InputGrid
                            type="password"
                            nameTitle={"Mật khẩu mới"}
                            name={"newPassword"}
                            control={control}
                            rules={{ required: "Vui lòng nhập trường này!" }}
                            errors={errors}
                        />
                        <InputGrid
                            type="password"
                            nameTitle={"Nhập lại mật khẩu mới"}
                            name={"confirmPassword"}
                            control={control}
                            rules={{ required: "Vui lòng nhập trường này!" }}
                            errors={errors}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancer} >
                            Hủy
                        </Button>
                        <MyButton onClick={handleSubmit(onSubmit)} info>
                            Xác nhận
                        </MyButton>
                    </DialogActions>
                </Dialog>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
        </>
    );
};

export default RightHeaderBar;