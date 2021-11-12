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
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
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
