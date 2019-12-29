import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import Login from './components/Login/Login';
import Protected from './components/Protected';
import Home from './components/Authenticated/Home';
import Register from './components/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={LandingPage} exact/>
        <Route path='/Login' component={Login}/>
        <Route path='/Register' component={Register} />

        <AuthenticatedComponent>
          {/* Test for proteceted Route */}
          <Route path='/Protected' component={Protected} />
          
          {/* Users Home */}
          <Route path='/Home' component={Home} />
        </AuthenticatedComponent>
      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
