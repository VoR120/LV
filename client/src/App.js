import { Backdrop, CircularProgress, CssBaseline } from '@material-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from 'react-router';
import './App.css';
import RouteList from './config/routeConfig';
import ThemeContextProvider from './contextAPI/ThemeContext';
import { routes } from './page';
import Home from './page/Home';
import File from './page/File';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
      <CssBaseline />
        <Router>
          <Switch>
            <Suspense
              fallback={
                <Backdrop style={{backgroundColor: '#fff'}} open={true}>
                  <CircularProgress color="primary" />
                </Backdrop>
              }
            >
              <RouteList routes={routes} />
            </Suspense>
          </Switch>
        </Router>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
