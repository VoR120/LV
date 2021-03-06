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
        name: "HoTen",
        province: "QQTinh",
        achievement: "MaThanhTich",
        notreserve: "KhongDuBi",
        it: "MaTinHoc",
        politics: "MaChinhTri",
        flanguage: "MaNgoaiNgu",
        status: "TrangThai",
        isnew: "KetNapMoi"
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

export const getAllPartyMember = async (partycell) => {
    try {
        let res;
        if (partycell) {
            res = await axios.get(`/api/partymember?MaChiBo=${partycell}`);
        } else
            res = await axios.get('/api/partymember');
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        return { error: error.response.data.msg }
    }
}

export const addPartyMember = async (payload) => {
    let { HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
        SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
        MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao,
        NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
        ChuyenDenDangBo, ChuyenDenChiBo, ChuyenTuChiBo, ChuyenTuDangBo, NgayChuyenDen, GhiChu,
        NgoaiNgu, HinhThucThem, QQAddress, DCTTAddress, NOHTAddress, HinhAnh, SoThe
    } = payload
    try {
        // dispatch({ type: partyMemberConstant.ADD_PARTYMEMBER_REQUEST })
        let newPayload = {
            HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
            SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
            NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
            MaChiBo, MaChinhTri, MaDanToc, MaTinHoc, MaTonGiao, MaChucVu, SoThe
        }

        let formData = new FormData();
        formData.append('file', HinhAnh);
        const resUpload = await axios.post('/upload', formData);
        console.log(resUpload.data.file[0]);

        newPayload.HinhAnh = resUpload.data.file[0].url;

        if (HinhThucThem == "1") {
            newPayload.KetNapMoi = 1;
        }

        const res = await axios.post('/api/partymember/create', newPayload)
        let result = [...res.data.data];

        if (res.status == 201) {
            if (HinhThucThem == "3" || HinhThucThem == "4") {
                const res = await axios.post('/api/move/create', {
                    MaSoDangVienArr: new Array({ MaSoDangVien }),
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
                return result[0];
            }
        }
    } catch (error) {
        return { error: error.response.data }
    }
}

export const updatePartyMember = async (payload) => {
    let { HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
        SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
        MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao,
        NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
        ChuyenDenChiBo, ChuyenTuChiBo, ChuyenTuDangBo, NgayChuyenDen, GhiChu,
        NgoaiNgu, HinhThucThem, QQAddress, DCTTAddress, NOHTAddress, HinhAnh, SoThe
    } = payload
    try {
        let newPayload = {
            HoTen, MaSoDangVien, GioiTinh, CMND, NgaySinh, NoiSinh, QuocTich,
            SoDienThoai, Email, NgheNghiep, TrinhDoHocVan, NgayVaoDoan, NoiVaoDoan,
            NgayVaoDang, NoiVaoDangLanDau, NgayChinhThuc, NoiVaoDangChinhThuc, NguoiGioiThieu,
            MaChiBo, MaChinhTri, MaChucVu, MaDanToc, MaTinHoc, MaTonGiao, SoThe
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
        console.log("Update: ", res);

        let result = [...res.data];

        if (res.status == 200) {
            return result[0];
        }
    } catch (error) {
        return { error: error.response.data }
    }
}

export const removePartyMember = async (payload) => {
    try {
        await Promise.all(payload.id.map(async el => {
            await axios.delete('/api/partymember/' + el);
        }))
        return { msg: "???? c???p nh???t!" }
    } catch (error) {
        return { error: error.response.data.message || error.response.data.msg }
    }
}

export const filterPartyMember = async (payload) => {
    try {
        Object.keys(payload).map(el => {
            if (el != "age" && el != "isnew") {
                if (!payload[el] || payload[el] == "" || payload[el] == "0")
                    delete payload[el];
                else {
                    payload[getIdField(el)] = payload[el]
                    delete payload[el];
                }
            }
            if (el == "isnew") {
                if (payload[el] == "yes") payload[getIdField(el)] = 1;
                if (payload[el] == "no") payload[getIdField(el)] = 0;
                delete payload[el];
            }
        })

        let queryStr = '?';
        queryStr = queryStr + Object.keys(payload).map(el => el == "age"
            ? getParamsAge(payload[el])
            : `${el}=${payload[el]}`).join('&');
        const res = await axios.get('/api/partymember' + queryStr);
        console.log("Res: ", res);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export const mailing = async (payload) => {
    try {
        const res = await axios.post('/api/partymember/mailing', { mailList: payload })
        if (res.status == 200)
            return res.data
    } catch (error) {
        return { error: error.response.data }
    }
}