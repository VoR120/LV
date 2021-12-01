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

export const updatePoll = async (payload) => {
    console.log(payload);
    try {
        const res = await axios.put(`/api/voting/${payload.MaBieuQuyet}`, payload);
        if (res.status == 200) {
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

export const checkIsVoted = async (payload) => {
    try {
        const res = await axios.post('/api/voting/check', payload);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const vote = async (payload) => {
    try {
        const res = await axios.post('/api/voting/createvoting', payload);
        if (res.status == 201) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const getResult = async (payload) => {
    try {
        const res = await axios.get('/api/voting/getresult/' + payload.id);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const deletePoll = async (payload) => {
    try {
        const res = await axios.delete('/api/voting/' + payload.id);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}