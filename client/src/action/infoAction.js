import axios from '../helper/axios';
import { categoryConstant, infoConstant } from '../constant';

const otherList = ["TenDanToc", "TenTonGiao", "TenChiBo", "TenChinhTri", "TenTinHoc", "MaNgoaiNgu", "MaTrinhDo"]

export const getAllPartyMember = async () => {
    try {
        const config = {
            method: 'GET',
            url: '/api/partymember',
        }
        const res = await axios(config);
        if (res.status == 200)
            return res.data.data
    } catch (error) {
        throw new Error(error)
    }
}

export const getInfo = async (dispatch, payload) => {
    console.log(payload);
    try {
        dispatch({ type: infoConstant.GET_INFO_REQUEST })
        const res = await axios.get('/api/partymember/' + payload.id);
        console.log(res);
        if (res.status == 200)
            dispatch({
                type: infoConstant.GET_INFO_SUCCESS,
                payload: {
                    data: res.data[0],
                }
            })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateInfo = async (dispatch, payload) => {
    try {
        let newPayload = { ...payload }

        Object.keys(newPayload).forEach(key => otherList.includes(key) && delete newPayload[key])
        dispatch({ type: infoConstant.UPDATE_INFO_REQUEST })
        // dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST })
        const res = await axios.put('/api/partymember/' + newPayload["MaDangVien"], newPayload);
        console.log(res);
        if (res.status == 200)
            dispatch({
                type: infoConstant.UPDATE_INFO_SUCCESS,
                payload: {
                    data: res.data[0],
                }
            })
    } catch (error) {
        console.log(error.response.data.message);
    }
}