import axios from '../helper/axios';

export const createMove = async (payload) => {
    let { MaSoDangVienArr, MaHinhThuc, NgayChuyenDi, ChuyenTuDangBo, ChuyenDenDangBo, ChuyenDenChiBo, GhiChu } = payload
    try {
        let newPayload = {
            MaSoDangVienArr,
            MaHinhThuc,
            NgayChuyenDi,
            ChuyenTuDangBo,
            ChuyenDenDangBo,
            ChuyenDenChiBo,
            GhiChu,
        }
        const res = await axios.post('/api/move/create', newPayload)
        if (res.status == 201) {
            await Promise.all(MaSoDangVienArr.map(async el => {
                MaHinhThuc == 13
                    ? await axios.put('/api/partymember/' + el.MaSoDangVien, { MaChiBo: ChuyenDenChiBo })
                    : await axios.put('/api/partymember/' + el.MaSoDangVien, { TrangThai: 2 })
            }))
            return { msg: "Đã cập nhật!" };
        }
        console.log(res);
    } catch (error) {
        return { error: error.response.data }
    }
}

export const getMoveByType = async (payload) => {
    let { LoaiHinhThuc, MaHinhThuc, MaChiBo } = payload
    if (LoaiHinhThuc == "Chuyển sinh hoạt đi") LoaiHinhThuc = "Di"
    if (LoaiHinhThuc == "Chuyển sinh hoạt đến") LoaiHinhThuc = "Den"
    if (LoaiHinhThuc == "Chuyển sinh hoạt nội bộ") LoaiHinhThuc = "NoiBo"
    try {
        let res;
        if (MaHinhThuc == "all")
            res = MaChiBo
                ? await axios.get(`/api/move/getbytype?LoaiHinhThuc=${LoaiHinhThuc}&MaChiBo=${MaChiBo}`)
                : await axios.get(`/api/move/getbytype?LoaiHinhThuc=${LoaiHinhThuc}`)
        else
            res = MaChiBo
                ? await axios.get(`/api/move/getbytypeid?MaHinhThuc=${MaHinhThuc}&MaChiBo=${MaChiBo}`)
                : await axios.get(`/api/move/getbytypeid?MaHinhThuc=${MaHinhThuc}`)
        console.log(res);
        if (res.status == 200)
            return res.data
    } catch (error) {
        return { error: error.response.data.msg };
    }
}

export const getMoveByPMId = async (payload) => {
    const { MaSoDangVien, MaChiBo } = payload
    try {
        let res
        if (MaSoDangVien == "") {
            res = MaChiBo
                ? await axios.get(`/api/move?MaChiBo=${MaChiBo}`)
                : await axios.get('/api/move')
        } else {
            res = MaChiBo
                ? await axios.get(`/api/move/getbypmid?MaSoDangVien=${MaSoDangVien}&MaChiBo=${MaChiBo}`)
                : await axios.get(`/api/move/getbypmid?MaSoDangVien=${MaSoDangVien}`)
        }
        console.log(res);
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