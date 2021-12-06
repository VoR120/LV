import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Menu, MenuItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useState } from 'react';
import { InfoContext } from '../contextAPI/InfoContext';
import AddForm from './AddForm';
import DecentralizationForm from './DecentralizationForm';
import DeleteForm from './DeleteForm';
import ExportFile from './ExportFile';
import MoveForm from './MoveForm';
import RewardDisciplineForm from './RewardDisciplineForm';

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
    const { info } = useContext(InfoContext)
    const { data, rows, setRows } = props;
    console.log(data);

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
                {info.info.Quyen["2"] == 1 &&
                    <MenuItem onClick={handleClose}><AddForm edit data={data} rows={rows} setRows={setRows} /></MenuItem>
                }
                {info.info.Quyen["2"] == 1 &&
                    <MenuItem onClick={handleClose}><DeleteForm name={data.HoTen} id={data.MaSoDangVien} /></MenuItem>
                }
                {info.info.Quyen["3"] == 1 &&
                    <MenuItem onClick={handleClose}><MoveForm id={data.MaSoDangVien} partycell={data.MaChiBo} /></MenuItem>
                }
                {/* {info.info.Quyen["4"] == 1 &&
                    <MenuItem onClick={handleClose}><GradeForm id={data.MaSoDangVien} name={data.HoTen} partycell={data.TenChiBo} /></MenuItem>
                } */}
                {info.info.Quyen["5"] == 1 &&
                    <MenuItem onClick={handleClose}><RewardDisciplineForm name={data.HoTen} id={data.MaSoDangVien} reward /></MenuItem>
                }
                {info.info.Quyen["5"] == 1 &&
                    <MenuItem onClick={handleClose}><RewardDisciplineForm name={data.HoTen} id={data.MaSoDangVien} /></MenuItem>
                }
                {info.info.Quyen["11"] == 1 &&
                    <MenuItem onClick={handleClose}><DecentralizationForm pm partycell={data.MaChiBo} id={data.MaSoDangVien} permission={data.Quyen} />                </MenuItem>
                }
                <MenuItem>
                    <ExportFile data={data} />
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ActionMenu;