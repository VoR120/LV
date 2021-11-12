import makeStyles from '@mui/styles/makeStyles';
import React, { useState, useContext } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Chip, Menu, MenuItem } from '@mui/material';
import { logout } from '../action/infoAction';
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
    const { info, infoDispatch } = useContext(InfoContext);
    const { openSnackbar, openSnackbarDispatch } = useContext(SnackbarContext);

    const handleClose = () => {
        setOpen(null)
    }

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

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
                <MenuItem>Đổi mật khẩu</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
        </>
    );
};

export default RightHeaderBar;