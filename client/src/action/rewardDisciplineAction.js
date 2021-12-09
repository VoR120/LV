import axios from '../helper/axios';

export const createRewardDiscipline = async (payload, open) => {
    try {
        const res = await axios.post(`/api/${payload.type}/create`, payload.data)
        if (res.data) {
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã lưu!",
                    type: "success"
                }
            })
        }
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export const createRewardDisciplines = async (payload, id) => {
    try {
        const { DanhSach, type, ...other } = payload;
        await Promise.all(DanhSach.map(async el => {
            const res = await axios.post(`/api/${type}/create`, { MaSoDangVien: el, ...other })
            if (res)
                console.log(res.data);
        }))
        const resUpdate = await axios.post(`/api/voting/saveresult/` + id)
        if (resUpdate)
            return { msg: "Đã lưu!" }
    } catch (error) {
        throw new Error(error.response.data?.msg || error.response.data?.message);
    }
}

export const getRewardDiscipline = async (payload) => {
    const { Loai, MaHinhThuc } = payload
    try {
        let res;
        if (MaHinhThuc == "all")
            res = await axios.get('/api/' + Loai)
        else
            res = await axios.get(`/api/${Loai}/getbytypeid/${MaHinhThuc}`)
        console.log(res);
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const importRewardDiscipline = async (payload) => {
    const { type, file } = payload;
    try {
        let formData = new FormData();
        formData.append('file', file);
        const resUpload = await axios.post(`/api/file/${type}`, formData);
        if (resUpload) {
            return resUpload.data;
        }
    } catch (error) {
        console.log(error.response);
        return { error: error.response.data }
    }
}