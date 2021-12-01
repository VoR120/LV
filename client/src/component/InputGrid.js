import { Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Children } from 'react';
import { Controller } from 'react-hook-form';
import MySelect from './UI/MySelect';
import MySelectReactHookForm from './UI/MySelectReactHookForm';

const useStyles = makeStyles(theme => ({
    inputItem: {
        marginTop: theme.spacing(2),
    },
    input: {
        '& .Mui-disabled': {
            backgroundColor: '#f7f8f8',
            '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.9)'
        }
    }
}))

const InputGrid = (props) => {
    const { nameTitle, noTitle, select, children, center,
        onChange, errors, name, id, register, disabled,
        type, placeholder, InputProps, multiline, minRows, ...other
    } = props;
    const classes = useStyles();
    return (
        <div className={classes.input}>
            {select ?
                (
                    <Grid container className={classes.inputItem} alignItems={center ? "center" : "flex-start"}>
                        {noTitle || (
                            <Grid item style={{ width: '150px' }}>
                                <Typography>{nameTitle}</Typography>
                            </Grid>
                        )
                        }
                        <Grid item flex={1}>
                            <MySelectReactHookForm
                                onChange={onChange}
                                disabled={disabled}
                                name={name}
                                id={id}
                                errors={errors}
                                {...other}
                            >
                                {children}
                            </MySelectReactHookForm>
                        </Grid>
                    </Grid>
                ) :
                (
                    <>
                        <Grid container className={classes.inputItem} alignItems={center ? "center" : "flex-start"}>
                            {noTitle ||
                                <Grid item style={{ width: '150px' }}>
                                    <Typography>{nameTitle}</Typography>
                                </Grid>
                            }
                            <Grid item flex={1}>
                                <Controller
                                    name={name}
                                    {...other}
                                    render={({ field }) =>
                                        onChange ?
                                            <TextField
                                                placeholder={placeholder || ""}
                                                {...field}
                                                type={type}
                                                id={id}
                                                onChange={onChange}
                                                disabled={disabled}
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                error={!!errors[name]}
                                                helperText={errors[name]?.message}
                                                InputProps={InputProps}
                                                multiline={multiline}
                                                minRows={minRows || 1}
                                                // autoFocus
                                            />
                                            :
                                            <TextField
                                                placeholder={placeholder || ""}
                                                {...field}
                                                type={type}
                                                id={id}
                                                disabled={disabled}
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                error={!!errors[name]}
                                                helperText={errors[name]?.message}
                                                InputProps={InputProps}
                                                multiline={multiline}
                                                minRows={minRows || 1}
                                                // autoFocus
                                            />

                                    }
                                />
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </div>
    )
};

export default InputGrid;