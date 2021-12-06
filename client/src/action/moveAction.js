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

export const updateMove = async (payload, open) => {
    const { MaChuyenSinhHoat, NgayChuyenDen, MaSoDangVien } = payload
    try {
        const res = await axios.put('/api/move/' + MaChuyenSinhHoat, { NgayChuyenDen })
        if (res.status == 200) {
            const resPM = await axios.put('/api/partymember/' + MaSoDangVien, { TrangThai: 1 });
            if (resPM.status == 200)
                open({
                    type: 'SET_OPEN',
                    payload: {
                        msg: "Đã cập nhật!",
                        type: "success"
                    }
                })
        }
        return res.data
    } catch (error) {
        open({
            type: 'SET_OPEN',
            payload: {
                msg: "Đã xảy ra lỗi!",
                type: "error"
            }
        })
    }
}