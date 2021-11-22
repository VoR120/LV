import axios from "../helper/axios";

export const getStatistic = async (payload) => {
    console.log(payload);
    try {
        let res;
        if (payload.condition == "all") {
            res = await axios.get(`/api/statistic/${payload.name}/`);
        } else
            res = await axios.get(`/api/statistic/${payload.name}?MaChiBo=` + payload.condition);
        if (res.status == 200) {
            console.log(res.data.data)
            return res.data.data;
        }
    } catch (error) {
        console.log(error.response);
    }
}