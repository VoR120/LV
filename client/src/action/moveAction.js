import axios from '../helper/axios';

export const createMove = async (payload, open) => {
    let { MaSoDangVien, MaHinhThuc, NgayChuyenDi, ChuyenTuDangBo, ChuyenTuChiBo, ChuyenDenDangBo, ChuyenDenChiBo, GhiChu } = payload
    try {
        let newPayload = {
            MaSoDangVien: MaSoDangVien,
            MaHinhThuc: MaHinhThuc,
            NgayChuyenDi: NgayChuyenDi,
            ChuyenTuDangBo,
            ChuyenTuChiBo,
            ChuyenDenDangBo,
            ChuyenDenChiBo,
            GhiChu: GhiChu,
        }
        const res = await axios.post('/api/move/create', newPayload)
        if (res.data) {
            const resPM = MaHinhThuc == 13
                ? await axios.put('/api/partymember/' + MaSoDangVien, { MaChiBo: ChuyenDenChiBo })
                : await axios.put('/api/partymember/' + MaSoDangVien, { TrangThai: 2 })
            if (resPM.data) {
                open({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "Đã cập nhật!",
                        type: "success"
                    }
                })
            }
        }
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const getMoveByType = async (payload) => {
    const { LoaiHinhThuc, MaHinhThuc } = payload
    try {
        let res;
        if (MaHinhThuc == "all")
            res = await axios.post('/api/move/getbytype', { LoaiHinhThuc })
        else
            res = await axios.get('/api/move/getbytypeid/' + MaHinhThuc)
        console.log(res);
        if (res.status == 200)
            return res.data
    } catch (error) {
        console.log(error);
    }
}

export const getMoveByPMId = async (payload) => {
    const { MaSoDangVien } = payload
    console.log(MaSoDangVien);
    try {
        const res = MaSoDangVien == "" ?
            await axios.get('/api/move') :
            await axios.get('/api/move/getbypmid/' + MaSoDangVien);
        if (res.status == 200)
            return res.data
    } catch (error) {
        return { error: error.response.data.msg };
    }
}

export const updateReturnMove = async (payload, open) => {
    const { MaChuyenSinhHoat, NgayChuyenDen, MaSoDangVien } = payload
    try {
        const res = await axios.put('/api/move/' + MaChuyenSinhHoat, { NgayChuyenDen })
        if (res.status == 200) {
            const resPM = await axios.put('/api/partymember/' + MaSoDangVien, { TrangThai: 1 });
            if (resPM.status == 200) {
                console.log(res);
                return res.data
            }
        }
    } catch (error) {
        return { error: "Đã xảy ra lỗi" }
    }
}

export const updateMove = async (payload) => {
    const { MaChuyenSinhHoat, NgayChuyenDen, MaSoDangVien, NgayChuyenDi, GhiChu,
        ChuyenTuDangBo, ChuyenTuChiBo, ChuyenDenDangBo, ChuyenDenChiBo, TenChiBoDen, TenChiBoTu, MaHinhThuc } = payload
    try {
        const data = {
            ChuyenTuDangBo,
            ChuyenTuChiBo: (MaHinhThuc == 1 || MaHinhThuc == 2 || MaHinhThuc == 13) ? ChuyenTuChiBo : TenChiBoTu,
            ChuyenDenDangBo,
            ChuyenDenChiBo: (MaHinhThuc == 3 || MaHinhThuc == 4 || MaHinhThuc == 13) ? ChuyenDenChiBo : TenChiBoDen,
            NgayChuyenDi: NgayChuyenDi || null, NgayChuyenDen: NgayChuyenDen || null, GhiChu
        }
        const res = await axios.put('/api/move/' + MaChuyenSinhHoat, data)
        console.log(res);
        if (res.status == 200) {
            if (NgayChuyenDen) {
                await axios.put('/api/partymember/' + MaSoDangVien, { TrangThai: 1 });
            }
            return res.data
        }
    } catch (error) {
        return { error: "Đã xảy ra lỗi" }
    }
}

export const removeMove = async (payload) => {
    try {
        const res = await axios.delete(`/api/move/` + payload.id)
        if (res.status == 200)
            return res.data
    } catch (error) {
        return { error: error.response.data }
    }
}