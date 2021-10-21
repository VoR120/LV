import { MenuItem, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    menuList: {
        padding: '0',
    }
}))

const MySelect = (props) => {
    const classes = useStyles();
    const { value, onChange, children, autowidth } = props
    return (
        <TextField
            select
            {...props}
            value={value}
            onChange={onChange}
            fullWidth={autowidth ? false : true} 
            size="small"
            variant="outlined"
            SelectProps={{
                MenuProps: {
                    MenuListProps: {
                        className: classes.menuList
                    }
                }
            }}
        >
            {children}
        </TextField>
    );
};

export default MySelect;