import React, { createContext, useReducer } from 'react';
import CategoryReducer, { initialState } from '../reducer/CategoryReducer';

export const CategoryContext = createContext();

const CategoryContextProvider = (props) => {
    const [category, categoryDispatch] = useReducer(CategoryReducer, initialState)
    return (
        <CategoryContext.Provider value={{ category, categoryDispatch }}>
            {props.children}
        </CategoryContext.Provider>
    );
};

export default CategoryContextProvider;