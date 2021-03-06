import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import image from '../public/image/warning.png';
import MyButton from './UI/MyButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getLocaleDate } from '../utils/utils';
const useStyles = makeStyles(theme => ({
    dialogContent: {
        textAlign: 'center'
    },
    icon: {
        margin: theme.spacing(0.5, 1, 0.5, 0),
        fontSize: '1.2rem'
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    deleteBtn: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    },
}))

const DetailForm = (props) => {

    const classes = useStyles();
    const { data, btn, noBtn, openForm, setOpenForm } = props;
    console.log(data);
    const { HinhAnh, HoTen, MaSoDangVien, CMND, TenGioiTinh, NgaySinh, NoiSinh, TenChiBo, TenChucVu,
        Email, SoDienThoai, TenDanToc, TenTonGiao, QueQuan, DiaChiThuongTru, NoiOHienTai,
        SoThe, TrinhDoHocVan, TenChinhTri, TenTinHoc, NgoaiNguTrinhDo,
        NgayVaoDoan, NoiVaoDoan, NgayChinhThuc, NgayVaoDang, NoiVaoDangLanDau, NoiVaoDangChinhThuc,
        NguoiGioiThieu
    } = data
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        setOpen(!!openForm);
    }, [openForm])

    return (
        <>
            {
                !noBtn &&
                (btn
                    ?
                    <MyButton onClick={handleOpen} error><DeleteIcon /></MyButton>
                    :
                    <div className={classes.iconWrapper} onClick={handleOpen}>
                        <VisibilityIcon className={classes.icon} />Xem chi ti???t
                    </div>
                )
            }

            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chi ti???t</DialogTitle>
                <DialogContent >
                    <Grid container>
                        <Grid item xs={4}>
                            <img style={{ width: '150px', height: '200px' }} src={HinhAnh} alt="avatar"></img>
                        </Grid>
                        <Grid container item xs={4}>
                            <Grid item xs={5}>
                                <Typography>H??? t??n</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>{HoTen}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    M?? ?????ng vi??n</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {MaSoDangVien}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    CMND</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {CMND}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Gi???i t??nh</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenGioiTinh}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Ng??y sinh</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>{getLocaleDate(NgaySinh)}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    N??i sinh</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiSinh}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                            <Grid item xs={5}>
                                <Typography>    Chi b???</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenChiBo}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Ch???c v???</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenChucVu}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Email</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {Email}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    S??? ??i???n tho???i</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {SoDienThoai}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    D??n t???c</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenDanToc}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    T??n gi??o</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenTonGiao}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid><Typography>Qu?? qu??n: {QueQuan}</Typography></Grid>
                    <Grid><Typography>?????a ch??? th?????ng tr??: {DiaChiThuongTru}</Typography></Grid>
                    <Grid><Typography>N??i ??? hi???n t???i: {NoiOHienTai}</Typography></Grid>
                    <Grid container>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    S??? th???</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {SoThe}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Tr??nh ????? h???c v???n</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TrinhDoHocVan}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Tr??nh ????? tin h???c</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenTinHoc}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Tr??nh ????? ch??nh tr???</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenChinhTri}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid><Typography>Ngo???i ng??? - tr??nh ?????: {NgoaiNguTrinhDo}</Typography></Grid>
                    <Grid container>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Ng??y v??o ??o??n</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {getLocaleDate(NgayVaoDoan)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    N??i v??o ??o??n</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiVaoDoan}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Ng??y v??o ?????ng l???n ?????u</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {getLocaleDate(NgayVaoDang)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    N??i v??o ?????ng l???n ?????u</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiVaoDangLanDau}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Ng??y v??o ?????ng ch??nh th???c</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {getLocaleDate(NgayChinhThuc)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    N??i v??o ?????ng ch??nh th???c</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiVaoDangChinhThuc}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid><Typography>Ng?????i gi???i thi???u: {NguoiGioiThieu}</Typography></Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        H???y
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DetailForm;