export const initialState = {
    open: false,
    message: '',
    type: ''
}

const SnackbarReducer = (state, action) => {
    switch (action.type) {
        case 'SET_OPEN':
            return {
                ...state,
                open: true,
                message: action.payload.msg,
                type: action.payload.type
            }
        case 'SET_CLOSE':
            return {
                ...state,
                open: false,
            }
        default:
            throw new Error("Invalid action!");
    }
}

export default SnackbarReducer;