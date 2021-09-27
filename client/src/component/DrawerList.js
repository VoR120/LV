import { Badge, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import LayersIcon from '@mui/icons-material/Layers';
import RedoIcon from '@mui/icons-material/Redo';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupIcon from '@mui/icons-material/Group';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import UndoIcon from '@mui/icons-material/Undo';
import { makeStyles, withStyles } from '@mui/styles';
import { NavLink } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
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

