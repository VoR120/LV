import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    menuList: {
        padding: '0',
        outlined: '2px solid black',
    }
}))

const MySelect = (props) => {
    const classes = useStyles();
    const { value, onChange, children, autoWidth } = props
    return (
        <TextField
            {...props}
            SelectProps={{
                MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    MenuListProps: {
                        className: classes.menuList
                    }
                }
            }}
            value={value} onChange={onChange} select fullWidth={autoWidth ? false : true} size="small"
            variant="outlined"
        >
            {children}
        </TextField>
    );
};

export default MySelect;