import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CustomLoadingOverlay = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
};

export default CustomLoadingOverlay;