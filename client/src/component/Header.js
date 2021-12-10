import MenuIcon from '@mui/icons-material/MenuIcon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';


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
                        {/* Hệ thống quản lý hồ sơ Đảng viên */}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;