import axios from '../helper/axios';
import { userConstant, infoConstant } from '../constant';

export const login = async (dispatch, payload) => {
    try {
        dispatch({ type: userConstant.LOGIN_REQUEST });
        const res = await axios.post('/auth/login', payload);
        console.log("Data: ", res.data); // msg, user, token
        if (res.status === 200) {
            ;
            const { info, token } = res.data
            let newInfo = { ...info }
            const resPer = await axios.get('/api/permissionps/' + info.MaChucVu);
            newInfo.Quyen = resPer.data.data
            dispatch({ type: userConstant.LOGIN_SUCCESS, payload: { token, info: newInfo } });
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('info', JSON.stringify(newInfo));
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.stringify(token);
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: userConstant.LOGIN_FAILURE, error: error.response.data });
    }
}

export const logout = async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("info");
    dispatch({ type: userConstant.LOGOUT_SUCCESS });
}

export const isLogin = async (dispatch) => {
    try {
        dispatch({ type: userConstant.LOGIN_REQUEST });
        const token = JSON.parse(localStorage.getItem('token'));
        console.log(token);
        if (token) {
            const info = JSON.parse(localStorage.getItem('info'));
            console.log(info);
            dispatch({ type: userConstant.LOGIN_SUCCESS, payload: { token, info } });
            // axios.defaults.headers.common['Authorization'] = token;
            // axios.defaults.headers("Access-Control-Allow-Origin", "*");
            // axios.defaults.headers("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        } else {
            // dispatch({ type: userConstant.LOGIN_FAILURE, payload: { error: { msg: 'Failed to login!', type: '' } } })
        }
    } catch (error) {

    }
}

export const getInfo = async (dispatch, payload) => {
    console.log(payload);
    try {
        dispatch({ type: infoConstant.GET_INFO_REQUEST })
        const res = await axios.get('/api/partymember/' + payload.id);
        let newPayload = { ...res.data }

        let addressArr = {};
        let addressFull = {};
        const resAddress = await axios.get('/api/address/' + payload.id);
        await Promise.all(resAddress.data.data.map(async (el, index) => {
            const resPro = await axios.get(`https://provinces.open-api.vn/api/p/${el.MaTinh}?depth=1`);
            const resDis = await axios.get(`https://provinces.open-api.vn/api/d/${el.MaHuyen}?depth=1`);
            const resWard = await axios.get(`https://provinces.open-api.vn/api/w/${el.MaXa}?depth=1`);
            if (el.MaLoaiDiaChi == "1") {
                addressArr.QueQuan = {
                    provinceValue: el.MaTinh,
                    districtValue: el.MaHuyen,
                    wardValue: el.MaXa,
                    detail: el.DiaChiCuThe
                }
                addressFull.QueQuan = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
            }
            if (el.MaLoaiDiaChi == "0002") {
                addressArr.DiaChiThuongTru = {
                    provinceValue: el.MaTinh,
                    districtValue: el.MaHuyen,
                    wardValue: el.MaXa,
                    detail: el.DiaChiCuThe
                }
                addressFull.DiaChiThuongTru = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
            }
            if (el.MaLoaiDiaChi == "0003") {
                addressArr.NoiOHienTai = {
                    provinceValue: el.MaTinh,
                    districtValue: el.MaHuyen,
                    wardValue: el.MaXa,
                    detail: el.DiaChiCuThe
                }
                addressFull.NoiOHienTai = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
            }


        }))

        newPayload[0].DiaChi = addressArr;
        newPayload[0].QueQuan = addressFull.QueQuan;
        newPayload[0].DiaChiThuongTru = addressFull.DiaChiThuongTru;
        newPayload[0].NoiOHienTai = addressFull.NoiOHienTai;

        if (res.status == 200)
            dispatch({
                type: infoConstant.GET_INFO_SUCCESS,
                payload: {
                    data: newPayload[0],
                }
            })
    } catch (error) {
        console.log(error);
        // throw new Error(error)
    }
}

