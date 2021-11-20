import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, useHistory, Redirect } from "react-router-dom";
import { isLogin } from './action/infoAction';
import './App.scss';
import RouteList from './config/routeConfig';
import { InfoContext } from './contextAPI/InfoContext';
import { routes } from './page';
import Login from './page/Login';

function App() {
  const { info, infoDispatch } = useContext(InfoContext);
  const history = useHistory();

  useEffect(() => {
    console.log(info);
    isLogin(infoDispatch)
  }, [])

  useEffect(() => {
    console.log(!info.isAuthenticated);
    if (!info.isAuthenticated) {
      return <Redirect to="/login" />
    }
  }, [info.isAuthenticated])

  // getAllCategory(categoryDispatch, "ethnic")
  // getAllCategory(categoryDispatch, "religion")
  // getAllCategory(categoryDispatch, "partycell")
  // getAllCategory(categoryDispatch, "position")
  // getAllCategory(categoryDispatch, "flanguage");
  // getAllCategory(categoryDispatch, "flanguagelevel");
  // getAllCategory(categoryDispatch, "politics");
  // getAllCategory(categoryDispatch, "it");
  // getAllCategory(categoryDispatch, "grade");

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
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
