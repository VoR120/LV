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
        return { error: error.response.data.msg}
        console.log(error.response)
    }
}