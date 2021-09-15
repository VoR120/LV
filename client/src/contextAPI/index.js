import React from 'react';
import ThemeContextProvider from './ThemeContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            {props.children}
        </ThemeContextProvider>
    );
};

export default AppContextProvider;