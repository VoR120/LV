import axios from '../helper/axios';

export const createMove = async (payload, open) => {
    let { MaSoDangVien, MaHinhThuc, NgayChuyenDi, ChuyenTuChiBo, ChuyenDenDangBo, ChuyenDenChiBo, GhiChu } = payload
    try {
        let newPayload = {
            MaSoDangVien: MaSoDangVien,
            MaHinhThuc: MaHinhThuc,
            NgayChuyenDi: NgayChuyenDi,
            ChuyenTu: ChuyenTuChiBo,
            ChuyenDen: "Đảng bộ " + ChuyenDenDangBo + ", Chi bộ " + ChuyenDenChiBo,
            GhiChu: GhiChu,
        }
        const res = await axios.post('/api/move/create', newPayload)
        if (res.data) {
            const resPM = await axios.put('/api/partymember/' + MaSoDangVien, { TrangThai: 0 });
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
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const updateMove = async (payload, open) => {
    const { MaChuyenSinhHoat, NgayChuyenDen } = payload
    try {
        const res = await axios.put('/api/move/' + MaChuyenSinhHoat, { NgayChuyenDen })
        console.log(res);
        if(res.data) {
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