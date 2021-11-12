import { categoryConstant } from '../constant';
import axios from '../helper/axios';
export const getGrade = async (payload) => {
    try {
        const res = payload == "" ?
            await axios.get('/api/gradepM') :
            await axios.get('/api/gradepM/' + payload.id);
        if (res.status == 200)
            return res.data.data;
    } catch (error) {
        return { error: error.response.data.msg };
    }
}

export const getGradeByYear = async (payload) => {
    try {
        const res = await axios.get('/api/gradepM/getbyyear/' + payload.year);
        return res.data.data;
    } catch (error) {
        throw new Error(error)
    }
}


export const getYearGrade = async (payload) => {
    try {
        const res = await axios.get('/api/gradepM/getyear');
        return res.data.data;
    } catch (error) {
        throw new Error(error)
    }
}

export const createGrade = async (payload, open) => {
    const { MaSoDangVien, MaLoai, Nam } = payload
    try {
        const newPayload = { MaSoDangVien, MaLoai, Nam };
        const res = await axios.post('/api/gradepM/create', newPayload);
        if (res.data) {
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
        console.log(res.data.data);
    } catch (error) {
        throw new Error(error)
    }
}