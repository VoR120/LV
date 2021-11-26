import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import CustomizedSnackbars from './CustomizedSnackbars';
import Loading from './CustomLoadingOverlay';
import DrawerBar from './DrawerBar';

const useStyles = makeStyles(theme => ({
    content: {
        minHeight: '599px'
    },
}))

const Layout = (props) => {
    const classes = useStyles();
    return (
        <>
            {props.sidebar ?
                (
                    <DrawerBar>
                        <div className={classes.content}>
                            {props.children}
                        </div>
                    </DrawerBar>
                ) :
                (
                    props.children
                )
            }
            <CustomizedSnackbars />
            <Loading />
        </>
    );
};

export default Layout;