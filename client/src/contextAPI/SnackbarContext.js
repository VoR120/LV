import React, { createContext, useReducer } from 'react';
import SnackbarReducer, { initialState } from '../reducer/SnackbarReducer';

export const SnackbarContext = createContext();

const SnackbarContextProvider = (props) => {
    const [openSnackbar, openSnackbarDispatch] = useReducer(SnackbarReducer, initialState)
    return (
        <SnackbarContext.Provider value={{ openSnackbar, openSnackbarDispatch }}>
            {props.children}
        </SnackbarContext.Provider>
    );
};

export default SnackbarContextProvider;