import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from 'react-router';
import './App.scss';
import RouteList from './config/routeConfig';
import AppContextProvider from './contextAPI/index';
import { routes } from './page';
import Home from './page/Home';
import File from './page/File';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
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
      </AppContextProvider>
    </div>
  );
}

export default App;
