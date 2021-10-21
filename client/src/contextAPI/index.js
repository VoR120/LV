import React from 'react';
import CategoryContextProvider from './CategoryContext';
import InfoContextProvider from './InfoContext';
import ThemeContextProvider from './ThemeContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <InfoContextProvider>
                <CategoryContextProvider>
                    {props.children}
                </CategoryContextProvider>
            </InfoContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;