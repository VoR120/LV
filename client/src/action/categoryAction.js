import axios from '../helper/axios';

export const getAllCategory = async (payload) => {
    try {
        const config = {
            method: 'GET',
            url: '/api/' + payload,
            data: payload
        }
        const res = await axios(config);
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getfLanguageId= async (payload) => {
    try {
        const config = {
            method: 'POST',
            url: '/api/flanguage/getid',
            data: payload
        }
        const res = await axios(config);
        console.log(res.data);
        return res.data
    } catch (error) {
        
    }
}