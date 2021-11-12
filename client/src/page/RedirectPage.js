import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';

const RedirectPage = () => {
    const history = useHistory();
    useEffect(() => {
        history.push('/home');
    }, [])
    return (
        <>Đang chuyển hướng ...</>
    );
};

export default RedirectPage;