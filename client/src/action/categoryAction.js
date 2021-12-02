import { categoryConstant } from '../constant';
import axios from '../helper/axios';
import { getKeyField } from '../utils/utils';

export const getAllCategoryPM = async (dispatch) => {
    const categoryArr = [
        "ethnic", "religion", "partycell", "position", "flanguage",
        "flanguagelevel", "politics", "it", "grade", "term", "permission"
    ]
    try {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORYPM_REQUEST })
        let result = {};
        await Promise.all(categoryArr.map(async el => {
            const res = await axios.get('/api/' + el);
            result[el] = res.data
        }))
        console.log(result);
        dispatch({
            type: categoryConstant.GET_ALL_CATEGORYPM_SUCCESS,
            payload: result
        })
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export const getAllCategory = async (dispatch, payload) => {
    try {
        dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST })
        const res = await axios.get('/api/' + payload);
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
        const res = await axios.get('/api/flanguage');
        console.log(res)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
}

export const getfLanguageId = async (payload) => {
    try {
        const res = await axios.post('/api/flanguage/getid', payload);
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
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const actionGrade = async (dispatch, payload, open) => {
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
        const res = await axios.get('/api/grade');
        console.log(res);
        if (res.status == 200) {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: {
                    data: res.data.data,
                    name: res.data.columnName,
                    key: 'grade',
                }
            })
        }
        open({
            type: 'SET_OPEN',
            payload: {
                msg: "Đã cập nhật!",
                type: "success"
            }
        })
    } catch (error) {
        dispatch({
            type: categoryConstant.ADD_CATEGORY_FAILURE,
            payload: {
                error: error.response.data.msg
            }
        })
        open({
            type: 'SET_OPEN',
            payload: {
                msg: error.response.data.msg,
                type: "error"
            }
        })
    }
}

export const createCategory = async (dispatch, payload, open) => {
    try {
        dispatch({ type: categoryConstant.ADD_CATEGORY_REQUEST });
        const res = await axios.post('/api/' + payload.categoryField + '/create', payload.data);
        let newData = new Object(res.data);

        if (payload.categoryField == 'flanguagelevel') {
            newData = await getfLanguageName(res.data);
        }
        if (res.status == 201) {
            if (payload.categoryField == "position") {
                const resP = await axios.post('/api/permissionps/create', { MaChucVu: newData.MaChucVu })
                console.log("Add Permission: ", resP);
            }
            dispatch({
                type: categoryConstant.ADD_CATEGORY_SUCCESS,
                payload: {
                    data: newData,
                    key: payload.categoryField,
                }
            })
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
    } catch (error) {
        dispatch({
            type: categoryConstant.ADD_CATEGORY_FAILURE,
            payload: {
                error: error.response.data.msg
            }
        })
        open({
            type: 'SET_OPEN',
            payload: {
                msg: error.response.data.msg,
                type: "error"
            }
        })
    }
}

export const updateCategory = async (dispatch, payload, open) => {
    try {
        dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST });
        const res = await axios.put('/api/' + payload.categoryField + '/' + payload.id, payload.data);
        let newData = new Object(res.data);
        console.log(newData);
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
        open({
            type: 'SET_OPEN',
            payload: {
                msg: "Đã cập nhật!",
                type: "success"
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

export const removeCategory = async (dispatch, payload, open) => {
    try {
        dispatch({ type: categoryConstant.REMOVE_CATEGORY_REQUEST })
        const res = await axios.delete('/api/' + payload.categoryField + '/' + payload.id);
        if (res.status == 200) {
            dispatch({
                type: categoryConstant.REMOVE_CATEGORY_SUCCESS,
                payload: {
                    id: payload.id,
                    key: payload.categoryField,
                    keyArray: getKeyField(payload.categoryField),
                }
            })
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
    } catch (error) {
        dispatch({
            type: categoryConstant.REMOVE_CATEGORY_FAILURE,
            payload: {
                error: error.response.data.msg
            }
        })
        open({
            type: 'SET_OPEN',
            payload: {
                msg: error.response.data.msg,
                type: "error"
            }
        })
    }
}