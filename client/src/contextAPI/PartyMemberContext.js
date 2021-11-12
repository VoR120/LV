import React, { createContext, useReducer } from 'react';
import PartyMemberReducer, { initialState } from '../reducer/PartyMemberReducer';

export const PartyMemberContext = createContext();

const PartyMemberContextProvider = (props) => {
    const [partyMember, partyMemberDispatch] = useReducer(PartyMemberReducer, initialState)
    return (
        <PartyMemberContext.Provider value={{ partyMember, partyMemberDispatch }}>
            {props.children}
        </PartyMemberContext.Provider>
    );
};

export default PartyMemberContextProvider;