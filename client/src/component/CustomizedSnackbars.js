import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from '../contextAPI/SnackbarContext'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const { openSnackbar, openSnackbarDispatch } = React.useContext(SnackbarContext)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        openSnackbarDispatch({ type: 'SET_CLOSE' })
    };

    return (
        <Snackbar
            open={openSnackbar.open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={openSnackbar.type} sx={{ width: '100%' }}>
                {openSnackbar.message}
            </Alert>
        </Snackbar>
    );
}