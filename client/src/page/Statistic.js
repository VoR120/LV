import MaterialTable from '@material-table/core';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, MenuItem,
    Paper,
    TableContainer, Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { getAllPartyMember } from '../action/infoAction';
import ActionMenu from '../component/ActionMenu';
import Layout from '../component/Layout';
import PaperStatistic from '../component/PaperStatistic';
import MyButton from '../component/UI/MyButton';
import MySelect from '../component/UI/MySelect';
import { downloadExcel } from '../utils/utils';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: '40px'
    },
    headerContent: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    table: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '16px',
        marginBottom: '16px',
    },
    inputSelect: {
        marginRight: '20px',
    },
    paperStatistic: {
        padding: '8px',
        margin: '0 8px',
    },
    paperWrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}))

const Statistic = () => {
    const classes = useStyles();
    const [categoryField, setCategoryField] = useState("chibo");

    const handleChangeField = (e) => {
        setCategoryField(e.target.value);
    }

    const [rows, setRows] = useState([])

    const [columns] = useState([
        { title: "Mã Đảng viên", field: "MaDangVien", maxWidth: 150 },
        { title: "Họ tên", field: "HoTen", minWidth: 200 },
        { title: "Chi bộ", field: "TenChiBo", },
        { title: "Giới tính", field: "GioiTinh", },
        { title: "Ngày sinh", field: "NgaySinh", type: 'date' },
        { title: "Quê quán", field: "QueQuan", },
        { title: "Dân tộc", field: "DanToc", },
        { title: "Tôn giáo", field: "TonGiao", },
        { title: "Trình độ học vấn", field: "TDHocVan", },
        { title: "Ngoại ngữ", field: "MaNgoaiNgu", },
        { title: "Trình độ ngoại ngữ", field: "MaTrinhDo", },
        { title: "Trình độ tin học", field: "MaTinHoc", },
        { title: "Trình độ chính trị", field: "MaChinhTri", },
        { title: "Số điện thoại", field: "SoDienThoai", },
        { title: "Email", field: "Email", },
        { title: "Nghề nghiệp", field: "NgheNghiep", },
        { title: "Địa chỉ thường trú", field: "DiaChiThuongTru", },
        { title: "Nơi ở hiện tại", field: "NoiOHienTai", },
        { title: "Ngày vào Đoàn", field: "NgayVaoDoan", type: 'date' },
        { title: "Nơi vào Đoàn", field: "NoiVaoDoan", },
        { title: "Ngày vào Đảng lần đầu", field: "NgayVaoDang", type: 'date' },
        { title: "Ngày vào Đảng chính thức", field: "NgayChinhThuc", type: 'date' },
        { title: "Người giới thiệu", field: "NguoiGioiThieu", },
        {
            title: "Chức năng", field: "action", sorting: false,
            render: (params) => {
                console.log(params);
                return <ActionMenu data={params} />
            }
        }
    ])

    useEffect(() => {
        const getAll = async () => {
            const res = await getAllPartyMember();
            console.log(res);
            setRows(res)
        }
        getAll();
    }, [])

    const genderS = [
        { label: 'Nam', quantity: '200' },
        { label: 'Nữ', quantity: '200' }
    ];
    const partyCellS = [
        { label: 'Sinh viên', quantity: '123' },
        { label: 'Đảng viên', quantity: '123' }
    ];
    const ethnicS = [
        { label: 'Kinh', quantity: '2000' },
        { label: 'Khmer', quantity: '500' },
        { label: 'Chăm', quantity: '50' },
        { label: 'Hoa', quantity: '30' },
    ];
    const ageS = [
        { label: '18 - 30', quantity: '200' },
        { label: ' 31 - 40', quantity: '200' },
        { label: ' 41 - 50', quantity: '200' },
        { label: ' 51 - 60', quantity: '200' },
        { label: ' Trên 60', quantity: '200' },
    ]
    return (
        <>
            <Layout sidebar>
                <div className={classes.header} >
                    <Typography className={classes.headerContent} variant="h5">
                        Báo cáo - thống kê
                    </Typography>
                </div>
                <Accordion
                    variant="outlined"
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Thống kê</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={classes.paperWrapper}>
                            <PaperStatistic title={"Giới tính"} data={genderS} />
                            <PaperStatistic title={"Chi bộ"} data={partyCellS} />
                            <PaperStatistic title={"Dân tộc"} data={ethnicS} />
                            <PaperStatistic title={"Độ tuổi"} data={ageS} />
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Paper variant="outlined" className={classes.paper}>
                    <Typography className={classes.inputSelect}>Loại báo cáo</Typography>
                    <MySelect
                        onChange={handleChangeField}
                        value={categoryField}
                        autowidth
                    >
                        <MenuItem value="chibo">Chi bộ</MenuItem>
                        <MenuItem value="loaidv">Loại Đảng viên</MenuItem>
                        <MenuItem value="capbac">Cấp bậc</MenuItem>
                        <MenuItem value="tuoi">Tuổi</MenuItem>
                        <MenuItem value="khenthuong">Khen thưởng</MenuItem>
                        <MenuItem value="kyluat">Kỷ luật</MenuItem>
                    </MySelect>
                    <MySelect
                        style={{ marginLeft: '16px' }}
                        value={"sv"}
                        autowidth
                    >
                        <MenuItem value="sv">Sinh viên</MenuItem>
                        <MenuItem value="dv">Đảng viên</MenuItem>
                    </MySelect>
                </Paper>
                <MyButton primary>Xem</MyButton>
                <TableContainer style={{ maxWidth: "1170px", }} >
                    <MaterialTable
                        components={{
                            Container: (props) =>
                                <Paper
                                    {...props}
                                    className={classes.table}
                                    variant="outlined"
                                />
                        }}
                        title={"Báo cáo"}
                        columns={columns}
                        data={rows}
                        options={{
                            padding: 'dense'
                        }}
                        actions={[
                            {
                                icon: () => <DownloadIcon />,
                                tooltip: "Export to excel",
                                onClick: () => downloadExcel(),
                                isFreeAction: true
                            }
                        ]}
                    />
                </TableContainer>
            </Layout>
        </>
    );
};

export default Statistic;