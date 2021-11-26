import React from 'react';
import CategoryContextProvider from './CategoryContext';
import InfoContextProvider from './InfoContext';
import LoadingContextProvider from './LoadingContext';
import PartyMemberContextProvider from './PartyMemberContext';
import SnackbarContextProvider from './SnackbarContext';
import ThemeContextProvider from './ThemeContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <LoadingContextProvider>
                <SnackbarContextProvider>
                    <InfoContextProvider>
                        <CategoryContextProvider>
                            <PartyMemberContextProvider>
                                {props.children}
                            </PartyMemberContextProvider>
                        </CategoryContextProvider>
                    </InfoContextProvider>
                </SnackbarContextProvider>
            </LoadingContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;