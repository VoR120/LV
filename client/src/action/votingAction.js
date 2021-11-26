import axios from "../helper/axios";

export const createPoll = async (payload) => {
    console.log(payload);
    try {
        const res = await axios.post('/api/voting/create', payload);
        if (res.status == 201) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const getAllPoll = async () => {
    try {
        const res = await axios.get('/api/voting/');
        console.log(res);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const getPoll = async (payload) => {
    console.log(payload);
    try {
        const res = await axios.get('/api/voting/' + payload.id);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}
