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

export const updatePermissionPosition = async (payload) => {
    const { MaChucVu, data } = payload
    try {
        // await Promise.all(Object.keys(data).map(async el => {
        //     const res = await axios.put('/api/permissionps/' + MaChucVu, { MaQuyen: el, CoQuyen: data[el] })
        // }))
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