import EqualizerIcon from '@mui/icons-material/Equalizer';
import ExpandMore from '@mui/icons-material/ExpandLess';
import ExpandLess from '@mui/icons-material/ExpandMore';
import GradeIcon from '@mui/icons-material/Grade';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import LayersIcon from '@mui/icons-material/Layers';
import ListIcon from '@mui/icons-material/List';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { Collapse, ListItemButton, ListItemIcon } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from "react-router-dom";
import { InfoContext } from '../contextAPI/InfoContext';
import { ListDrawerContext } from '../contextAPI/ListDrawerContext';
import '../public/css/Drawer.scss';

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

    let permission = [];

    Object.keys(info.info.Quyen).forEach(el => {
        if (info.info.Quyen[el] == 1)
            permission.push(Number(el));
    })

    const { listOpen, listOpenDispatch } = useContext(ListDrawerContext)

    const handleClick = () => {
        listOpenDispatch({ type: 'TOGGLE_LIST1' })
        // setOpen(!open);
    };

    const handleClick1 = () => {
        listOpenDispatch({ type: 'TOGGLE_LIST2' })
        // setOpen1(!open1);
    };

    const handleStayOpen1 = () => {
        listOpenDispatch({ type: 'OPEN_LIST1' })
    }

    const handleStayOpen2 = () => {
        listOpenDispatch({ type: 'OPEN_LIST2' })
    }


    return (
        <div className="drawer-list" style={{ overflow: 'hidden' }}>
            <List className={classes.list}>
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
                    permission.some(p => [2, 3, 5].includes(p)) &&
                    <NavLink to={"/file"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hồ sơ Đảng viên" />
                        </ListItemButton>
                    </NavLink>
                }
                {permission.some(p => [13, 14, 15].includes(p)) &&
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <ThumbsUpDownIcon />
                        </ListItemIcon>
                        <ListItemText primary="Đánh giá" />
                        {!listOpen.list1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                }
                <Collapse in={listOpen.list1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            info.info.Quyen["15"] == 1 &&
                            <NavLink onClick={handleStayOpen1} to={"/grade"}>
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
                            <NavLink onClick={handleStayOpen1} to={"/openevaluate"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mở đánh giá" />
                                </ListItemButton>
                            </NavLink>
                        }
                        <NavLink onClick={handleStayOpen1} to={"/evaluate"}>
                            <ListItemButton >
                                <ListItemIcon>
                                    <GradeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cá nhân đánh giá" />
                            </ListItemButton>
                        </NavLink>
                        {
                            info.info.Quyen["14"] == 1 &&
                            <NavLink onClick={handleStayOpen1} to={"/evaluatesubject"}>
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
                            <NavLink onClick={handleStayOpen1} to={"/evaluatedepartment"}>
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
                    {!listOpen.list2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={listOpen.list2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            info.info.Quyen["9"] == 1 &&
                            <NavLink handleStayOpen2 to={"/createvoting"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Tạo biểu quyết" />
                                </ListItemButton>
                            </NavLink>
                        }
                        {
                            info.info.Quyen["9"] == 1 &&
                            <NavLink handleStayOpen2 to={"/votingmanage"}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <GradeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Quản lý biểu quyết" />
                                </ListItemButton>
                            </NavLink>
                        }
                        {
                            info.info.Quyen["10"] == 1 &&
                            <NavLink handleStayOpen2 to={"/voting"}>
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

