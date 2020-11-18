import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header, Home, NotFound, Signin, Signup } from './index';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
