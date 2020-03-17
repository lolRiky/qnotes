import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import Login from './components/Login/Login';
import Protected from './components/Protected';
import Home from './components/Authenticated/Home/Home';
import Register from './components/Register/Register';
import EditeNote from './components/Authenticated/Home/Note/EditNote';
import Calendar from './components/Authenticated/Calendar';

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
          <Route path='/note/:noteId' component={EditeNote} />
          <Route path='/Calendar' component={Calendar} />
        </AuthenticatedComponent>
      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
