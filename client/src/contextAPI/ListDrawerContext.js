import React, { createContext, useReducer } from 'react';

export const ListDrawerContext = createContext();

const ListDrawerContextProvider = (props) => {

    const ListDrawerReducer = (state, action) => {
        switch (action.type) {
            case 'OPEN_LIST1':
                return {
                    ...state,
                    list1: true
                }
            case 'TOGGLE_LIST1':
                return {
                    ...state,
                    list1: !state.list1
                }
            case 'OPEN_LIST2':
                return {
                    ...state,
                    list2: true
                }
            case 'TOGGLE_LIST2':
                return {
                    ...state,
                    list2: !state.list2
                }
            default:
                break;
        }
    }

    const [listOpen, listOpenDispatch] = useReducer(ListDrawerReducer, { list1: false, list2: false })
    return (
        <ListDrawerContext.Provider value={{ listOpen, listOpenDispatch }}>
            {props.children}
        </ListDrawerContext.Provider>
    );
};

export default ListDrawerContextProvider;