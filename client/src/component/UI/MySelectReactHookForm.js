import { TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
    menuList: {
        padding: '0',
    }
}))

const MySelectReactHookForm = (props) => {
    const classes = useStyles();
    const { children, name, errors, disabled, id, onChange, value, ...other } = props
    return (
        <Controller
            sx={{ '& .Mui-focused': { borderTop: "1px solid" } }}
            name={name}
            id={id}
            {...other}
            render={({ field }) => (
                value ?
                    <TextField
                        select
                        {...field}
                        onChange={onChange}
                        value={value}
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
                        sx={{ '& .Mui-focused': { borderTop: "1px solid" } }}
                    >
                        {children}
                    </TextField>
                    :
                    <TextField
                        select
                        {...field}
                        onChange={onChange}
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