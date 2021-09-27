import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    btn: (props) => ({
        color: theme.palette.common.white,
        backgroundColor: props.success ?
            theme.palette.success.main :
            (props.info ?
                theme.palette.info.main :
                (props.error ?
                    theme.palette.error.main : (props.primary ?
                        theme.palette.primary.main :
                        ''))),
        '&:hover': {
            backgroundColor: props.success ?
                theme.palette.success.dark :
                (props.info ?
                    theme.palette.info.dark :
                    (props.error ?
                        theme.palette.error.dark :
                        (props.primary ?
                            theme.palette.primary.main :
                            '')))
        }
    }),
}))

const MyButton = (props) => {
    const { onClick, children, small } = props
    const classes = useStyles(props);
    return (
        <Button {...props} onClick={onClick} size={small ? "small" : "medium"} variant="contained" className={classes.btn}>
            {children}
        </Button>
    );
};

export default MyButton;