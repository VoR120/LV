import axios from "../helper/axios";

export const getPermissionPosition = async () => {
    try {
        const res = await axios.get('/api/permissionps/');
        if (res.status == 200)
            return res.data
    } catch (error) {
        console.log(error);
    }
}

export const getPermissionPositionById = async (payload) => {
    try {
        const res = await axios.get('/api/permissionps/' + payload.id);
        if (res.status == 200)
            return res.data.data
    } catch (error) {
        console.log(error);
    }
}

export const updatePermissionPosition = async (payload) => {
    const { MaChucVu, data } = payload
    try {
        const resAdd = await axios.put('/api/permissionps/' + MaChucVu, data)
        if (resAdd.status == 200) {
            const res = await axios.get('/api/permissionps/');
            if (res.status == 200)
                return res.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const updatePermissionPM = async (payload) => {
    const { MaSoDangVien, data } = payload
    try {
        const resAdd = await axios.put('/api/permissionpm/' + MaSoDangVien, data)
        if (resAdd.status == 200) {
            console.log(resAdd);
            return resAdd.data.data;
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}