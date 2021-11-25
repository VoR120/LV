import { Backdrop, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        //   zIndex: theme.zIndex.drawer + 1,
        //   color: '#fff',
        position: 'absolute',
        top: '50px'
    },
}));

const SmallLoading = (props) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={props.loading}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default SmallLoading;