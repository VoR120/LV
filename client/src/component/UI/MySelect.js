import { MenuItem, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    menuList: {
        padding: '0',
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