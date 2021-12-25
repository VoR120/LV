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
                        <VisibilityIcon className={classes.icon} />Xem chi tiết
                    </div>
                )
            }

            <Dialog PaperProps={{ style: { minWidth: '1000px' } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chi tiết</DialogTitle>
                <DialogContent >
                    <Grid container>
                        <Grid item xs={4}>
                            <img style={{ width: '150px', height: '200px' }} src={HinhAnh} alt="avatar"></img>
                        </Grid>
                        <Grid container item xs={4}>
                            <Grid item xs={5}>
                                <Typography>Họ tên</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>{HoTen}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Mã đảng viên</Typography>
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
                                <Typography>    Giới tính</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenGioiTinh}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Ngày sinh</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>{getLocaleDate(NgaySinh)}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Nơi sinh</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiSinh}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                            <Grid item xs={5}>
                                <Typography>    Chi bộ</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenChiBo}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Chức vụ</Typography>
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
                                <Typography>    Số điện thoại</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {SoDienThoai}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Dân tộc</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenDanToc}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>    Tôn giáo</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenTonGiao}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid><Typography>Quê quán: {QueQuan}</Typography></Grid>
                    <Grid><Typography>Địa chỉ thường trú: {DiaChiThuongTru}</Typography></Grid>
                    <Grid><Typography>Nơi ở hiện tại: {NoiOHienTai}</Typography></Grid>
                    <Grid container>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Số thẻ</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {SoThe}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Trình độ học vấn</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TrinhDoHocVan}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Trình độ tin học</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenTinHoc}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Trình độ chính trị</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {TenChinhTri}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid><Typography>Ngoại ngữ - trình độ: {NgoaiNguTrinhDo}</Typography></Grid>
                    <Grid container>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Ngày vào đoàn</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {getLocaleDate(NgayVaoDoan)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Nơi vào đoàn</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiVaoDoan}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Ngày vào đảng lần đầu</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {getLocaleDate(NgayVaoDang)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Nơi vào đảng lần đầu</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiVaoDangLanDau}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Ngày vào đảng chính thức</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {getLocaleDate(NgayChinhThuc)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={5}>
                                <Typography>    Nơi vào đảng chính thức</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography>    {NoiVaoDangChinhThuc}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid><Typography>Người giới thiệu: {NguoiGioiThieu}</Typography></Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DetailForm;