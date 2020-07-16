import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom';

import AppBar from './components/AppBar';
import Home from './pages/Home';
import Menu from './pages/Menu';


function Routes() {
  return(
      <HashRouter>
          <AppBar/>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/menu" component={Menu}/>
          </Switch>
      </HashRouter>
  );
}

export default Routes;