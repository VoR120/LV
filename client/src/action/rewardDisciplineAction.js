import axios from '../helper/axios';

export const createRewardDiscipline = async (payload) => {
    const { MaSoDangVienArr, TenKhenThuong, NgayKhenThuong,
        TenKyLuat, NgayKyLuat, HinhThuc
    } = payload.data
    const newData = payload.type == "reward"
        ? { MaSoDangVienArr, TenKhenThuong, NgayKhenThuong, HinhThuc }
        : { MaSoDangVienArr, TenKyLuat, NgayKyLuat, HinhThuc }
    try {
        console.log(newData);
        const res = await axios.post(`/api/${payload.type}/create`, newData)
        console.log(res);
        if (res.status == 201) {
            return { msg: "Đã cập nhật!" };
        }
    } catch (error) {
        return { error: error.response.data }
    }
}

export const createRewardDisciplines = async (payload, id) => {
    try {
        const { DanhSach, type, ...other } = payload;
        // await Promise.all(DanhSach.map(async el => {
        //     const res = await axios.post(`/api/${type}/create`, { MaSoDangVien: el, ...other })
        //     if (res)
        //         console.log(res.data);
        // }))
        const res = await axios.post(`/api/${type}/create`, { MaSoDangVienArr: DanhSach, ...other })
        const resUpdate = await axios.post(`/api/voting/saveresult/` + id)
        console.log(resUpdate);
        if (resUpdate)
            return { msg: "Đã lưu!" }
    } catch (error) {
        throw new Error(error.response.data?.msg || error.response.data?.message);
    }
}

export const getRewardDiscipline = async (payload) => {
    const { Loai, MaChiBo } = payload
    try {
        let res = MaChiBo
            ? await axios.get(`/api/${Loai}?MaChiBo=${MaChiBo}`)
            : await axios.get('/api/' + Loai)
        console.log(res);
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const removeRewardDiscipline = async (payload) => {
    try {
        const res = await axios.delete(`/api/${payload.type}/${payload.id}`)
        if (res.status == 200)
            return res.data
    } catch (error) {
        return { error: error.response.data }
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