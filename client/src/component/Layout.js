import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import DrawerBar from './DrawerBar';

const useStyles = makeStyles(theme => ({
    main: {
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
        </>
    );
};

export default Layout;