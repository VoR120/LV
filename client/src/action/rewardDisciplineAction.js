import axios from '../helper/axios';

export const createRewardDiscipline = async (payload, open) => {
    try {
        const res = await axios.post(`/api/${payload.type}/create`, payload.data)
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
