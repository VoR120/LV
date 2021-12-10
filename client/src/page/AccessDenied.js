import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import warningImage from '../public/image/warning.png';

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
    }
}))

const AccessDenied = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.wrapper} >
            <img className={classes.img} src={warningImage} alt="warningIcon" />
            <Typography variant="h6">Bạn không có quyền truy cập vào trang web này!</Typography>
            <Typography style={{ cursor: 'pointer' }} color="blue" variant="h6" onClick={() => {history.goBack()}}>Trở về</Typography>
        </div>
    );
};

export default AccessDenied;