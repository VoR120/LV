import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    menuList: {
        padding: '0',
    }
}))

const MySelectReactHookForm = (props) => {
    const classes = useStyles();
    const { children, name, errors, disabled, id, onChange, ref, ...other } = props
    return (
        <Controller
            name={name}
            id={id}
            {...other}
            render={({ field }) => (
                <TextField
                    {...field}
                    onChange={onChange}
                    inputRef={ref}
                    select
                    fullWidth
                    disabled={disabled}
                    size="small"
                    variant="outlined"
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
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
            )}
        />
    );
};

export default MySelectReactHookForm;