export const updateInfo = async (dispatch, payload, open) => {
    let { HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
        SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
        MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao,
        NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
        ChuyenDenChiBo, ChuyenTuChiBo, ChuyenTuDangBo, NgayChuyenDen, GhiChu,
        NgoaiNgu, HinhThucThem, QQAddress, DCTTAddress, NOHTAddress, HinhAnh
    } = payload
    try {
        dispatch({ type: infoConstant.UPDATE_INFO_REQUEST })
        let newPayload = {
            HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
            SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
            NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
            MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao,
            TrangThai: 1
        }

        if (HinhAnh) {
            let formData = new FormData();
            formData.append('file', HinhAnh);

            const resUpload = await axios.post('/upload', formData);
            console.log(resUpload.data.file[0]);

            newPayload.HinhAnh = resUpload.data.file[0].url;
        }

        if (NgoaiNgu) {
            const resRemove = await axios.delete('/api/flpm/' + MaSoDangVien);
            console.log("Remove Fl: ", resRemove);

            await Promise.all(NgoaiNgu.map(async (data) => {
                let res = await axios.post('/api/flpm/create', {
                    MaSoDangVien,
                    MaNgoaiNgu: data.MaNgoaiNgu,
                    MaTrinhDo: data.MaTrinhDo,
                })
                console.log("Add Fl: ", res.data)
            }))
        }

        if (QQAddress) {
            const resQQ = await axios.put('/api/address/' + newPayload.MaSoDangVien, {
                MaTinh: QQAddress.provinceValue,
                MaHuyen: QQAddress.districtValue,
                MaXa: QQAddress.wardValue,
                DiaChiCuThe: QQAddress.detail,
                MaLoaiDiaChi: "1"
            })
            console.log("UpdateQQ: ", resQQ);
        }
        if (DCTTAddress) {
            const resDCTT = await axios.put('/api/address/' + newPayload.MaSoDangVien, {
                MaTinh: DCTTAddress.provinceValue,
                MaHuyen: DCTTAddress.districtValue,
                MaXa: DCTTAddress.wardValue,
                DiaChiCuThe: DCTTAddress.detail,
                MaLoaiDiaChi: "2"
            })
            console.log("UpdateDCTT: ", resDCTT);
        }
        if (NOHTAddress) {
            const resNOHT = await axios.put('/api/address/' + newPayload.MaSoDangVien, {
                MaTinh: NOHTAddress.provinceValue,
                MaHuyen: NOHTAddress.districtValue,
                MaXa: NOHTAddress.wardValue,
                DiaChiCuThe: NOHTAddress.detail,
                MaLoaiDiaChi: "3"
            })
            console.log("UpdateNOHT: ", resNOHT);
        }
        const res = await axios.put('/api/partymember/' + newPayload.MaSoDangVien, newPayload);
        console.log("Add: ", res);

        let result = [...res.data];
        const resPer = await axios.get('/api/permissionps/' + MaChucVu);
        console.log(resPer.data.data);
        result[0].Quyen = resPer.data.data

        if (res.status == 200) {
            dispatch({
                type: infoConstant.UPDATE_INFO_SUCCESS,
                payload: {
                    data: result[0],
                }
            })
            open({
                type: 'SET_OPEN',
                payload: {
                    type: "success",
                    msg: "Đã cập nhật!"
                }
            })
        }
        localStorage.setItem('info', JSON.stringify(result[0]));
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = async (payload, open) => {
    const { password, newPassword, MaSoDangVien } = payload
    try {
        const res = await axios.put('/auth/changepassword', { password, newPassword, MaSoDangVien })
        console.log(res);
        if (res.status == 200) {
            return { msg: res.data.msg }
        }
    } catch (error) {
        return { error: error.response.data.msg, type: error.response.data.type }
    }
}