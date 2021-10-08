import { Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Children } from 'react';
import MySelect from './UI/MySelect';

const useStyles = makeStyles(theme => ({
    inputItem: {
        marginTop: theme.spacing(2),
    },
}))

const InputGrid = (props) => {
    const { nameTitle, select, children, value, onChange } = props;
    const classes = useStyles();
    return (
        <>
            {select ?
                (
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid item xs={5}>
                            <Typography>{nameTitle}</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <MySelect value={value} onChange={onChange}>
                                {children}
                            </MySelect>
                        </Grid>
                    </Grid>
                ) :
                (
                    <Grid container className={classes.inputItem} alignItems="center">
                        <Grid item xs={5}>
                            <Typography>{nameTitle}</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField value={value} onChange={onChange} fullWidth size="small" variant="outlined" />
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
};

export default InputGrid;