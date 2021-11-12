import { Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    menuList: {
        padding: '0',
    },
    input: {
        '& .Mui-disabled': {
            backgroundColor: '#f7f8f8',
            '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.9)'
        }
    }
}))

const MySelect = (props) => {
    const { nameTitle, value, onChange, autowidth, children, ...other } = props;
    const classes = useStyles();
    return (
        <div className={classes.input}>
            <Grid container className={classes.inputItem} alignItems="center">
                <>
                    {nameTitle &&
                        <Grid item style={{ width: '150px' }}>
                            <Typography>{nameTitle}</Typography>
                        </Grid>
                    }
                </>
                <Grid item flex={1}>
                    <TextField
                        select
                        {...other}
                        value={value}
                        onChange={onChange}
                        fullWidth={autowidth ? false : true}
                        size="small"
                        variant="outlined"
                        SelectProps={{
                            MenuProps: {
                                MenuListProps: {
                                    className: classes.menuList
                                },
                            },
                        }}
                    >
                        {children}
                    </TextField>
                </Grid>
            </Grid>
        </div>
    )
};

export default MySelect;