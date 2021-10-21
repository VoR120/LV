import axios from '../helper/axios';
import { categoryConstant } from '../constant'
import { getKeyField } from '../utils/utils';

export const getAllCategory = async (dispatch, payload) => {
    try {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST })
        const config = {
            method: 'GET',
            url: '/api/' + payload,
        }
        const res = await axios(config);
        console.log(res);
        if (res.status == 200)
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    data: res.data.data,
                    name: res.data.columnName,
                    key: payload,
                }
            })
    } catch (error) {
        throw new Error(error)
        // dispatch({
        //     type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
        //     payload: {
        //         error: error.response.data
        //     }
        // })
    }
}

export const getLanguage = async () => {
    try {
        const config = {
            method: 'GET',
            url: '/api/flanguage',
        }
        const res = await axios(config);
        console.log(res)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}

export const getfLanguageId = async (payload) => {
    try {
        const config = {
            method: 'POST',
            url: '/api/flanguage/getid',
            data: payload
        }
        const res = await axios(config);
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}

export const getfLanguageName = async (payload) => {
    try {
        let newData = new Object(payload);
        let res = await axios.post('/api/flanguage/getname', { id: payload.MaNgoaiNgu })
        if (res.status == 200) {
            newData.TenNgoaiNgu = res.data.data[0].TenNgoaiNgu
            newData = Object.fromEntries(Object.entries(newData).filter(([key]) => key != "MaNgoaiNgu" && key != "SoDangVien"))
        }
        return newData
    } catch (error) {
        console.log(error)
    }
}

export const getFlanguageLevel = async (payload) => {
    try {
        let res = await axios.get('/api/flanguagelevel/getbyflid/' + payload)
        if (res.status == 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const actionGrade = async (dispatch, payload) => {
    const { add, update, remove, year } = payload;
    try {
        console.log(payload);
        if (add.length > 0) {
            await Promise.all(add.map(async (data) => {
                let res = await axios.post('/api/grade/create', { TenLoai: data, Nam: year })
                console.log(res.status)
            }))
        }
        if (update.length > 0) {
            await Promise.all(update.map(async (data) => {
                let res = await axios.put('/api/grade/' + data.MaLoai, { TenLoai: data.TenLoai, Nam: year })
                console.log(res);
            }))
        }
        if (remove.length > 0) {
            await Promise.all(remove.map(async (data) => {
                let res = await axios.delete('/api/grade/' + data)
                console.log(res);
            }))
        }
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST })
        const config = {
            method: 'GET',
            url: '/api/grade',
        }
        const res = await axios(config);
        console.log(res);
        if (res.status == 200)
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    data: res.data.data,
                    name: res.data.columnName,
                    key: 'grade',
                }
            })
    } catch (error) {
        console.log(error.response.data.message);
        // throw new Error(error)
    }
}

export const createCategory = async (dispatch, payload) => {
    try {
        dispatch({ type: categoryConstant.ADD_CATEGORY_REQUEST });
        const config = {
            method: 'POST',
            url: '/api/' + payload.categoryField + '/create',
            data: payload.data
        }
        const res = await axios(config);
        let newData = new Object(res.data);

        if (payload.categoryField == 'flanguagelevel') {
            newData = await getfLanguageName(res.data);
        }

        dispatch({
            type: categoryConstant.ADD_CATEGORY_SUCCESS,
            payload: {
                data: newData,
                key: payload.categoryField,
            }
        })

    } catch (error) {
        throw new Error(error)
        // dispatch({
        //     type: categoryConstant.ADD_CATEGORY_FAILURE,
        //     payload: {
        //         error: error.response.data
        //     }
        // })
    }
}

export const updateCategory = async (dispatch, payload) => {
    try {
        dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST });
        const config = {
            method: 'PUT',
            url: '/api/' + payload.categoryField + '/' + payload.id,
            data: payload.data
        }
        const res = await axios(config);
        let newData = new Object(res.data);

        if (payload.categoryField == 'flanguagelevel') {
            newData = await getfLanguageName(res.data)
        }

        dispatch({
            type: categoryConstant.UPDATE_CATEGORY_SUCCESS,
            payload: {
                data: newData,
                key: payload.categoryField,
            }
        })
    } catch (error) {
        throw new Error(error)
        // dispatch({
        //     type: categoryConstant.UPDATE_CATEGORY_FAILURE,
        //     payload: {
        //         error: error.response.data
        //     }
        // })
    }
}

export const removeCategory = async (dispatch, payload) => {
    try {
        dispatch({ type: categoryConstant.REMOVE_CATEGORY_REQUEST })
        const config = {
            method: 'DELETE',
            url: '/api/' + payload.categoryField + '/' + payload.id,
        }
        const res = await axios(config);
        if (res.status == 200)
            dispatch({
                type: categoryConstant.REMOVE_CATEGORY_SUCCESS,
                payload: {
                    id: payload.id,
                    key: payload.categoryField,
                    keyArray: getKeyField(payload.categoryField),
                }
            })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateFLPM = (payload) => {
    try {
        const res = axios.put()
    } catch (error) {
        console.log(error.response.data.message);
    }
}