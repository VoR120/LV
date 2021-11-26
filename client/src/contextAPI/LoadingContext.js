import React, { createContext, useReducer } from 'react';

export const LoadingContext = createContext();

const LoadingContextProvider = (props) => {

    const LoadingReducer = (state, action) => {
        switch (action.type) {
            case 'OPEN_LOADING':
                return {
                    open: true
                }
            case 'CLOSE_LOADING':
                return {
                    open: false
                }
            default:
                break;
        }
    }

    const [loading, loadingDispatch] = useReducer(LoadingReducer, { open:  false })
    return (
        <LoadingContext.Provider value={{ loading, loadingDispatch }}>
            {props.children}
        </LoadingContext.Provider>
    );
};

export default LoadingContextProvider;