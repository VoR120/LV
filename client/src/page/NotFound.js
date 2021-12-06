import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Typography } from '@mui/material';
import warningImage from '../public/image/warning.png'
import { NavLink, useHistory, } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: "absolute",
        top: "44%",
        left: "50%",
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    },
    img: {
        width: '200px',
        height: '200px'
    },
    number: {
        fontSize: '150px',
        fontWeight: 600,
        letterSpacing: '15px',
        lineHeight: '150px'
    },
    content: {
        fontSize: '20px',
        textTransform: 'uppercase',
        fontWeight: 600
    }
}))

const NotFound = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.wrapper} >
            <Typography className={classes.number}>404</Typography>
            <Typography className={classes.content}>Không tìm thấy</Typography>
            <Button style={{ borderRadius: '50px' }} variant="contained"  onClick={() => { history.goBack() }}>Trở về</Button>
        </div>
    );
};

export default NotFound;