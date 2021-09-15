import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0c71d0',
            dark: '#0200b9',
            light: '#e3f2fd' 
        },
    },
})

const ThemeContextProvider = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default ThemeContextProvider;