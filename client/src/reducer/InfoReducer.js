import { infoConstant } from '../constant'

export const initialState = {
    info: null,
    loading: false,
    error: null
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
        default:
            return initialState;
    }
}

export default InfoReducer;