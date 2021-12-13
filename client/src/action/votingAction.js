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
        return { error: error.response.data }
    }
}

export const getAllPoll = async (payload) => {
    try {
        const res = payload
            ? await axios.get('/api/voting?MaSoDangVien=' + payload.MaSoDangVien)
            : await axios.get('/api/voting/')
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

export const getPollByTime = async (payload) => {
    try {
        const res = await axios.post('/api/voting/getbytime', payload);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const getVotes = async (payload) => {
    try {
        const res = await axios.get('/api/voting/getvotes/' + payload.id);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const getNoVoting = async (payload) => {
    try {
        const res = await axios.get('/api/voting/getnovoting/' + payload.id);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}

export const mailing = async (payload) => {
    try {
        const res = await axios.post('/api/voting/mailing/?MaBieuQuyet=' + payload.id);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error.response);
    }
}