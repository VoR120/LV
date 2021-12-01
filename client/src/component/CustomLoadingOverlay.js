import { Backdrop, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { LoadingContext } from '../contextAPI/LoadingContext';


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Loading = (props) => {
    const classes = useStyles();
    const { loading } = React.useContext(LoadingContext)
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => 9999999, backgroundColor: 'rgba(0, 0, 0, 0.2)' }} open={loading.open}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default Loading;