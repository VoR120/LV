import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, useHistory, Redirect, Route } from "react-router-dom";
import { isLogin } from './action/infoAction';
import './App.scss';
import RouteList from './config/routeConfig';
import { InfoContext } from './contextAPI/InfoContext';
import { routes } from './page';
import AccessDenied from './page/AccessDenied';
import Login from './page/Login';
import NotFound from './page/NotFound';

function App() {
  const { info, infoDispatch } = useContext(InfoContext);
  const history = useHistory();

  useEffect(() => {
    isLogin(infoDispatch)
  }, [])

  useEffect(() => {
    if (!info.isAuthenticated) {
      return <Redirect to="/login" />
    }
  }, [info.isAuthenticated])

  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Suspense
            fallback={
              <Backdrop style={{ backgroundColor: '#fff' }} open={true}>
                <CircularProgress color="primary" />
              </Backdrop>
            }
          >
            <RouteList routes={routes} />
            {/* <Route component={NotFound}/> */}
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
