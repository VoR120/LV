import { createTheme, adaptV4Theme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
// import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme(adaptV4Theme({
    palette: {
        primary: {
            main: '#0c71d0',
            dark: '#0200b9',
            light: '#e3f2fd' 
        },
    },
    // components: {
    //     MuiDialogContent: {
    //         styleOverrides: {
    //             root: {
    //                 paddingTop: '20px'
    //             }
    //         }
    //     },
    // }
}))

const ThemeContextProvider = (props) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeContextProvider;