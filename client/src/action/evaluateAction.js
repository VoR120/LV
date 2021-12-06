import axios from "../helper/axios"

export const getEvaluated = async (payload) => {
    try {
        const { MaChiBo, Nam, MaSoDangVien } = payload;
        let path = [];
        if (Nam) path.push(`Nam=${Nam}`)
        if (MaChiBo) path.push(`MaChiBo=${MaChiBo}`)
        if (MaSoDangVien) path.push(`MaSoDangVien=${MaSoDangVien}`);
        console.log(path);
        const res = await axios.get(`/api/evaluate/getevaluated?` + path.join('&'));
        if (res.status == 200) {
            return res;
        }
    } catch (error) {
        return { error: error.response.data.msg }
        console.log(error.response)
    }
}

export const getTimeEvaluate = async (payload) => {
    try {
        const res = await axios.get(`/api/evaluate/gettime?Nam=${payload.Nam}`)
        console.log(res);
        if (res.status == 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error.response)
    }
}

export const checkIsOpen = async (payload) => {
    try {
        const res = payload.id
            ? await axios.get(`/api/evaluate/checkopen?MaDVDG=${payload.id}`)
            : await axios.get(`/api/evaluate/checkopen`)
        console.log(res);
        if (res.status == 200) {
            return res.data[0];
        }
    } catch (error) {
        console.log(error.response)
    }
}

export const setTimeEvaluate = async (payload) => {
    const { pmFrom, pmTo, subjectFrom, subjectTo, departmentFrom, departmentTo, year } = payload
    try {

        const resetStatus = await axios.post('/api/evaluate/resetstatus')
        console.log(resetStatus);
        
        const resPm = await axios.post('/api/evaluate/settime', {
            Nam: year,
            MaDVDG: 1,
            ThoiGianBatDau: pmFrom,
            ThoiGianKetThuc: pmTo,
            TrangThai: 1
        })
        const resSubject = await axios.post('/api/evaluate/settime', {
            Nam: year,
            MaDVDG: 2,
            ThoiGianBatDau: subjectFrom,
            ThoiGianKetThuc: subjectTo,
            TrangThai: 1
        })
        const resDepartment = await axios.post('/api/evaluate/settime', {
            Nam: year,
            MaDVDG: 3,
            ThoiGianBatDau: departmentFrom,
            ThoiGianKetThuc: departmentTo,
            TrangThai: 1
        })
        console.log(resPm)
        console.log(resSubject)
        console.log(resDepartment)
        return resDepartment;
    } catch (error) {
        console.log(error.response)
    }
}