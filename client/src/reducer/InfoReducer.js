import { infoConstant, userConstant } from '../constant';
let info = localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info')) : '';
let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : '';

export const initialState = {
    isAuthenticated: false,
    info: info,
    token: token,
    loading: false,
    error: null,
    message: null
}

const InfoReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case infoConstant.GET_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case infoConstant.GET_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                info: action.payload.data
            }
        case infoConstant.GET_INFO_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case infoConstant.UPDATE_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case infoConstant.UPDATE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                info: action.payload.data
            }
        case infoConstant.UPDATE_INFO_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case userConstant.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstant.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                info: action.payload.info,
                token: action.payload.token,
                loading: false,
                error: null,
                message: null,
            }
        case userConstant.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.error.type,
                message: action.error.msg
            }
        case userConstant.LOGOUT_SUCCESS:
            return initialState
        default:
            throw new Error("Invalid action!");
    }
}

export default InfoReducer;