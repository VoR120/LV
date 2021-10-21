import React, { createContext, useReducer } from 'react';
import InfoReducer, { initialState } from '../reducer/InfoReducer';

export const InfoContext = createContext();

const InfoContextProvider = (props) => {
    const [info, infoDispatch] = useReducer(InfoReducer, initialState)
    return (
        <InfoContext.Provider value={{ info, infoDispatch }}>
            {props.children}
        </InfoContext.Provider>
    );
};

export default InfoContextProvider;