import { Badge, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import LayersIcon from '@material-ui/icons/Layers';
import RedoIcon from '@material-ui/icons/Redo';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupIcon from '@material-ui/icons/Group';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import UndoIcon from '@material-ui/icons/Undo';
import { makeStyles, withStyles } from '@material-ui/styles';
import { NavLink } from "react-router-dom";
import ListIcon from '@material-ui/icons/List';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import '../public/css/Drawer.scss';

const useStyles = makeStyles(theme => ({
    toolbarMixins: theme.mixins.toolbar,
    toolbar: {
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        marginRight: theme.spacing(3),
        color: theme.palette.grey[500]
    },
    badge: {
        marginRight: '10px'
    }
}))

const DrawerList = () => {

    const classes = useStyles();
    return (
        <div className="drawer-list">
            <List className={classes.list}>
                <NavLink to={"/home"}>
                    <ListItem button>
                        <HomeIcon className={classes.icon} />
                        <ListItemText primary="Trang chủ" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/file"}>
                    <ListItem button>
                        <LayersIcon className={classes.icon} />
                        <ListItemText primary="Hồ sơ nhân viên" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/move"}>
                    <ListItem button>
                        <UndoIcon className={classes.icon} />
                        <ListItemText primary="Chuyển sinh hoạt" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/statistic"}>
                    <ListItem button>
                        <EqualizerIcon className={classes.icon} />
                        <ListItemText primary="Báo cáo - Thống kê" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/search"}>
                    <ListItem button>
                        <SearchIcon className={classes.icon} />
                        <ListItemText primary="Tìm kiếm" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/rewarddiscipline"}>
                    <ListItem button>
                        <ThumbsUpDownIcon className={classes.icon} />
                        <ListItemText primary="Khen thưởng - kỷ luật" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/partycell"}>
                    <ListItem button>
                        <GroupIcon className={classes.icon} />
                        <ListItemText primary="Chi bộ" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/category"}>
                    <ListItem button>
                        <ListIcon className={classes.icon} />
                        <ListItemText primary="Danh mục" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/voting"}>
                    <ListItem button>
                        <HowToVoteIcon className={classes.icon} />
                        <ListItemText primary="Biểu quyết" />
                    </ListItem>
                </NavLink>
                <Divider/>
                <NavLink to={"/decentralization"}>
                    <ListItem button>
                        <PlaylistAddCheckIcon className={classes.icon} />
                        <ListItemText primary="Phân quyền" />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
};

export default DrawerList;

