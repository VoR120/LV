import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import React from 'react';
import DrawerList from './DrawerList';
import RightHeaderBar from './RightHeaderBar';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginLeft: drawerWidth,
    },
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: 'none',
    borderBottom: '1px solid #eee'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    marginTop: '64px',
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
    overflow: "hidden"
  },
  header: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    textTransform: 'uppercase',
    fontWeight: '600',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px',
    // backgroundImage: `url(${BgImage})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //     theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
  },
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
}));

function DrawerBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <DrawerList />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.header} variant="h6" noWrap>
            Hệ thống quản lý hồ sơ Đảng viên
          </Typography>
          <RightHeaderBar />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

DrawerBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerBar;

// import EqualizerIcon from '@mui/icons-material/Equalizer';
// import GroupIcon from '@mui/icons-material/Group';
// import HomeIcon from '@mui/icons-material/Home';
// import HowToVoteIcon from '@mui/icons-material/HowToVote';
// import InfoIcon from '@mui/icons-material/Info';
// import LayersIcon from '@mui/icons-material/Layers';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ListIcon from '@mui/icons-material/List';
// import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
// import SearchIcon from '@mui/icons-material/Search';
// import SyncAltIcon from '@mui/icons-material/SyncAlt';
// import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
// import GradeIcon from '@mui/icons-material/Grade';
// import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import { makeStyles } from '@mui/styles';
// import { NavLink } from "react-router-dom";
// import '../public/css/Drawer.scss';
// import { useContext, useState } from 'react';
// import { InfoContext } from '../contextAPI/InfoContext'

// const useStyles = makeStyles(theme => ({
//     toolbarMixins: theme.mixins.toolbar,
//     toolbar: {
//         backgroundColor: theme.palette.primary.main,
//     },
//     icon: {
//         marginRight: theme.spacing(3),
//         color: theme.palette.grey[500]
//     },
//     badge: {
//         marginRight: '10px'
//     },
//     accordion: {
//         border: 'none'
//         // height: "48px"
//     },
//     summary: {
//         width: "100%",
//         padding: 0
//     }
// }))

// const DrawerList = () => {

//     const classes = useStyles();
//     const { info } = useContext(InfoContext);
//     const [expand, setExpand] = useState(true);

//     return (
//         <div className="drawer-list">
//             <List className={classes.list}>
//                 {/* <NavLink to={"/home"}>
//                     <ListItem button>
//                         <HomeIcon className={classes.icon} />
//                         <ListItemText primary="Trang chủ" />
//                     </ListItem>
//                 </NavLink> */}
//                 {
//                     (
//                         info.info.Quyen["2"] == 1 ||
//                         info.info.Quyen["3"] == 1 ||
//                         info.info.Quyen["4"] == 1 ||
//                         info.info.Quyen["5"] == 1
//                     ) &&
//                     <NavLink to={"/file"}>
//                         <ListItem button>
//                             <LayersIcon className={classes.icon} />
//                             <ListItemText primary="Hồ sơ Đảng viên" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 {
//                     info.info.Quyen["3"] == 1 &&
//                     <NavLink to={"/move"}>
//                         <ListItem button>
//                             <SyncAltIcon className={classes.icon} />
//                             <ListItemText primary="Chuyển sinh hoạt" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 {
//                     info.info.Quyen["4"] == 1 &&

//                     <Accordion expanded={expand} onClick={() => setExpand(!expand)} className={classes.accordion} variant="outlined" square>
//                         <ListItem button>
//                             <AccordionSummary
//                                 className={classes.summary}
//                                 expandIcon={<ExpandMoreIcon />}
//                                 aria-controls="panel1a-content"
//                                 id="panel1a-header"
//                             >
//                                 <ThumbsUpDownIcon className={classes.icon} />
//                                 <Typography style={{ width: "100%" }}>Đánh giá</Typography>
//                             </AccordionSummary>
//                         </ListItem>
//                         {
//                             info.info.Quyen["1"] == 1 &&
//                             <NavLink to={"/grade"}>
//                                 <ListItem button>
//                                     <GradeIcon className={classes.icon} />
//                                     <ListItemText primary="Loại Đảng viên" />
//                                 </ListItem>
//                             </NavLink>
//                         }
//                         {
//                             info.info.Quyen["1"] == 1 &&
//                             <NavLink to={"/evaluate"}>
//                                 <ListItem button>
//                                     <GradeIcon className={classes.icon} />
//                                     <ListItemText primary="Loại Đảng viên" />
//                                 </ListItem>
//                             </NavLink>
//                         }
//                     </Accordion>

//                 }
//                 {
//                     info.info.Quyen["5"] == 1 &&
//                     <NavLink to={"/rewarddiscipline"}>
//                         <ListItem button>
//                             <ThumbsUpDownIcon className={classes.icon} />
//                             <ListItemText primary="Khen thưởng - kỷ luật" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 {
//                     info.info.Quyen["6"] == 1 &&
//                     <NavLink to={"/statistic"}>
//                         <ListItem button>
//                             <EqualizerIcon className={classes.icon} />
//                             <ListItemText primary="Báo cáo - Thống kê" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 {info.info.Quyen["2"] == 1 &&
//                     <NavLink to={"/search"}>
//                         <ListItem button>
//                             <SearchIcon className={classes.icon} />
//                             <ListItemText primary="Tìm kiếm" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 {
//                     info.info.Quyen["7"] == 1 &&
//                     <NavLink to={"/partycell"}>
//                         <ListItem button>
//                             <GroupIcon className={classes.icon} />
//                             <ListItemText primary="Chi bộ" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 {
//                     info.info.Quyen["8"] == 1 &&
//                     <NavLink to={"/category"}>
//                         <ListItem button>
//                             <ListIcon className={classes.icon} />
//                             <ListItemText primary="Danh mục" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 {
//                     (info.info.Quyen["9"] == 1 || info.info.Quyen["10"]) == 1 &&
//                     <NavLink to={"/voting"}>
//                         <ListItem button>
//                             <HowToVoteIcon className={classes.icon} />
//                             <ListItemText primary="Biểu quyết" />
//                         </ListItem>
//                     </NavLink>
//                 }
//                 <Divider />
//                 {
//                     info.info.Quyen["11"] == 1 &&
//                     <NavLink to={"/decentralization"}>
//                         <ListItem button>
//                             <PlaylistAddCheckIcon className={classes.icon} />
//                             <ListItemText primary="Phân quyền" />
//                         </ListItem>
//                     </NavLink>
//                 }
//             </List>
//         </div>
//     );
// };

// export default DrawerList;

