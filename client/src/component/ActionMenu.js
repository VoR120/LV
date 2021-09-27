import { Button, Menu, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import MoveForm from './MoveForm';
import DecentralizationForm from './DecentralizationForm';

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

const ActionMenu = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(null);
    const { data } = props
    const handleClose = () => {
        setOpen(null)
    }
    const d = {
        fullPowers: false,
        update: false,
        createVotings: true
    }
    // const handleOpen = () => {
    //     setOpen(true)
    // }
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
                getContentAnchorEl={null}
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
                <MenuItem onClick={handleClose}><EditForm data={data} /></MenuItem>
                <MenuItem onClick={handleClose}><DeleteForm data={data} /></MenuItem>
                <MenuItem onClick={handleClose}><MoveForm /></MenuItem>
                <MenuItem onClick={handleClose}><DecentralizationForm data={d} />
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ActionMenu;