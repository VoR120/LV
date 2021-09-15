import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, makeStyles, Paper, Radio, RadioGroup, Typography } from '@material-ui/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useState } from 'react';
import AddForm from '../component/AddForm';
import Layout from '../component/Layout';
import ActionMenu from '../component/ActionMenu';
import EditForm from '../component/EditForm';
import DeleteForm from '../component/DeleteForm';
import AddFormCategory from '../component/AddFormCategory';
import EditFormCategory from '../component/EditFormCategory';
import DeleteFormCategory from '../component/DeleteFormCategory';
import MyButton from '../component/UI/MyButton';
import AddVotingForm from '../component/AddVotingForm';


const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    paper: {
        padding: '16px',
        marginBottom: '16px',
        marginTop: '20px',
        width: 'fit-content'
    },
    title: {
        marginBottom: '20px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '40px'
    }
}))

const Voting = () => {
    const classes = useStyles();
    const [valueVoting, setValueVoting] = useState('');
    const [open, setOpen] = useState(false)
    const handleChangeVoting = (e) => {
        setValueVoting(e.target.value);
        setOpen(true);
    }
    const handleSubmit = (e) => {
        alert("Yes");
    }
    const handleClose = () => {
        setValueVoting('')
        setOpen(false);
    }
    const ConfirmDelete = () => {
        return (
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Xóa Đảng viên</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn có muốn chọn Đảng viên {valueVoting} ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                    <MyButton onClick={handleSubmit} success>
                        Đồng ý
                    </MyButton>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Biểu quyết
                    </Typography>
                </div>
                <AddVotingForm />
                <Paper className={classes.paper} variant="outlined">
                    <div className={classes.flex}>
                        <Typography variant="button">Họp hội đồng lần 5</Typography>
                        <Typography variant="button">12/12/2021</Typography>
                    </div>
                    <Typography className={classes.title} variant="h5">Biểu quyết khen thưởng Đảng viên</Typography>
                    <RadioGroup aria-label="voting" name="voting" value={valueVoting} onChange={handleChangeVoting}>
                        <FormControlLabel value="DV1" control={<Radio color="primary" />} label="Nguyễn Văn A - DV1" />
                        <FormControlLabel value="DV2" control={<Radio color="primary" />} label="Nguyễn Văn B - DV2" />
                    </RadioGroup>
                    <ConfirmDelete />
                </Paper>
            </Layout>
        </>
    );
};

export default Voting;