import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Menu, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { InfoContext } from '../contextAPI/InfoContext';
import EditMoveForm from './EditMoveForm';

const useStyles = makeStyles(theme => ({
    icon: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
        fontSize: '1.2rem'
    },
    menuList: {
        paddingTop: 0,
        paddingBottom: 0
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
}))

const ActionMoveMenu = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(null);
    const { info } = useContext(InfoContext)
    const { data, type } = props
    const handleClose = () => {
        setOpen(null)
    }

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <Button aria-controls="action-menu" aria-haspopup="true" color="primary" variant="contained" onClick={handleOpen}>
                <SettingsIcon />
            </Button>
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
                {/* {info.info.Quyen["2"] == 1 && */}
                <MenuItem onClick={handleClose}><EditMoveForm type={type} data={data} /></MenuItem>
                {/* } */}
            </Menu>
        </div>
    );
};

export default ActionMoveMenu;