import React from 'react';
import CategoryContextProvider from './CategoryContext';
import InfoContextProvider from './InfoContext';
import PartyMemberContextProvider from './PartyMemberContext';
import SnackbarContextProvider from './SnackbarContext';
import ThemeContextProvider from './ThemeContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <SnackbarContextProvider>
                <InfoContextProvider>
                    <CategoryContextProvider>
                        <PartyMemberContextProvider>
                            {props.children}
                        </PartyMemberContextProvider>
                    </CategoryContextProvider>
                </InfoContextProvider>
            </SnackbarContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;