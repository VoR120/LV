import React from 'react';
import CategoryContextProvider from './CategoryContext';
import InfoContextProvider from './InfoContext';
import ListDrawerContextProvider from './ListDrawerContext';
import LoadingContextProvider from './LoadingContext';
import PartyMemberContextProvider from './PartyMemberContext';
import SnackbarContextProvider from './SnackbarContext';
import ThemeContextProvider from './ThemeContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <LoadingContextProvider>
                <ListDrawerContextProvider>
                    <SnackbarContextProvider>
                        <InfoContextProvider>
                            <CategoryContextProvider>
                                <PartyMemberContextProvider>
                                    {props.children}
                                </PartyMemberContextProvider>
                            </CategoryContextProvider>
                        </InfoContextProvider>
                    </SnackbarContextProvider>
                </ListDrawerContextProvider>
            </LoadingContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;