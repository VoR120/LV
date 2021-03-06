import { Grid, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
const useStyles = makeStyles(theme => ({
    paperStatistic: {
        padding: '8px',
        margin: '0 8px 16px',
        padding: '8px'
    },
    // label: {
    //     // paddingRight: '20px',
    //     textAlign: 'right',
    // },
    // content: {
    //     float: 'right'
    // },
    gridContainer: {
        minWidth: '150px'
    }
}))

const PaperStatistic = (props) => {
    const { title, data } = props;
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.paperStatistic}>
            <Typography align="center" style={{ marginBottom: '8px' }} variant="h5">{title}</Typography>
            {data.map((el, index) =>
                <Grid className={classes.gridContainer} container key={index}>
                    <Grid flex={1} item >
                        {el.label}
                    </Grid>
                    <Grid item xs={1}>:</Grid>
                    <Grid className={classes.content} xs={2} item >
                        {el.quantity}
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

export default PaperStatistic;