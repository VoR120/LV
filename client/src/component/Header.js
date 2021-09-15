import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/MenuIcon'
import { Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex'
    }
}))

const Header = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar color="primary">
                <Toolbar className={classes.toolbar}>
                    <MenuIcon />
                    <Typography variant="h6">
                        Hệ thống quản lý hồ sơ Đảng viên
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;