import axios from '../helper/axios';
import { getGender } from '../utils/utils';
import { partyMemberConstant } from '../constant/'

const getIdField = (field) => {
    const idField = {
        grade: "MaLoai",
        partycell: "MaChiBo",
        position: "MaChucVu",
        ethnic: "MaDanToc",
        religion: "MaTonGiao",
        gender: "GioiTinh",
        status: "TrangThai",
        name: "HoTen",
        province: "QQTinh"
    }
    return idField[field]
}

const getParamsAge = (value) => {
    const paramsAge = {
        from18to30: "Tuoigt=18&Tuoilt=30",
        from31to40: "Tuoigt=31&Tuoilt=40",
        from41to50: "Tuoigt=41&Tuoilt=50",
        from51to60: "Tuoigt=51&Tuoilt=60",
        over60: "Tuoigt=60",
    }
    return paramsAge[value];
}

export const getAllPartyMember = async (dispatch, partycell) => {
    try {
        dispatch({ type: partyMemberConstant.GET_ALL_PARTYMEMBER_REQUEST })
        let res;
        if (partycell) {
            res = await axios.get(`/api/partymember?MaChiBo=${partycell}`);
        } else
            res = await axios.get('/api/partymember');
        if (res.status == 200) {
            let result = [...res.data.data]
            await Promise.all(result.map(async (data, index) => {
                let lArr = [];
                let lpArr = [];
                const resFlpm = await axios.get('/api/flpm/' + data.MaSoDangVien);
                resFlpm.data.data.forEach(el => {
                    lArr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo })
                    lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
                });
                let addressArr = {};
                let addressFull = {};
                const resAddress = await axios.get('/api/address/' + data.MaSoDangVien);
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
                    if (el.MaLoaiDiaChi == "2") {
                        addressArr.DiaChiThuongTru = {
                            provinceValue: el.MaTinh,
                            districtValue: el.MaHuyen,
                            wardValue: el.MaXa,
                            detail: el.DiaChiCuThe
                        }
                        addressFull.DiaChiThuongTru = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
                    }
                    if (el.MaLoaiDiaChi == "3") {
                        addressArr.NoiOHienTai = {
                            provinceValue: el.MaTinh,
                            districtValue: el.MaHuyen,
                            wardValue: el.MaXa,
                            detail: el.DiaChiCuThe
                        }
                        addressFull.NoiOHienTai = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
                    }
                }))
                result[index].NgoaiNgu = lArr;
                result[index].NgoaiNguTrinhDo = lpArr.join(", ")
                result[index].DiaChi = addressArr;
                result[index].QueQuan = addressFull.QueQuan;
                result[index].DiaChiThuongTru = addressFull.DiaChiThuongTru;
                result[index].NoiOHienTai = addressFull.NoiOHienTai;
                result[index].TenGioiTinh = getGender(result[index].GioiTinh)
            }))
            dispatch({
                type: partyMemberConstant.GET_ALL_PARTYMEMBER_SUCCESS,
                payload: { data: result }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const addPartyMember = async (dispatch, payload, open) => {
    let { HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
        SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
        MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao,
        NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
        ChuyenDenDangBo, ChuyenDenChiBo, ChuyenTuChiBo, ChuyenTuDangBo, NgayChuyenDen, GhiChu,
        NgoaiNgu, HinhThucThem, QQAddress, DCTTAddress, NOHTAddress, ImageUpload, MaNhiemKy
    } = payload
    try {
        dispatch({ type: partyMemberConstant.ADD_PARTYMEMBER_REQUEST })
        let newPayload = {
            HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
            SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
            NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
            MaChiBo, MaChinhTri, MaDanToc, MaTinHoc, MaTonGiao, MaChucVu,
        }

        let formData = new FormData();
        formData.append('file', ImageUpload);
        const resUpload = await axios.post('/upload', formData);
        console.log(resUpload.data.file[0]);

        newPayload.HinhAnh = resUpload.data.file[0].url;

        if (HinhThucThem == "1") {
            newPayload.KetNapMoi = 1;
        }

        const res = await axios.post('/api/partymember/create', newPayload)
        let result = [...res.data.data];

        if (HinhThucThem == "3" || HinhThucThem == "4") {
            const res = await axios.post('/api/move/create', {
                MaSoDangVien,
                MaHinhThuc: HinhThucThem,
                ChuyenTuDangBo,
                ChuyenTuChiBo,
                ChuyenDenDangBo,
                ChuyenDenChiBo,
                NgayChuyenDen, GhiChu
            })
            console.log(res);
        }

        const resAddQQ = await axios.post('/api/address/create', {
            MaSoDangVien,
            MaTinh: QQAddress.provinceValue,
            MaHuyen: QQAddress.districtValue,
            MaXa: QQAddress.wardValue,
            DiaChiCuThe: QQAddress.detail,
            MaLoaiDiaChi: "1"
        })
        const resAddDCTT = await axios.post('/api/address/create', {
            MaSoDangVien,
            MaTinh: DCTTAddress.provinceValue,
            MaHuyen: DCTTAddress.districtValue,
            MaXa: DCTTAddress.wardValue,
            DiaChiCuThe: DCTTAddress.detail,
            MaLoaiDiaChi: "2"
        })
        const resAddNOHT = await axios.post('/api/address/create', {
            MaSoDangVien,
            MaTinh: NOHTAddress.provinceValue,
            MaHuyen: NOHTAddress.districtValue,
            MaXa: NOHTAddress.wardValue,
            DiaChiCuThe: NOHTAddress.detail,
            MaLoaiDiaChi: "3"
        })

        console.group()
        console.log("AddQQ: ", resAddQQ);
        console.log("AddDCTT: ", resAddDCTT);
        console.log("AddNOHT: ", resAddNOHT);
        console.groupEnd()

        let addressArr = {};
        let addressFull = {};
        const resAddQQP = await axios.get(`https://provinces.open-api.vn/api/p/${resAddQQ.data.MaTinh}?depth=1`);
        const resAddQQD = await axios.get(`https://provinces.open-api.vn/api/d/${resAddQQ.data.MaHuyen}?depth=1`);
        const resAddQQW = await axios.get(`https://provinces.open-api.vn/api/w/${resAddQQ.data.MaXa}?depth=1`);
        const resAddDCTTP = await axios.get(`https://provinces.open-api.vn/api/p/${resAddDCTT.data.MaTinh}?depth=1`);
        const resAddDCTTD = await axios.get(`https://provinces.open-api.vn/api/d/${resAddDCTT.data.MaHuyen}?deDth=1`);
        const resAddDCTTW = await axios.get(`https://provinces.open-api.vn/api/w/${resAddDCTT.data.MaXa}?depth=1`);
        const resAddNOHTP = await axios.get(`https://provinces.open-api.vn/api/p/${resAddNOHT.data.MaTinh}?depth=1`);
        const resAddNOHTD = await axios.get(`https://provinces.open-api.vn/api/d/${resAddNOHT.data.MaHuyen}?depth=1`);
        const resAddNOHTW = await axios.get(`https://provinces.open-api.vn/api/w/${resAddNOHT.data.MaXa}?depth=1`);
        addressArr.QueQuan = {
            provinceValue: resAddQQ.data.MaTinh,
            districtValue: resAddQQ.data.MaHuyen,
            wardValue: resAddQQ.data.MaXa,
            detail: resAddQQ.data.DiaChiCuThe
        }
        addressFull.QueQuan = `${resAddQQ.data.DiaChiCuThe}, ${resAddQQW.data.name}, ${resAddQQD.data.name}, ${resAddQQP.data.name}`
        addressArr.DiaChiThuongTru = {
            provinceValue: resAddDCTT.data.MaTinh,
            districtValue: resAddDCTT.data.MaHuyen,
            wardValue: resAddDCTT.data.MaXa,
            detail: resAddDCTT.data.DiaChiCuThe
        }
        addressFull.DiaChiThuongTru = `${resAddDCTT.data.DiaChiCuThe}, ${resAddDCTTW.data.name}, ${resAddDCTTD.data.name}, ${resAddDCTTP.data.name}`
        addressArr.NoiOHienTai = {
            provinceValue: resAddNOHT.data.MaTinh,
            districtValue: resAddNOHT.data.MaHuyen,
            wardValue: resAddNOHT.data.MaXa,
            detail: resAddNOHT.data.DiaChiCuThe
        }
        addressFull.NoiOHienTai = `${resAddNOHT.data.DiaChiCuThe}, ${resAddNOHTW.data.name}, ${resAddNOHTD.data.name}, ${resAddNOHTP.data.name}`

        console.log("Add: ", res)

        let lArr = [];
        let lpArr = [];

        await Promise.all(NgoaiNgu.map(async (data) => {
            let res = await axios.post('/api/flpm/create', {
                MaSoDangVien,
                MaNgoaiNgu: data.MaNgoaiNgu,
                MaTrinhDo: data.MaTrinhDo
            })
            let resultFl = [...res.data.data]
            lArr.push({ MaNgoaiNgu: resultFl[0].MaNgoaiNgu, MaTrinhDo: resultFl[0].MaTrinhDo })
            lpArr.push(`${resultFl[0].TenNgoaiNgu}-${resultFl[0].TenTrinhDo}`);
        }))

        result[0].NgoaiNgu = lArr;
        result[0].NgoaiNguTrinhDo = lpArr.join(", ")
        result[0].DiaChi = addressArr;
        result[0].QueQuan = addressFull.QueQuan;
        result[0].DiaChiThuongTru = addressFull.DiaChiThuongTru;
        result[0].NoiOHienTai = addressFull.NoiOHienTai;
        result[0].TenGioiTinh = getGender(result[0].GioiTinh)
        console.log(result);
        if (res.status == 201) {
            dispatch({
                type: partyMemberConstant.ADD_PARTYMEMBER_SUCCESS,
                payload: {
                    data: result[0]
                }
            })
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
    } catch (error) {
        dispatch({
            type: partyMemberConstant.ADD_PARTYMEMBER_FAILURE,
            payload: {
                error: error.response.data.msg
            }
        })
        open({
            type: 'SET_OPEN',
            payload: {
                msg: error.response.data.msg,
                type: "error"
            }
        })
    }
}

export const updatePartyMember = async (dispatch, payload, open, setOpen) => {
    let { HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
        SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
        MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao,
        NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
        ChuyenDenChiBo, ChuyenTuChiBo, ChuyenTuDangBo, NgayChuyenDen, GhiChu,
        NgoaiNgu, HinhThucThem, QQAddress, DCTTAddress, NOHTAddress, ImageUpload
    } = payload
    try {
        dispatch({ type: partyMemberConstant.UPDATE_PARTYMEMBER_REQUEST });

        let newPayload = {
            HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
            SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
            NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
            MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao,
            TrangThai: 1
        }

        if (ImageUpload) {
            let formData = new FormData();
            formData.append('file', ImageUpload);

            const resUpload = await axios.post('/upload', formData);
            console.log(resUpload.data.file[0]);

            newPayload.HinhAnh = resUpload.data.file[0].url;
        }

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

        const resQQ = await axios.put('/api/address/' + newPayload.MaSoDangVien, {
            MaTinh: QQAddress.provinceValue,
            MaHuyen: QQAddress.districtValue,
            MaXa: QQAddress.wardValue,
            DiaChiCuThe: QQAddress.detail,
            MaLoaiDiaChi: "1"
        })
        const resDCTT = await axios.put('/api/address/' + newPayload.MaSoDangVien, {
            MaTinh: DCTTAddress.provinceValue,
            MaHuyen: DCTTAddress.districtValue,
            MaXa: DCTTAddress.wardValue,
            DiaChiCuThe: DCTTAddress.detail,
            MaLoaiDiaChi: "2"
        })
        const resNOHT = await axios.put('/api/address/' + newPayload.MaSoDangVien, {
            MaTinh: NOHTAddress.provinceValue,
            MaHuyen: NOHTAddress.districtValue,
            MaXa: NOHTAddress.wardValue,
            DiaChiCuThe: NOHTAddress.detail,
            MaLoaiDiaChi: "3"
        })
        console.group()
        console.log("UpdateQQ: ", resQQ);
        console.log("UpdateDCTT: ", resDCTT);
        console.log("UpdateNOHT: ", resNOHT);
        console.groupEnd()

        let addressArr = {};
        let addressFull = {};
        const resQQP = await axios.get(`https://provinces.open-api.vn/api/p/${resQQ.data.MaTinh}?depth=1`);
        const resQQD = await axios.get(`https://provinces.open-api.vn/api/d/${resQQ.data.MaHuyen}?depth=1`);
        const resQQW = await axios.get(`https://provinces.open-api.vn/api/w/${resQQ.data.MaXa}?depth=1`);
        const resDCTTP = await axios.get(`https://provinces.open-api.vn/api/p/${resDCTT.data.MaTinh}?depth=1`);
        const resDCTTD = await axios.get(`https://provinces.open-api.vn/api/d/${resDCTT.data.MaHuyen}?deDth=1`);
        const resDCTTW = await axios.get(`https://provinces.open-api.vn/api/w/${resDCTT.data.MaXa}?depth=1`);
        const resNOHTP = await axios.get(`https://provinces.open-api.vn/api/p/${resNOHT.data.MaTinh}?depth=1`);
        const resNOHTD = await axios.get(`https://provinces.open-api.vn/api/d/${resNOHT.data.MaHuyen}?depth=1`);
        const resNOHTW = await axios.get(`https://provinces.open-api.vn/api/w/${resNOHT.data.MaXa}?depth=1`);
        addressArr.QueQuan = {
            provinceValue: resQQ.data.MaTinh,
            districtValue: resQQ.data.MaHuyen,
            wardValue: resQQ.data.MaXa,
            detail: resQQ.data.DiaChiCuThe
        }
        addressFull.QueQuan = `${resQQ.data.DiaChiCuThe}, ${resQQW.data.name}, ${resQQD.data.name}, ${resQQP.data.name}`
        addressArr.DiaChiThuongTru = {
            provinceValue: resDCTT.data.MaTinh,
            districtValue: resDCTT.data.MaHuyen,
            wardValue: resDCTT.data.MaXa,
            detail: resDCTT.data.DiaChiCuThe
        }
        addressFull.DiaChiThuongTru = `${resDCTT.data.DiaChiCuThe}, ${resDCTTW.data.name}, ${resDCTTD.data.name}, ${resDCTTP.data.name}`
        addressArr.NoiOHienTai = {
            provinceValue: resNOHT.data.MaTinh,
            districtValue: resNOHT.data.MaHuyen,
            wardValue: resNOHT.data.MaXa,
            detail: resNOHT.data.DiaChiCuThe
        }
        addressFull.NoiOHienTai = `${resNOHT.data.DiaChiCuThe}, ${resNOHTW.data.name}, ${resNOHTD.data.name}, ${resNOHTP.data.name}`

        const res = await axios.put('/api/partymember/' + newPayload.MaSoDangVien, newPayload);
        console.log("Add: ", res);
        let result = [...res.data];
        let lpArr = [];
        result[0].NgoaiNgu.forEach((el, index) => {
            lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
        })
        result[0].NgoaiNguTrinhDo = lpArr.join(", ")
        result[0].DiaChi = addressArr;
        result[0].QueQuan = addressFull.QueQuan;
        result[0].DiaChiThuongTru = addressFull.DiaChiThuongTru;
        result[0].NoiOHienTai = addressFull.NoiOHienTai;
        result[0].TenGioiTinh = getGender(result[0].GioiTinh)
        if (res.status == 200) {
            dispatch({
                type: partyMemberConstant.UPDATE_PARTYMEMBER_SUCCESS,
                payload: {
                    data: result[0]
                }
            })
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
        if (res.status == 400)
            dispatch({
                type: partyMemberConstant.UPDATE_PARTYMEMBER_FAILURE,
                payload: {
                    error: res
                }
            })
    } catch (error) {
        console.log(error);
        // throw new Error(error)
    }
}

export const removePartyMember = async (dispatch, payload, open) => {
    try {
        dispatch({ type: partyMemberConstant.REMOVE_PARTYMEMBER_REQUEST })
        const res = await axios.delete('/api/partymember/' + payload.id);
        if (res.status == 200) {
            dispatch({
                type: partyMemberConstant.REMOVE_PARTYMEMBER_SUCCESS,
                payload: { data: payload.id }
            })
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const filterPartyMember = async (payload) => {
    console.log(payload);
    Object.keys(payload).map(el => {
        if (el != "age") {
            if (payload[el] == "" || payload[el] == "0")
                delete payload[el];
            else {
                payload[getIdField(el)] = payload[el]
                delete payload[el];
            }
        }
    })

    let queryStr = '?';
    queryStr = queryStr + Object.keys(payload).map(el => el == "age"
        ? getParamsAge(payload[el])
        : `${el}=${payload[el]}`).join('&');
    try {
        const res = await axios.get('/api/partymember' + queryStr);
        console.log("Res: ", res);
        if (res.status == 200) {
            let result = [...res.data.data]
            await Promise.all(result.map(async (data, index) => {
                let lArr = [];
                let lpArr = [];
                const resFlpm = await axios.get('/api/flpm/' + data.MaSoDangVien);
                resFlpm.data.data.forEach(el => {
                    lArr.push({ MaNgoaiNgu: el.MaNgoaiNgu, MaTrinhDo: el.MaTrinhDo })
                    lpArr.push(`${el.TenNgoaiNgu}-${el.TenTrinhDo}`);
                });
                let addressArr = {};
                let addressFull = {};
                const resAddress = await axios.get('/api/address/' + data.MaSoDangVien);
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
                    if (el.MaLoaiDiaChi == "2") {
                        addressArr.DiaChiThuongTru = {
                            provinceValue: el.MaTinh,
                            districtValue: el.MaHuyen,
                            wardValue: el.MaXa,
                            detail: el.DiaChiCuThe
                        }
                        addressFull.DiaChiThuongTru = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
                    }
                    if (el.MaLoaiDiaChi == "3") {
                        addressArr.NoiOHienTai = {
                            provinceValue: el.MaTinh,
                            districtValue: el.MaHuyen,
                            wardValue: el.MaXa,
                            detail: el.DiaChiCuThe
                        }
                        addressFull.NoiOHienTai = `${el.DiaChiCuThe}, ${resWard.data.name}, ${resDis.data.name}, ${resPro.data.name}`
                    }

                }))
                result[index].NgoaiNgu = lArr;
                result[index].NgoaiNguTrinhDo = lpArr.join(", ");
                result[index].DiaChi = addressArr;
                result[index].QueQuan = addressFull.QueQuan;
                result[index].DiaChiThuongTru = addressFull.DiaChiThuongTru;
                result[index].NoiOHienTai = addressFull.NoiOHienTai;
                result[index].TenGioiTinh = getGender(result[index].GioiTinh)
            }))
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}