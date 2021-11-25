import EqualizerIcon from '@mui/icons-material/Equalizer';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import InfoIcon from '@mui/icons-material/Info';
import LayersIcon from '@mui/icons-material/Layers';
import ExpandLess from '@mui/icons-material/ExpandMore';
import ExpandMore from '@mui/icons-material/ExpandLess';
import ListIcon from '@mui/icons-material/List';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import GradeIcon from '@mui/icons-material/Grade';
import { Collapse, Divider, ListItemButton, ListItemIcon } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { NavLink } from "react-router-dom";
import '../public/css/Drawer.scss';
import React, { useContext, useEffect, useState } from 'react';
import { InfoContext } from '../contextAPI/InfoContext';
import { useLocation } from 'react-router';

const useStyles = makeStyles(theme => ({
    toolbarMixins: theme.mixins.toolbar,
    toolbar: {
        backgroundColor: theme.palette.primary.main,
    },
    badge: {
        marginRight: '10px'
    }
}))

const DrawerList = () => {

    const classes = useStyles();
    const { info } = useContext(InfoContext);
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const path = location.pathname;
    const pathList = ["/grade", "/evaluate", "/evaluatesubject", "/evaluatedepartment", "/openevaluate"]
    const pathList2 = ["/createvoting", "/voting"]

    useEffect(() => {
        if (pathList.includes(path)) {
            setOpen(true)
        }
        if (pathList2.includes(path)) {
            setOpen1(true)
        }
    }, [path])

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClick1 = () => {
        setOpen1(!open1);
    };
    return (
        <div className="drawer-list" style={{ overflow: 'hidden' }}>
            <List className={classes.list}>
                {/* <NavLink to={"/home"}>
                    <ListItem button>
                        <HomeIcon />
                        <ListItemText primary="Trang chủ" />
                    </ListItem>
                </NavLink> */}
                {
                    info.info.Quyen["1"] == 1 &&
                    <NavLink to={"/myfile"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Thông tin cá nhân" />
                        </ListItemButton>
                    </NavLink>
                }
                {
                    (
                        info.info.Quyen["2"] == 1 ||
                        info.info.Quyen["3"] == 1
                    ) &&
                    <NavLink to={"/file"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hồ sơ Đảng viên" />
                        </ListItemButton>
                    </NavLink>
                }
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <ThumbsUpDownIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đánh giá" />
                    {!open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            info.info.Quyen["15"] == 1 &&
                            <NavLink to={"/grade"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Loại Đảng viên" />
                                </ListItemButton>
                            </NavLink>
                        }
                        {
                            info.info.Quyen["14"] == 1 &&
                            <NavLink to={"/openevaluate"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mở đánh giá" />
                                </ListItemButton>
                            </NavLink>
                        }
                        <NavLink to={"/evaluate"}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <GradeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cá nhân đánh giá" />
                            </ListItemButton>
                        </NavLink>
                        {
                            info.info.Quyen["14"] == 1 &&
                            <NavLink to={"/evaluatesubject"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Bộ môn đánh giá" />
                                </ListItemButton>
                            </NavLink>
                        }
                        {
                            info.info.Quyen["15"] == 1 &&
                            <NavLink to={"/evaluatedepartment"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Khoa đánh giá" />
                                </ListItemButton>
                            </NavLink>
                        }
                    </List>
                </Collapse>
                {
                    info.info.Quyen["3"] == 1 &&
                    <NavLink to={"/move"}>
                        <ListItemButton >
                            <ListItemIcon>
                                <SyncAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chuyển sinh hoạt" />
                        </ListItemButton>
                    </NavLink>
                }
                {
                    info.info.Quyen["5"] == 1 &&
                    <NavLink to={"/rewarddiscipline"}>
                        <ListItemButton >
                            <ListItemIcon>
                                <ThumbsUpDownIcon />
                            </ListItemIcon>
                            <ListItemText primary="Khen thưởng - kỷ luật" />
                        </ListItemButton>
                    </NavLink>
                }
                {
                    info.info.Quyen["6"] == 1 &&
                    <NavLink to={"/statistic"}>
                        <ListItemButton >
                            <ListItemIcon>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Báo cáo - Thống kê" />
                        </ListItemButton>
                    </NavLink>
                }
                {info.info.Quyen["2"] == 1 &&
                    <NavLink to={"/search"}>
                        <ListItemButton >
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tìm kiếm" />
                        </ListItemButton>
                    </NavLink>
                }
                {
                    info.info.Quyen["7"] == 1 &&
                    <NavLink to={"/partycell"}>
                        <ListItemButton >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chi bộ" />
                        </ListItemButton>
                    </NavLink>
                }
                {
                    info.info.Quyen["8"] == 1 &&
                    <NavLink to={"/category"}>
                        <ListItemButton >
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Danh mục" />
                        </ListItemButton>
                    </NavLink>
                }
                <ListItemButton onClick={handleClick1}>
                    <ListItemIcon>
                        <ThumbsUpDownIcon />
                    </ListItemIcon>
                    <ListItemText primary="Biểu quyết" />
                    {!open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            info.info.Quyen["9"] == 1 &&
                            <NavLink to={"/createvoting"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Tạo biểu quyết" />
                                </ListItemButton>
                            </NavLink>
                        }
                        {
                            info.info.Quyen["10"] == 1 &&
                            <NavLink to={"/voting"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Biểu quyết" />
                                </ListItemButton>
                            </NavLink>
                        }
                    </List>
                </Collapse>
                <Divider />
                {
                    info.info.Quyen["11"] == 1 &&
                    <NavLink to={"/decentralization"}>
                        <ListItemButton >
                            <ListItemIcon>
                                <PlaylistAddCheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Phân quyền" />
                        </ListItemButton>
                    </NavLink>
                }
            </List>
        </div>
    );
};

export default DrawerList;

